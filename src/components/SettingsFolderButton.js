import {React, useState} from 'react'
import {Dropdown, DropdownButton, Modal, Button, Form, ListGroup} from "react-bootstrap"
import {database, db} from "../firebase"
import { deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs, getDoc } from "firebase/firestore"
import rgbHex from 'rgb-hex';

export default function SettingsFolderButton({folder}) {
    const [open, setOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [color, setColor] = useState("")


    // const colorPick = document.getElementById("color-pick")
    const folderColor = folder.color
    // console.log(color)

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    function openSettingsModal() {
        setSettingsOpen(true);
    }

    function closeSettingsModal() {
        setSettingsOpen(false);
    }

    function handleDelete(e) {
        e.preventDefault();

        if(folder.creator)
        deleteDoc(doc(db, "folders", folder.id));
        
        closeModal()
    }

    function handleSave(e){
        e.preventDefault()
        const folderRef = doc(db, "folders", folder.id);
        const fileRef = collection(db, "files");

        if(email != ""){
            updateDoc(folderRef, {
                members: arrayUnion(email),
            })
            // const f = query(fileRef, where("folderId", "==", folder.id));
            
        }else{
            
        }

        if(name != ""){
            updateDoc(folderRef, {
                name: name
            })
        }
        
        if(color){
            updateDoc(folderRef, {
                color: color
            })
        }
        

        closeSettingsModal()
    }

    return (
        <>
        {/* delete modal */}
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={open}
            >
            <Modal.Header closeButton onClick={closeModal}>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to delete "{folder.name}" ?</h4>
                <p>
                    This action will permanently delete your folder along with the files inside it.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleDelete}>Yes</Button>
            </Modal.Footer>
        </Modal>

        {/* settings modal */}
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={settingsOpen}
        >
            <Modal.Header closeButton onClick={closeSettingsModal}>
            <Modal.Title id="contained-modal-title-vcenter">
            ⚙️ Settings
            </Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                <h4>{folder.name}</h4>
                    <div>
                        <Form.Label>Folder name:</Form.Label>
                        <Form.Control defaultValue={folder.name} onChange={e => setName(e.target.value)}></Form.Control>
                        <Form.Label>Invite members to view this folder:</Form.Label>
                        <Form.Control type="email" placeholder="type a valid email address..." onChange={e => setEmail(e.target.value)}></Form.Control>
                    </div>

                    <div className="cp">
                       <span>Color: </span> <input type="color" id="color-pick" defaultValue={folderColor} className="color-pick" onChange={e => setColor(e.target.value)}/>
                    </div>

                    <div>
                        <span>Members added:</span>
                        <ListGroup className="members-list">
                        {folder.members.map((child) => (
                                <ListGroup.Item>{child}</ListGroup.Item>
                        ))}
                        </ListGroup>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={closeSettingsModal}>Close</Button>
                <Button onClick={handleSave} variant='success' type="submit">Save</Button>
            </Modal.Footer>
            </Form>
        </Modal>

            {/* settings dropdown */}
            <DropdownButton id="dropdown-button-dark-example2" menuVariant="dark" className="settings-button" variant="outline-dark" title="⚙️"  >
                <Dropdown.Item onClick={openSettingsModal}>settings</Dropdown.Item>
                <Dropdown.Item onClick={openModal} >delete</Dropdown.Item>
            </DropdownButton>
        </>
    )
}

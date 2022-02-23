import {React, useState} from 'react'
import {Dropdown, DropdownButton, Modal, Button, Form, ListGroup} from "react-bootstrap"
import {database, db} from "../firebase"
import { deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, collection, query, where, getDocs } from "firebase/firestore"

export default function SettingsFolderButton({folder}) {
    const [open, setOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

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

        deleteDoc(doc(db, "folders", folder.id));
        
        closeModal()
    }

    function handleAddUser(e){
        e.preventDefault()
        const folderRef = doc(db, "folders", folder.id);
        const fileRef = collection(db, "files");

        if(email != ""){
            updateDoc(folderRef, {
                members: arrayUnion(email)
            })

            // const f = query(fileRef, where("folderId", "==", folder.id));
            
        }else{
            alert("email must exist!")
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
                    <Form.Label>Folder name:</Form.Label>
                    <Form.Control value={folder.name} onChange={e => setName(e.target.value)}></Form.Control>
                    <Form.Label>Invite members to view this folder:</Form.Label>
                    <Form.Control type="email" placeholder="type a valid email address..." onChange={e => setEmail(e.target.value)}></Form.Control>

                    <span>Members added:</span>
                    <ListGroup className="members-list">
                    {folder.members.map((child) => (
                            <ListGroup.Item>{child}</ListGroup.Item>
                    ))}
                    </ListGroup>

                    
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={closeSettingsModal}>Close</Button>
                <Button onClick={handleAddUser} variant='success' type="submit">Save</Button>
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

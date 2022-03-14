import React from 'react';
import { Button, Modal, Form, DropdownButton, Dropdown} from "react-bootstrap"
import { useState } from 'react'
import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"
import { nanoid } from 'nanoid'
import { useUserAuth } from "../context/UserAuthContext"
import { useFolder } from "../hooks/useFolder"
import {ROOT_FOLDER} from "../hooks/useFolder"
var randomColor = require('randomcolor');



export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useUserAuth();
    const { folder } = useFolder();
    var rnd = randomColor();

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault()

        const path = [...currentFolder.path]
        if(currentFolder !== ROOT_FOLDER) {
            path.push({name: currentFolder.name, id: currentFolder.id, members: currentFolder.members})
        }
        
        if(currentFolder == null) return
        if(currentFolder.members == null) return currentFolder.members = [user.email]
        console.log(user.email)
 
        // add new folder to firestore database as a new document in a collection
        if(name != ""){
            if(description == ""){
                var desc = 'Collection of ' + name + '.';
                
                setDoc(doc(db, "folders", nanoid()), {
                    creator: user.email,
                    name: name,
                    userId: user.uid,
                    parentId: currentFolder.id,
                    description: desc,
                    color: rnd,
                    members: currentFolder.members,
                    path: path,
                    createdAt: new Date()
                })
            }else{
                setDoc(doc(db, "folders", nanoid()), {
                    creator: user.email,
                    name: name,
                    userId: user.uid,
                    parentId: currentFolder.id,
                    description: description,
                    color: rnd,
                    members: currentFolder.members,
                    path: path,
                    createdAt: new Date()
                })
            }
        }else{
            alert("name is empty!")
        }

        if(description == "" && name != ""){
            const desc = 'Collection of'+name;
            
            setDoc(doc(db, "folders", nanoid()), {
                description: desc
            })
        }else{
            setDoc(doc(db, "folders", nanoid()), {
                description: description
            })
        }
        

        setName("")
        setDescription("")
        closeModal()
    }

  return (
      <>
        {/* Create folder button */}
        <Button onClick={openModal} variant="primary" className="create-folder-button">New Folder</Button>
        
        {/* Modal */}
        <Modal show={open} onHide={closeModal}>
            <Form>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder name:</Form.Label>
                    <Form.Control 
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    /> 
                     <Form.Label>Folder Description:</Form.Label>
                    <Form.Control 
                        type="text"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    /> 
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="success" type="submit" onClick={handleSubmit}>
                    Add folder 
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
      </>
  )
}


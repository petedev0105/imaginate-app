import React from 'react'
import {useState, ReactDOM} from 'react'
import {Button, ProgressBar, Toast, ToastContainer} from "react-bootstrap"
import {database, storage, db} from "../firebase"
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import {doc, setDoc} from "firebase/firestore"
import { useUserAuth } from "../context/UserAuthContext"
import {ROOT_FOLDER} from "../hooks/useFolder"
import {nanoid} from 'nanoid'

export default function AddFileButton({currentFolder, show}) {
    const {user} = useUserAuth();
    const [uploadingFiles, setUploadingFiles] = useState([])

    function handleUpload(e){
        // get file array
        const files = e.target.files
        // const file = e.target.files[0] 

        if (currentFolder == null || files == null) return 

        const parentPath = currentFolder.path.length > 0 
            ? `${currentFolder.path.join('/')}`
            : ""

        // initialize and upload files to database

        const id = nanoid();

        for (let f of files){
            setUploadingFiles(prevUploadingFiles => [
                ...prevUploadingFiles,
                {id: id, name: f.name, progress: 0, error: false}
            ])

        const metaData = {
            contentType: f.type
        }


        

            const filePath = currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${f.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${f.name}`

        const storageRef = ref(storage, `/files/${user.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(storageRef, f, metaData);
        const upload_progress = document.getElementById('upload-progress');
        
        uploadTask.on('state-changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred/snapshot.totalBytes);
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if(uploadFile.id === id){
                        return {...uploadFile, progress: progress}
                    }

                    return uploadFile
                })
            })
        },
        (error) => {
            console.log(error)
        }, 
        () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if(currentFolder.members == null) return currentFolder.members = [user.email]
                setDoc(doc(db, "files", nanoid()), {
                    url: downloadURL,
                    name: f.name,
                    createdAt: new Date(),
                    folderId: currentFolder.id,
                    members: currentFolder.members, 
                    userId: user.uid
                })
            })
        })

            
        }

        
    }

    return (
        <>
            <label className="btn btn-outline-dark btn-sm m-0 mr-2 upload-file-button">
                <span>🖼️ upload file</span>
                <input type="file" onChange={handleUpload} style={{opacity:0, left: '-9999px', position: 'absolute'}} multiple/>
            </label>

            <ToastContainer>
            {uploadingFiles.length > 0 &&
                
                    <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        maxWidth: '250px'
                    }}
                    >
                        {uploadingFiles.map(file => (
                            <Toast className="toast">
                                <Toast.Body>
                                    <ProgressBar now={file.progress * 100} label={`${Math.round(file.progress * 100)}%`} animated className="pbar" />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>
                
            }
            </ToastContainer>
        </>
    )
}

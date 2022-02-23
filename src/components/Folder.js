import React from 'react';
import { Button, Card, Dropdown, DropdownButton }  from "react-bootstrap"
import { Link } from 'react-router-dom';
import SettingsFolderButton from "./SettingsFolderButton"


function Folder({folder}) {
  return (
    <Card style={{ width: '18rem' }} className="folder-card" >
      <Card.Body>
        <Card.Title className="bold-text">{folder.name}</Card.Title>
        <Card.Text>
          {folder.description}
        </Card.Text>
        

      <div className="folder-buttons">
      <Button to={{
          pathname:`/folder/${folder.id}`,
          state: {folder:folder}
          }} as={Link} variant="outline-dark">Open
        </Button>
        <SettingsFolderButton folder={folder}/>
      </div>
      <small><span className="bold-text">Creator:</span> {folder.creator}</small>
      <br></br>
      <small><span className="bold-text">Created at:</span> {folder.createdAt.toDate().toDateString()}</small>
        
      </Card.Body>
    </Card>
  );
}

export default Folder;

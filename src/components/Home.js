import React from "react";
import { Button, DropdownButton, Dropdown, Container, Row, Col, Navbar, Nav, NavDropdown , Form, Tab, Tabs} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Folder from "./Folder"
import {ROOT_FOLDER} from "../hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from "./AddFileButton"
import { useFolder } from "../hooks/useFolder"
import {useParams, useLocation} from "react-router-dom"
import FolderFile from "./FolderFile"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import RecentlyAdded from "./RecentlyAdded"
import Favourites from "./Favourites"
import SharedWithMe from "./SharedWithMe"

function Home() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const {folderId} = useParams()
  const { state = {} } = useLocation()
  const {folder, childFolders, childFiles} = useFolder(folderId)

  return (
    <>
    {/* Navigation */}
    <Navbar className="home-nav">
          <h3>🖖</h3>
          <Form>
          <Form.Control type="input" placeholder="search for a folder..." ></Form.Control>
          </Form>
          <Navbar.Text >
          <a href="#" className="a-text">Explore</a>
          </Navbar.Text>
          <Navbar.Text >
          <a href="#" className="a-text">Terms & Conditions</a>
          </Navbar.Text>
          <Navbar.Text>
          <a href="#" className="a-text">Help</a>
          </Navbar.Text>
          <Navbar.Text >
          <a href="#" className="a-text">Activities</a>
          </Navbar.Text>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="inv">
          <a href="#" className="a-text">🙋Invite a friend</a>
          </Navbar.Text>
          <Navbar.Text>
          <DropdownButton id="dropdown-basic-button" title="Account" align="end" variant="warning">
              <Dropdown.Item href="/account">{user && user.email}</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={handleLogout}>Logout</Dropdown.Item>

              {/* Toggle Dark Mode Switch */}
              {/* <Form>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Dark mode"
              />
            </Form> */}

          </DropdownButton>
          </Navbar.Text>
          </Navbar.Collapse>
    </Navbar>

    {/* Main */}
    <Container>

    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3" transition={true}>
      <Tab eventKey="home" title="🦄Dashboard" className="home-tab">
      <div className="add-buttons">
      <AddFolderButton currentFolder={folder} />
      <AddFileButton currentFolder={folder} />
      </div>
      {/* Breadcrumbs */}
      <div className="d-flex align-items-center">
        <FolderBreadcrumbs currentFolder={folder} />
      </div>

      {/* Folders */}
      {childFolders.length == 0 && childFiles.length == 0 && folder != ROOT_FOLDER &&(
        <h3 className="folder-empty">This folder is empty! 😬</h3>
      )}

      {childFolders.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFolders.map(childFolder => (
            <div key={childFolder.id}  className='p-2'>
              <Folder folder={childFolder} />
            </div>
          ))}
        </div>
      )}

      {/* Files */}
      {childFolders.length > 0 && childFiles.length > 0 && <hr />}
      {childFiles.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFiles.map(childFile => (
            <div key={childFile.id}  className='p-2'>
              <FolderFile file={childFile} />
            </div>
          ))}
        </div>
      )}
        </Tab>
        <Tab eventKey="contact" title="🔗Shared with me" className="home-tab">
          <SharedWithMe />
        </Tab>
        <Tab eventKey="recently" title="📅Recently added" className="home-tab">
          <RecentlyAdded />
        </Tab>
        <Tab eventKey="profile" title="❤️Favourites" className="home-tab">
          <Favourites />
        </Tab>
      </Tabs>
      </Container>
    </>
  );
};

export default Home;
 
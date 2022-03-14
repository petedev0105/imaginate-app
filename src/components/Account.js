import React from 'react';
import { useUserAuth } from "../context/UserAuthContext";
import { Button, DropdownButton, Dropdown, Container, Row, Col, Navbar, Nav, NavDropdown , Form, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom"

function Account() {
  const {user} = useUserAuth();

  return (
      <>
      <Container>
        <span as={Link} to='/home' >back</span>
        <h1>Account page</h1>
        <span>{user.email}</span>
      </Container>
      </>
  )
}

export default Account;

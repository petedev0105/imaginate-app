import React from 'react'
import {Navbar, Container, NavDropdown, Nav, Button} from 'react-bootstrap'
import hero from './hero2.png'

function Landing() {
  return (
    // Navbar
<>
  <Navbar collapseOnSelect expand="lg"  className="landing-nav" >
    <Container>
    <Navbar.Brand href="#home">🖖Imaginate</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="/login">Log in</Nav.Link>
        <Nav.Link  href="/signup">
          Sign up
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>

  {/* Main text */}
  <div className="landing-body">
  
    <div className="main-text">
      <h1>Store and share all of your important photos, <span className="securely">securely</span>.</h1>
      <span>Imaginate allows you to create private folders that only invite-specific members are allowed to see the content shared.</span>
    </div>  
    
    <div className="landing-buttons">
      <Button className="get-started" href="/signup">Get Started</Button>
      <Button variant="dark" >Learn more</Button>
    </div>
    
    <img src={hero} className="landing-img" />
  
  </div>
</>
  )
}

export default Landing

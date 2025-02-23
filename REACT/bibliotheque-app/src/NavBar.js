import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; 

const NavBar = () => {
    return (
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand as={Link} to="/Home">Bibliothèque Virtuelle</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Home">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/lectures">Lectures</Nav.Link>
            <Nav.Link as={Link} to="/Bibliotheque">Bibliothèque</Nav.Link>
            <Nav.Link as={Link} to="/Pal">PAL</Nav.Link>
            <Nav.Link as={Link} to="/Recherche">Recherche</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    );
};

export default NavBar;

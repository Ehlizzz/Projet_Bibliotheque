//importations nécessaires
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap"; 

//composant gérant la barre de navigation
const NavBar = () => {
    return (
      //Conteneur pour centrer et organiser le contenu de la barre de navigation
      <Container>
        {/* Définition de la barre de navigation */}
        <Navbar bg="dark" variant="dark" fixed="top">
           {/* Titre de la barre de navigation */}
          <Navbar.Brand as={Link} to="/Home">Bibliothèque Virtuelle</Navbar.Brand>
          {/* Conteneur pour les liens de navigation. */}
          <Nav className="mr-auto">
            {/* Chaque lien de navigation redirige vers une page spécifique */}
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

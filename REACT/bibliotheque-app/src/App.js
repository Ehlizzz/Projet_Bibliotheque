//import react
import React, { useState } from "react";
//importe les composants pour le routage
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import NavBar from "./NavBar";
//import l'inscription
import Inscription from "./Inscription";
//import la connexion
import Connexion from "./Connexion";

import Accueil from "./Accueil";

import Home from "./Home";

import Bibliotheque from "./Bibliotheque";

import Pal from "./Pal";

import Recherche from "./Recherche";

//importe le CSS de boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import des composants spécifiques de boostrap
import { Button, Container, Row, Col } from "react-bootstrap";
//import l'image du logo de la bibliothèque
import bibliLogo from './bibli_logo.webp';

//composant principal de l'application
function App() {
  // État pour suivre l'authentification et stocker le pseudo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
      <Router> {/* Assure-toi que le Router englobe tout le code qui utilise useNavigate */}
        <AppContent 
          isAuthenticated={isAuthenticated} 
          username={username} 
          setIsAuthenticated={setIsAuthenticated} 
          setUsername={setUsername} 
        />
      </Router>
  );
}
function AppContent({ isAuthenticated, username, setIsAuthenticated, setUsername }) {
  const navigate = useNavigate();  // Utilisation de useNavigate à l'intérieur du Router

  // Fonction de connexion (appelée après une connexion réussie)
  const handleLogin = (pseudo) => {
    setIsAuthenticated(true);
    setUsername(pseudo);
    navigate("/Home");
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    navigate("/Accueil");  // Redirection vers la page Accueil après la déconnexion
  }

  return (
    <>
      {isAuthenticated && <NavBar username={username} onLogout={handleLogout} />}
      {/* Définition de la hauteur minimale et de la couleur de fond de la page */}
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4", width: "100%", marginTop: isAuthenticated ? "50px" : "0px"}}>
        <Container> {/* Conteneur Bootstrap pour une disposition centrée */}
          {/* Utilise Row pour la mise en page avec des colonnes flexibles */}
          <Row className="d-flex justify-content-between align-items-center" style={{marginBottom:"50px"}}>
            {/* Image en haut à gauche */}
            <Col xs={2}  md={2} className="d-flex justify-content-md-start justify-content-center" style={{ marginTop: "10px", marginLeft: "-50px" }}>
              <img 
                src={bibliLogo} 
                alt="Logo Bibliothèque" 
                style={{ width: "150px", borderRadius: "50%" }}  // Taille de l'image ajustée à 150px
              />
            </Col>

            {/* Titre centré */}
            <Col xs={8} >
              {isAuthenticated ? (
                <h1 className="text-center" style={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center", width: "100%", marginRight: "-50px" }}>
                  Bienvenue, {username} !
                </h1>
              ) : (
              <h1 md={8} className="text-center" style={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center", width: "100%", marginRight: "-50px"}}>
                Bienvenue sur votre bibliothèque virtuelle
              </h1>
              )}
            </Col>

            {/* Boutons aligné en haut à droite */}
            <Col xs={2} md={2} className="d-flex flex-column align-items-center align-items-md-end" style={{ marginTop: "20px", marginRight: "-50px" }}>
              {isAuthenticated ? (
                // Bouton de déconnexion
                <Button variant="danger" size="lg" className="w-150" onClick={handleLogout}>
                  Déconnexion
                </Button>
              ) : (
              <div> {/* Conteneur pour les boutons */}
                <Link to="/inscription" style={{ display: "block", marginBottom: "25px" }}> {/* Lien vers la page d'inscription  */}
                  {/* Bouton d'inscription avec un style de taille large et de type success */}
                  <Button variant="success" size="lg" className="w-100">
                    S'inscrire
                  </Button>
                </Link>
                <Link to="/connexion"> {/* Lien vers la page de connexion */}
                  {/* Bouton de connexion avec un style de taille large et de type primary */}
                  <Button variant="primary" size="lg" className="w-100">
                    Se connecter
                  </Button>
                </Link>
              </div>
              )}
            </Col>
          </Row>
        </Container>

        {/* Section de contenu avec logo */}
        <Row className="text-center"> {/* Row pour centrer le contenu */}
          <Col> {/* Colonne pour afficher les routes */}
            <Routes> {/* Déclaration des routes de l'application */}
              <Route path="/Accueil" element={<Accueil />} />
              <Route path="/Inscription" element={<Inscription onLogin={handleLogin} />} /> {/* Route pour la page d'inscription */}
              <Route path="/Connexion" element={<Connexion onLogin={handleLogin} />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Bibliotheque" element={<Bibliotheque />} />
              <Route path="/recherche" element={<Recherche />} />
              <Route path="/Pal" element={<Pal />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;

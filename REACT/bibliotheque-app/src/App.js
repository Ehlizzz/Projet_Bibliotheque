import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//importation des composants de l'application
import NavBar from "./NavBar";
import Inscription from "./Inscription";
import Connexion from "./Connexion";
import Accueil from "./Accueil";
import Home from "./Home";
import Lectures from "./lectures";
import Bibliotheque from "./Bibliotheque";
import Pal from "./Pal";
import Recherche from "./Recherche";

//importation de Boostrap pour le style
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from "react-bootstrap";
//importe le logo de l'appli
import bibliLogo from './bibli_logo.webp';

//composant principal de l'application
function App() {
  // etat pour suivre l'authentification et stocker le pseudo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    
    if (storedAuth === 'true' && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
      <Router> 
        {/* contenu principal de l'application avec passage des états */}
        <AppContent 
          isAuthenticated={isAuthenticated} 
          username={username} 
          setIsAuthenticated={setIsAuthenticated} 
          setUsername={setUsername} 
        />
      </Router>
  );
}

//composant contenant la structure principal de l'application
function AppContent({ isAuthenticated, username, setIsAuthenticated, setUsername }) {
  const navigate = useNavigate(); //hook pour la navigation entre les pages

  //fonction de connexion : met à jour l'état d'authentification et redirige vers Home
  const handleLogin = (pseudo) => {
    setIsAuthenticated(true);
    setUsername(pseudo);
    localStorage.setItem('isAuthenticated', 'true'); // Sauvegarde l'authentification
    localStorage.setItem('username', pseudo); // Sauvegarde le nom d'utilisateur
    navigate("/Home");
  };

  //fonction de déconnexion : réinitialise l'état et redirige vers l'Accueil
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem('isAuthenticated'); // Retire l'authentification
    localStorage.removeItem('username'); // Retire le nom d'utilisateur
    navigate("/Accueil"); 
  }

  return (
    <>
      {/* affichage de la barre de navigation uniquement si l'utilisateur est connecté */}
      {isAuthenticated && <NavBar/>}

      {/* conteneur principal avec un fond gris clair */}
      <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4", width: "100%", marginTop: isAuthenticated ? "50px" : "0px"}}>
        <Container> 
          
          {/* ligne contenant le logo, le titre de bienvenue et les boutons d'authentification */}
          <Row className="d-flex justify-content-between align-items-center" style={{marginBottom:"50px"}}>
            {/* colonne pour afficher le logo de la bibliothèque */}
            <Col xs={2}  md={2} className="d-flex justify-content-md-start justify-content-center" style={{ marginTop: "10px", marginLeft: "-50px" }}>
              <img 
                src={bibliLogo} 
                alt="Logo Bibliothèque" 
                style={{ width: "150px", borderRadius: "50%" }}  
              />
            </Col>
            {/* colonne centrale avec le message de bienvenue */}
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
            {/* colonne pour les boutons de connexion/déconnexion */}
            <Col xs={2} md={2} className="d-flex flex-column align-items-center align-items-md-end" style={{ marginTop: "20px", marginRight: "-50px" }}>
              {isAuthenticated ? (
                //bouton pour se déconnecter
                <Button variant="danger" size="lg" className="w-150" onClick={handleLogout}>
                  Déconnexion
                </Button>
              ) : (
              <div> 
                {/* liens vers les pages d'inscription et de connexion */}
                <Link to="/inscription" style={{ display: "block", marginBottom: "25px" }}> {/* Lien vers la page d'inscription  */}
                  <Button variant="success" size="lg" className="w-100">
                    S'inscrire
                  </Button>
                </Link>
                <Link to="/connexion"> 
                  <Button variant="primary" size="lg" className="w-100">
                    Se connecter
                  </Button>
                </Link>
              </div>
              )}
            </Col>
          </Row>
        </Container>

        {/* routes pour la navigation entre les différentes pages de l'application */}      
        <Row className="text-center"> 
          <Col> 
            <Routes>
              <Route path="/Accueil" element={<Accueil />} />
              <Route path="/Inscription" element={<Inscription />} /> {/* Route pour la page d'inscription */}
              <Route path="/Connexion" element={<Connexion onLogin={handleLogin} />} /> {/* Route pour la page de connexion */}
              <Route path="/Home" element={<Home />} /> {/* Route pour la page d'accueil (livres terminés) */}
              <Route path="/lectures" element={<Lectures />} /> {/* Route pour la page des lectures en cours */}
              <Route path="/Bibliotheque" element={<Bibliotheque />} /> {/* Route pour la page de la bibliothèque */}
              <Route path="/recherche" element={<Recherche />} /> {/* Route pour la page de la recherche */}
              <Route path="/Pal" element={<Pal />} /> {/* Route pour la page de la pile à lire */}
            </Routes>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;

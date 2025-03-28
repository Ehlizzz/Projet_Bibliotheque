//importations necessaires
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Inscription() {
  //etat pour stocker les données saisies par l'utilisateur
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  //etat qui stocke un message de succès ou d'erreur
  const [message, setMessage] = useState(""); 
  //redirige l'utilisateur après l'inscription
  const navigate = useNavigate();

  //fonction appelée pendant la soumission du formulaire
  const handleSubmit = async (e) => {
    //empêche le rafraichissement de la page
    e.preventDefault();
    try {
      // envoie les données au serveur pour l'inscription
      const response = await axios.post("http://localhost:8080/utilisateur/inscription", {
        pseudo, email, motDePasse
      });
  
      //statut de succès est validé
      if (response.status === 200) {
        setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        // Redirection après 3s vers la connexion
        setTimeout(() => navigate("/connexion"), 3000); 
      }
    } catch (error) {
      //affichage d'un message d'erreur si l'inscription echoue
      setMessage(error.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    //Conteneur centré avec un fond gris clair
    <Container className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#f4f4f4" }}>
      {/* Formulaire d'inscription */}
      <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Inscription</h2>

        {/* Champ pour le pseudo */}
        <Form.Group controlId="formPseudo">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </Form.Group>

        {/* Champ pour l'email */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Champ pour le mot de passe */}
        <Form.Group controlId="formMotDePasse">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </Form.Group>

        {/* Bouton de soumission */}
        <Button variant="success" type="submit">
          S'inscrire
        </Button>

        {/* Affichage du message de succès ou d'erreur */}
        {message && <p className="text-center mt-3 text-success">{message}</p>}
      </Form>
    </Container>
  );
}

export default Inscription;

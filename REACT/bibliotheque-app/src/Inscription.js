import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Inscription({ onLogin }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Inscription de l'utilisateur
      const response = await axios.post("http://localhost:8080/utilisateur/inscription", {
        pseudo, email, motDePasse
      });
  
      if (response.status === 200) {
        setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setTimeout(() => navigate("/connexion"), 3000); // Redirection après 2s
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minheight: "100vh", backgroundColor: "#f4f4f4" }}>
      <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Inscription</h2>

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

        <Button variant="success" type="submit">
          S'inscrire
        </Button>

        {message && <p className="text-center mt-3 text-success">{message}</p>}
      </Form>
    </Container>
  );
}

export default Inscription;

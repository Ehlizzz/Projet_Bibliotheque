//importations nécessaires
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

//Composant gérant l'affichage et la soumission du formulaire de connexion
function Connexion({ onLogin }) {
  //etat pour stocker les données saisies par l'utilisateur
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  //etat qui stocke un message d'erreur
  const [message, setMessage] = useState("");

  //fonction appelée pendant la soumission du formulaire
  const handleSubmit = async (e) => {    
    //empêche le rafraichissement de la page
    e.preventDefault();
    try {
      //envoie une requête post avec les données  du formulaire
      const response = await axios.post("http://localhost:8080/utilisateur/connexion", {
        email, motDePasse 
      })
      .then(response =>{
        const {pseudo} = response.data;
        
        //enregistre le pseudo et l'id utilisateur dans le localStorage
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("id", response.data.idUtilisateur); 
      
        //envoie la réponse à la console
        console.log(response.data);
        //met a jour l'état de connexion dans l'App
        onLogin(pseudo);
      })
      .catch(error => {
        //affiche message d'erreur venant du serveur
        setMessage(error.response.data.message);
      });
    //si une erreur se produit
    } catch (error) {
      //affiche un message d'erreur générique
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    // Conteneur centré horizontalement et verticalement avec un fond gris clair
    <Container className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#f4f4f4" }}>
      {/* Formulaire de connexion */} 
      <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Connexion</h2>

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
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required 
          />
        </Form.Group>

        {/* Bouton de soumission */}
        <Button variant="primary" type="submit" >
          Se connecter
        </Button>

        {/* Affichage du message d'erreur s'il n'est pas nul*/}
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
      </Form>
    </Container>
  );
};

export default Connexion;

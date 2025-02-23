//importe react et useState pour gérer l'etat des champs du formulaire
import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; 
//importe axios
import axios from "axios";
//import des composants spécifiques de boostrap
import { Button, Form, Container } from "react-bootstrap";
//importe le CSS de boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Composant gérant l'affichage et la soumission du formulaire de connexion
function Connexion({ onLogin }) {
  //déclaration des états en stockant les valeurs et en les mettant à jour via les set
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  //stockage de message retourné à la fin de la connexion
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //fonction qui gère la soumission du formulaire
  const handleSubmit = async (e) => {    
    //evite le chargement automatique après la soumission
    e.preventDefault();
    try {
      //envoie une requête post avec les données  du formulaire
      const response = await axios.post("http://localhost:8080/utilisateur/connexion", {
        email, motDePasse 
      })
      .then(response =>{
        //const pseudo = response.data.pseudo;
        //setMessage(response.data.message);

        const {pseudo} = response.data;
        
        // Enregistre les données de l'utilisateur dans localStorage
        localStorage.setItem("pseudo", pseudo);
              // Enregistre l'ID utilisateur dans le localStorage après une connexion réussie
        localStorage.setItem("id", response.data.idUtilisateur);  // Ajoute cette ligne
      
        console.log(response.data);
        onLogin(pseudo);
        navigate("/Home");
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
    //si une erreur se produit
    } catch (error) {
      //affiche un message d'erreur sinon
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    //aligne et centre le contenu horizontalement  et verticalement avec une hauteur minimale à la hauteur de l'ecran et la même couleur que le fond
    <Container className="d-flex justify-content-center align-items-center" style={{ minheight: "100vh", backgroundColor: "#f4f4f4" }}>
      {/*lorsque l'utilisateur clique sur s'inscire, handleSubmit s'execute 
         le formulaire a une largeur maximale de 400px et s'adapte à l'ecran*/}
      <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        {/*le titre est centré avecune marge inférieure mb-4*/}
        <h2 className="text-center mb-4">Connexion</h2>
        {/*regroupe un champ du formulaire*/}
        <Form.Group controlId="formEmail">
          {/*affiche le texte Email*/}
          <Form.Label>Email</Form.Label>
          {/*Champ de saisie où l'utilisateur entre son mail*/}
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            //liaison avec l'état mail   
            value={email}
            //met à jour l'état pseudo lorsque l'utilisateur tape sur le champ 
            onChange={(e) => setEmail(e.target.value)}
            required //rend le champ obligatoire
          />
        </Form.Group>
        {/*regroupe un champ du formulaire*/}
        <Form.Group controlId="formMotDePasse">
          {/*affiche le texte Mot de passe*/}
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            //liaison avec l'état mot de passe 
            value={motDePasse}
            //met à jour l'état mot de passe lorsque l'utilisateur tape sur le champ     
            onChange={(e) => setMotDePasse(e.target.value)}
            required //rend le champ obligatoire
          />
        </Form.Group>

        {/*style bleu pour le bouton et le type indique que le bouton déclanche la soumission*/}
        <Button variant="primary" type="submit" >
          Se connecter
        </Button>
        {/*Affiche un message seulement si il n'est pas vide
          en rouge, centré et avec une marge mt-3 */}
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
      </Form>
    </Container>
  );
};

export default Connexion;

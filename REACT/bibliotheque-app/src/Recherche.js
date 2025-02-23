import React, { useState, useEffect } from "react";
import axios from "axios";

// Définition du composant Recherche
const Recherche = () => {
  // Déclaration des états utilisés pour stocker les informations
  const [titre, setTitre] = useState(""); // Titre de recherche
  const [livres, setLivres] = useState([]); // Liste des livres trouvés
  const [error, setError] = useState(""); // Erreur potentielle lors de la requête
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  // Récupération de l'ID utilisateur depuis le localStorage
  const userIdString = localStorage.getItem("id");

  // Conversion en entier
  const userId = parseInt(userIdString, 10);
  
  // Affichage dans la console de l'ID utilisateur récupéré
  console.log("User ID from localStorage:", userId);
  

  // useEffect qui déclenche la recherche dès que le titre change
  useEffect(() => {
    // Si le titre est vide, on arrête ici et on réinitialise les livres et les erreurs
    if (titre.trim() === "") {
      setLivres([]);
      setError("");
      return; // Ne pas faire la recherche si aucun titre n'est saisi
    }

    setLoading(true); // Démarre le chargement
    axios
    // Envoi de la requête GET pour rechercher les livres par titre
      .get(`http://localhost:8080/livres/recherche/titre?titre=${titre}`)
      .then((response) => {
        // Si la requête réussit, on met à jour la liste des livres
        setLivres(response.data);
        console.log("Données reçues de l'API :", response.data);
        setError(""); // Réinitialisation de l'erreur
      })
      .catch((err) => {
        // En cas d'erreur, on affiche l'erreur dans la console et on réinitialise les livres
        console.error(err);
        setLivres([]);
        setError("Erreur lors de la récupération des livres.");
      })
      .finally(() => {
        // À la fin de la requête, on arrête le chargement
        setLoading(false); // Arrêt du chargement
      });
  }, [titre]); // Cette hook s'exécute à chaque fois que le titre change

  // Fonction qui s'exécute lorsque l'utilisateur clique sur "Ajouter à la bibliothèque"
  const handleAjoutBibliotheque = (idlivre, idEdition) => {
    // Vérification si l'utilisateur est connecté (si l'ID utilisateur est présent dans le localStorage)
    if (!userId) {
      alert("Utilisateur non connecté !");
      return;
    }

    // Demander à l'utilisateur de saisir le statut du livre (via un prompt)
    const statut = prompt("Entrez le statut du livre : 'pas encore lu', 'terminé' ou 'en cours'");
    if (!statut) return; // Si aucun statut n'est fourni, on arrête l'exécution

    // Création des données à envoyer à l'API
    const data = {
      idUtilisateur: userId,
      idEdition: idEdition,
      idLivre: idlivre,
      statut: statut,
    };

    // Affichage des données dans la console pour vérification
    console.log("Données envoyées :", data);

    // Envoi de la requête POST pour ajouter le livre à la bibliothèque de l'utilisateur
    axios
      .post("http://localhost:8080/possederLivre/ajouter", data)
      .then(() => {
        alert("Livre ajouté à votre bibliothèque !");
      })
      .catch((err) => {
        console.error("Erreur ajout bibliothèque :", err.response ? err.response.data : err.message);
        alert("Erreur lors de l'ajout du livre.");
      });
  };

  return (
    <div className="container my-4">
      {/* Champ de recherche par titre */}
      <input
        type="text"
        name="titre"
        placeholder="Recherche par titre"
        className="form-control"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      {/* Affichage de l'indicateur de chargement si la recherche est en cours */}
      {loading && <div className="alert alert-info mt-3">Chargement des livres...</div>}

      {/* Affichage de l'erreur en cas de problème avec la récupération des livres */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Affichage des livres si des résultats sont trouvés */}
      {livres.length > 0 && (
        <div className="mt-4">
          <h3>Livres trouvés :</h3>
          {livres.map((livre) => (
            <div key={livre.idlivre} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{livre.titre}</h5>
                {/* Affichage des auteurs */}
                <p><strong>Auteur(s):</strong> 
                  {livre.auteurs.map((auteur) => ` ${auteur.prenomAuteur} ${auteur.nomAuteur}`).join(", ")}
                </p>
                {/* Affichage des genres */}
                <p><strong>Genres:</strong> {livre.genres.map((genre) => genre.nomGenre).join(", ")}</p>

                <h6>Éditions :</h6>
                {/* Affichage des éditions associées au livre */}
                <ul className="list-group">
                  {livre.editions.map((edition, index) => (
                    <li key={`${livre.idlivre}-${edition.idEdition}-${index}`} className="list-group-item">
                      <p><strong>Éditeur:</strong> {edition.editeur}</p>
                      <p><strong>Date de publication:</strong> {edition.datePublication}</p>
                      <p><strong>Nombre de pages:</strong> {edition.nbPages}</p>
                      <p><strong>Format:</strong> {edition.format?.nomFormat}</p>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleAjoutBibliotheque(livre.idLivre, edition.idEdition)}
                      >
                        Ajouter à la bibliothèque
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message si aucun livre n'est trouvé */}
      {livres.length === 0 && titre && !loading && (
        <div className="alert alert-info mt-3">
          Aucun livre trouvé pour le titre "{titre}".
        </div>
      )}
    </div>
  );
};

export default Recherche;

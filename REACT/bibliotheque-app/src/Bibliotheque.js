//importations nécessaires
import React, { useState, useEffect } from "react";
import axios from "axios";

const Bibliotheque = () => {
  //état locaux pour gérer la liste des livres de la bibliothèque
  const [livres, setLivres] = useState([]); //liste des livres
  const [error, setError] = useState(""); //message d'erreur
  const [loading, setLoading] = useState(false); //indicateur de chargement
  const [nombreLivres, setNombreLivres] = useState(null); //nombre de livres possédé

  //récupère l'id de l'utilisateur à partir du localStorage
  const userIdString = localStorage.getItem("id");
  const userId = parseInt(userIdString, 10);

  //useEffect se déclenche dès que l'id de l'utilisateur change
  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }

    //fonction pour récupérer le nombre de livres possédés par l'utilisateur
    const fetchNombreLivres = async () => {
        try {
          //requête GET pour obtenir le nombre de livres que possède l'utilisateur
          const response = await axios.get(`http://localhost:8080/possederLivre/count/${userId}`);
          //met à jour l'état du nombre de livres
          setNombreLivres(response.data);
        } catch (err) {
          console.error("Erreur lors de la récupération du nombre de livres :", err);
        }
      };

    //fonction pour récupérer la liste des livres possédés par l'utilisateur
    const fetchLivresPossedes = async () => {
      try {
        //indique le chargement est en cours
        setLoading(true);
        //requête GET pour obtenir la liste des livres possédés par l'utilisateur
        const response = await axios.get(`http://localhost:8080/possederLivre/posseder/${userId}`);
        //met à jourl'état de la liste des livres
        setLivres(response.data);
        //réinitialiser le message d'erreur en cas de succès
        setError("");
      } catch (err) {
        //réinitialiser la liste des livres possédés en cas d'erreur
        setLivres([]);
        //afficher un message d'erreur
        setError("Erreur lors de la récupération des livres possédés.");
        console.error(err);
      } finally {
        //fin de chargement
        setLoading(false);
      }
    };
    //appel des fonctions pour récupérer les données
    fetchNombreLivres();
    fetchLivresPossedes();
  }, [userId]); //déclanche useEffect lorsque l'id de l'utilisateur change

  //fonction pour enlever un livre de la bibliothèque
  const handleEnleverDeLaBibliotheque = async (idPossession) => {
    try {
      //requête DELETE pour retirer un livre de la bibliothèque
      await axios.delete(`http://localhost:8080/possederLivre/gerer-possession/${idPossession}`);
      //met à jour la liste en filtrant le livre concerné
      setLivres(livres.filter(livre => livre.idPossession !== idPossession));
      // Mise à jour du nombre de livres
      setNombreLivres((prevCount) => Math.max(0, prevCount - 1));
    } catch (err) {
      console.error("Erreur lors de la gestion de la possession du livre :", err);
    }
  };

  //fonction pour modifier le statut de lecture du livre
  const handleChangeStatut = async (idPossession, nouveauStatut) => {
    try {
      //recherche le livre à modifier dans la liste des livres
      const livre = livres.find(l => l.idPossession === idPossession);
      if (livre.statutLecture === nouveauStatut) {
        //si le statut actuel est le même que l'ancien, on affiche une alerte
        alert("C'est déjà votre statut de lecture !");
        return;
      }
      //requête PUT pour mettre à jour le statut de lecture du livre
      const response = await axios.put(`http://localhost:8080/possederLivre/modifierStatut/${idPossession}`, null, {
        params: { statutLecture: nouveauStatut }
      });
      //mise à jour de la liste des livres avec le nouveau statut modifié
      setLivres(livres.map(l =>
        l.idPossession === idPossession ? { ...l, statutLecture: response.data.statutLecture } : l
      ));
    } catch (err) {
      console.error("Erreur lors de la modification du statut de lecture :", err);
    }
  };

  //liste des statuts de lecture possibles
  const statutsLecture = ["pas encore lu", "en cours", "terminé"];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bibliothèque</h1>

      {/* affichage du message de chargement */}
      {loading && <div className="alert alert-info">Chargement des livres...</div>}
      
      {/*Affichage du message d'erreur s'il y en a un */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Affichage du nombre de livres possédés si disponible */}
      {nombreLivres !== null && !loading && (
        <h4>Vous possédez {nombreLivres} livre(s).</h4>
      )}
      {/* Message si aucun livre n'est trouvé */}
      {livres.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre trouvé dans votre bibliothèque.</p>
      )}

      {/* Affichage des livres possédés avec leurs informations*/}
      {livres.length > 0 && (
        <div>
          {livres.map((livre) => (
            <div key={livre.idPossession} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Affichage des informations des livres possédés*/}
                    <div className="col-md-4">
                      <h5 className="card-title" style={{ color: 'red' }}>{livre.livre.titre}</h5>
                      <p className="card-text">
                        <strong>Auteur(s):</strong> 
                        {livre.livre.auteurs.map((auteur) => ` ${auteur.prenomAuteur} ${auteur.nomAuteur}`).join(", ")}
                      </p>
                      <p className="card-text">
                        <strong>Editeur possédé:</strong> {livre.edition.editeur}
                      </p>
                      <p className="card-text">
                        <strong>Nombre de pages:</strong> {livre.edition.nbPages}
                      </p>
                      <p className="card-text">
                        <strong>Format:</strong> {livre.edition.format.nomFormat}
                      </p>
                    </div>

                    {/* Affichage des boutons pour changer le statut de lecture */}
                    <div className="col-md-4 ">
                      <p className="card-text">
                        <strong>Statut de lecture:</strong> {livre.statutLecture}
                      </p>
                      <div className="btn-group">
                        {statutsLecture.map((statut) => (
                          <button
                            key={statut}
                            className={`btn ${livre.statutLecture === statut ? "btn-secondary" : "btn-outline-primary"}`}
                            onClick={() => handleChangeStatut(livre.idPossession, statut)}
                          >
                            {statut}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bouton pour retirer un livre de la bibliothèque */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <button
                        onClick={() => handleEnleverDeLaBibliotheque(livre.idPossession)}
                        className="btn btn-danger"
                      >
                        Retirer de la bibliothèque
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bibliotheque;

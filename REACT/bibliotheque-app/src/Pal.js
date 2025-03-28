//importation nécessaires
import React, { useState, useEffect } from "react";
import axios from "axios";

const Pal = () => {
  //déclaration des états du composant
  const [livres, setLivres] = useState([]); // Liste des livres
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [nombreLivres, setNombreLivres] = useState(null); // Nombre de livres dans la PAL

  //récupération de l'id utilisateur depuis le localStorage
  const userIdString = localStorage.getItem("id");
  //conversion en entier
  const userId = parseInt(userIdString, 10);

  //fonction pour récupérer le nombre de livres pas encore lu
  const fetchNombreLivres = async () => {
    try {
      //requêtes GET pour obtenir le nombre de livres pas encore lu
      const response = await axios.get(`http://localhost:8080/possederLivre/pasLu/${userId}`);
      //met à jour l'état du nombre de livres
      setNombreLivres(response.data.length);
    } catch (err) {
      console.error("Erreur lors de la récupération du nombre de livres :", err);
    }
  };

  //fonction pour récupérer la liste des livres pas encore lu
  const fetchLivresPasEncoreLu = async () => {
    try {
      //indique que le chargement est en cours
      setLoading(true);
      //requête GET pour récupérer tous les livres pas encore lu d'un utilisateur
      const response = await axios.get(`http://localhost:8080/possederLivre/pasLu/${userId}`);
      //met à jour l'état de la liste des livres terminés
      setLivres(response.data);
      //réinitialise les erreurs
      setError("");
    } catch (err) {
      //réinitialise la liste des livres pas encore lu
      setLivres([]);
      setError("Erreur lors de la récupération des livres pas encore lu.");
      console.error(err);
    } finally {
      //indique que le chargement est terminé
      setLoading(false);
    }
  };

  //useEffect pour récupérer les données lors du montage des composants
  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }
    fetchNombreLivres();
    fetchLivresPasEncoreLu();
  }, [userId]); //s'exécute lorsque l'utilisateur change d'id

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

      // met à jour de la liste des livres avec le nouveau statut modifié
      setLivres(prevLivres => {
      const updatedLivres = prevLivres.map(l =>
          l.idPossession === idPossession ? { ...l, statutLecture: response.data.statutLecture } : l
      );

      //filtre les livres pour ne garder que ceux qui ont le statut "pas encore lu"
      return updatedLivres.filter(livre => livre.statutLecture === "pas encore lu");
      });

      // met à jour du nombre de livres non lus
      setNombreLivres((prevCount) => Math.max(0, prevCount - 1));
    } catch (err) {
      console.error("Erreur lors de la modification du statut de lecture :", err);
    }
  };

  // Statuts de lecture possibles
  const statutsLecture = ["pas encore lu", "en cours", "terminé"];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Pile à Lire</h1>

      {/* Affichage des messages d'erreur et de chargement */}
      {loading && <div className="alert alert-info">Chargement des livres...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Affichage du nombre de livres terminés */}
      {nombreLivres !== null && !loading && (
        <h4>Vous possédez {nombreLivres} livre(s) dans votre PAL.</h4>
      )}

      {/* Message si aucun livre n'a été trouvé */}
      {livres.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre trouvé dans votre Pile à lire.</p>
      )}

      {/* Affichage des livres pas encore lu */}
      {livres.length > 0 && (
        <div>
          {livres.map((livre) => (
            <div key={livre.idPossession} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Affichage des informations sur l'édition du livre */}
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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

export default Pal;

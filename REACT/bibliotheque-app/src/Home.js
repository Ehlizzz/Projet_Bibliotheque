//importations nécessaires
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  //déclaration des états utilisés pour stocker les informations
  const [livresTermines, setLivresTermines] = useState([]); // Liste des livres terminés
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [nombreLivresTermines, setNombreLivresTermines] = useState(null); // Nombre de livres terminés
  const [notes, setNotes] = useState({}); // Objet pour stocker les notes

  //récupération de l'id utilisateur depuis le localStorage
  const userIdString = localStorage.getItem("id");
  //conversion en entier
  const userId = parseInt(userIdString, 10);

  //fonction pour récupérer le nombre de livres terminés
  const fetchNombreLivresTermines = async () => {
    try {
      //requêtes GET pour obtenir le nombre de livres terminés
      const response = await axios.get(`http://localhost:8080/possederLivre/termines/${userId}`);
      //met à jour l'état du nombre de livres terminés
      setNombreLivresTermines(response.data.length); 
    } catch (err) {
      console.error("Erreur lors de la récupération du nombre de livres terminés :", err);
    }
  };

  //fonction pour récupérer la liste des livres terminés
  const fetchLivresTermines = async () => {
    try {
      //indique que le chargement est en cours
      setLoading(true); 
      //requête GET pour récupérer tous les livres terminés d'un utilisateur
      const response = await axios.get(`http://localhost:8080/possederLivre/termines/${userId}`);
      //met à jour l'état de la liste des livres terminés
      setLivresTermines(response.data); 
      //réinitialise les erreurs
      setError(""); 
      //initialise les notes des livres terminés
      const initialNotes = response.data.reduce((acc, livresTermines) => {
        //// Utiliser la note si elle existe
        acc[livresTermines.idPossession] = livresTermines.note || 0; 
        return acc;
      }, {});
      //met à jour l'état des notes
      setNotes(initialNotes);
    } catch (err) {
      //réinitialise la liste des livres terminés
      setLivresTermines([]);
      setError("Erreur lors de la récupération des livres terminés.");
      console.error(err);
    } finally {
      //indique que le chargement est terminé
      setLoading(false);
    }
  };

  //fonction pour remettre un livre terminé dans la bibliothèque
  const remettreDansBibliotheque = async (idPossession) => {
    try {
      //requête POST pour remettre le livre dans la bibliothèque
      const response = await axios.post(`http://localhost:8080/possederLivre/remettre/${idPossession}`);
      //prévient l'utilisateur a remis le livre dans la bibliothèque
      alert("Livre remis dans la bibliothèque !");
    } catch (err) {
      console.error("Erreur lors de la remise du livre dans la bibliothèque", err);
      alert("Ce livre est déjà dans la bibliothèque");
    }
  };

  // fonction pour mettre à jour la note d'un livre
  const handleNoteChange = async (idPossession, note) => {
    try {
      //requête PUT pour modifier la note d'un livre
      await axios.put(`http://localhost:8080/possederLivre/${idPossession}/note/${note}`);
      //rafraichit la liste après la modification
      fetchLivresTermines();
      setNotes((Notesprec) => ({
        ...Notesprec,
        [idPossession]: note,
      }));

    } catch (err) {
      console.error("Erreur lors de l'ajout ou modification de la note :", err);
      alert("Erreur lors de l'ajout ou modification de la note.");
    }
  };

  //useEffect pour récupérer les données lors du montage des composants
  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }
    fetchNombreLivresTermines();
    fetchLivresTermines();
  }, [userId]); //s'exécute lorsque l'utilisateur change d'id

  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Livres Terminés</h1>

      {/* Affichage des messages d'erreur et de chargement */}
      {loading && <div className="alert alert-info">Chargement des livres terminés...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Affichage du nombre de livres terminés */}
      {nombreLivresTermines !== null && !loading && (
        <h4 className="text-center">Vous avez terminé {nombreLivresTermines} livre(s).</h4>
      )}

      {/* Message si aucun livre n'a été trouvé */}
      {livresTermines.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre terminé trouvé dans votre bibliothèque.</p>
      )}

      {/* Affichage des livres terminés */}
      {livresTermines.length > 0 && (
        <div>
          {livresTermines.map((livresTermines) => (
            <div key={livresTermines.idPossession} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Affichage des informations sur l'édition du livre */}
                    <div className="col-md-4">
                      <h4 className="card-title" style={{ color: 'red' }}>{livresTermines.livre.titre}</h4>
                      <p className="card-text">
                        <strong>Auteur(s):</strong>
                        {livresTermines.livre.auteurs
                          .map((auteur) => ` ${auteur.prenomAuteur} ${auteur.nomAuteur}`)
                          .join(", ")}
                      </p>
                      <p className="card-text"><strong>Éditeur:</strong> {livresTermines.edition.editeur}</p>
                      <p className="card-text"><strong>Pages:</strong> {livresTermines.edition.nbPages}</p>
                      <p className="card-text"><strong>Format:</strong> {livresTermines.edition.format.nomFormat}</p>
                    </div>
                    {/* Affichage de la note avec un sélecteur pour la modifier ainsi qu'un bouton pour valider la modification */}
                    <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                        <p className="card-text"><strong>Note:</strong> {livresTermines.note}</p>

                      <label htmlFor={`note-${livresTermines.idPossession}`} className="mr-2">Note :</label>
                      <select
                        id={`note-${livresTermines.idPossession}`}
                        className="form-control-sm mb-1"
                        value={notes[livresTermines.idPossession] || 0}
                        onChange={(e) => setNotes({
                          ...notes,
                          [livresTermines.idPossession]: e.target.value
                        })}
                      >
                        {Array.from({ length: 21 }, (_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleNoteChange(livresTermines.idPossession, notes[livresTermines.idPossession])}
                      >
                        OK
                      </button>
                    {/* Affichage d'un bouton permettant de remettre un livre dans la bibliothèque */}
                    </div>
                    <div className="col-md-4 d-flex  align-items-center">
                      <button
                        className="btn btn-success"
                        onClick={() => remettreDansBibliotheque(livresTermines.idPossession)}
                      >
                        Remettre dans la bibliothèque
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

export default Home;

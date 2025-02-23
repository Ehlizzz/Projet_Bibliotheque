import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [livresTermines, setLivresTermines] = useState([]); // Liste des livres terminés
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [nombreLivresTermines, setNombreLivresTermines] = useState(null); // Nombre de livres terminés
  const [notes, setNotes] = useState({}); // Objet pour stocker les notes

  const userIdString = localStorage.getItem("id");
  const userId = parseInt(userIdString, 10);

  const fetchNombreLivresTermines = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/possederLivre/termines/${userId}`);
      setNombreLivresTermines(response.data.length); 
    } catch (err) {
      console.error("Erreur lors de la récupération du nombre de livres terminés :", err);
    }
  };

  const fetchLivresTermines = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/possederLivre/termines/${userId}`);
      setLivresTermines(response.data); 
      setError(""); 
      // Initialiser les notes avec les données de la base de données
      const initialNotes = response.data.reduce((acc, livresTermines) => {
        acc[livresTermines.idPossession] = livresTermines.note || 0; // Utiliser la note si elle existe
        return acc;
      }, {});
      setNotes(initialNotes);
    } catch (err) {
      setLivresTermines([]);
      setError("Erreur lors de la récupération des livres terminés.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remettreDansBibliotheque = async (idPossession) => {
    try {
      const response = await axios.post(`http://localhost:8080/possederLivre/remettre/${idPossession}`);
      alert("Livre remis dans la bibliothèque !");
      fetchLivresTermines(); // On réactualise la liste après avoir remis un livre
    } catch (err) {
      console.error("Erreur lors de la remise du livre dans la bibliothèque", err);
      alert("Erreur lors de la remise du livre dans la bibliothèque.");
    }
  };

  // Fonction pour mettre à jour la note d'un livre
  const handleNoteChange = async (idPossession, note) => {
    try {
      await axios.put(`http://localhost:8080/possederLivre/${idPossession}/note/${note}`);
      fetchLivresTermines();
      setNotes((prevNotes) => ({
        ...prevNotes,
        [idPossession]: note,
      }));

      alert("Note mise à jour avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout ou modification de la note :", err);
      alert("Erreur lors de l'ajout ou modification de la note.");
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }
    fetchNombreLivresTermines();
    fetchLivresTermines();
  }, [userId]);

  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Livres Terminés</h1>

      {loading && <div className="alert alert-info">Chargement des livres terminés...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {nombreLivresTermines !== null && !loading && (
        <h4 className="text-center">Vous avez terminé {nombreLivresTermines} livre(s).</h4>
      )}

      {livresTermines.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre terminé trouvé dans votre bibliothèque.</p>
      )}

      {livresTermines.length > 0 && (
        <div className="row">
          {livresTermines.map((livresTermines) => (
            <div key={livresTermines.idPossession} className="col-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <h4 className="card-title">{livresTermines.livre.titre}</h4>
                      <p className="card-text">
                        <strong>Auteur(s):</strong>{" "}
                        {livresTermines.livre.auteurs
                          .map((auteur) => ` ${auteur.prenomAuteur} ${auteur.nomAuteur}`)
                          .join(", ")}
                      </p>
                      <p className="card-text"><strong>Éditeur:</strong> {livresTermines.edition.editeur}</p>
                      <p className="card-text"><strong>Pages:</strong> {livresTermines.edition.nbPages}</p>
                      <p className="card-text"><strong>Format:</strong> {livresTermines.edition.format.nomFormat}</p>
                    </div>
                    <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
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
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
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

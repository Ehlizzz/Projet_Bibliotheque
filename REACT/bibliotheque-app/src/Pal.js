import React, { useState, useEffect } from "react";
import axios from "axios";

const Pal = () => {
  const [livres, setLivres] = useState([]); // Liste des livres
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [nombreLivres, setNombreLivres] = useState(null); // Nombre de livres possédé

  const userIdString = localStorage.getItem("id");
  const userId = parseInt(userIdString, 10);

  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }    

    const fetchNombreLivres = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/possederLivre/pasLu/${userId}`);
          setNombreLivres(response.data.length);
        } catch (err) {
          console.error("Erreur lors de la récupération du nombre de livres :", err);
        }
      };

    const fetchLivresPasEncoreLu = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/possederLivre/pasLu/${userId}`);
        setLivres(response.data);
        setError("");
      } catch (err) {
        setLivres([]);
        setError("Erreur lors de la récupération des livres possédés.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNombreLivres();
    fetchLivresPasEncoreLu();
  }, [userId]);

  const handleChangeStatut = async (idPossession, nouveauStatut) => {
    try {
      const livre = livres.find(l => l.idPossession === idPossession);
      if (livre.statutLecture === nouveauStatut) {
        alert("C'est déjà votre statut de lecture !");
        return;
      }
  
      const response = await axios.put(`http://localhost:8080/possederLivre/modifierStatut/${idPossession}`, null, {
        params: { statutLecture: nouveauStatut }
      });
  
      // Mise à jour de la liste des livres après modification du statut
      setLivres(prevLivres => {
        if (Array.isArray(prevLivres)) {
          const updatedLivres = prevLivres.map(l =>
            l.idPossession === idPossession ? { ...l, statutLecture: response.data.statutLecture } : l
          );
  
          // Filtrer les livres pour ne garder que ceux qui ont le statut "pas encore lu"
          return updatedLivres.filter(livre => livre.statutLecture === "pas encore lu");
        }
        return [];  // Retourner un tableau vide si prevLivres n'est pas un tableau
      });
  
      // Mise à jour du nombre de livres non lus
      setNombreLivres((prevCount) => Math.max(0, prevCount - 1));      
    } catch (err) {
      console.error("Erreur lors de la modification du statut de lecture :", err);
    }
  };
  
  
  

  const statutsLecture = ["pas encore lu", "en cours", "terminé"];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Pile à Lire</h1>

      {loading && <div className="alert alert-info">Chargement des livres...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {nombreLivres !== null && !loading && (
        <h4>Vous possédez {nombreLivres} livre(s).</h4>
      )}
      {livres.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre trouvé dans votre Pile à lire.</p>
      )}

      {livres.length > 0 && (
        <div>
          {livres.map((livre) => (
            <div key={livre.idPossession} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Première colonne : toutes les infos sauf le statut */}
                    <div className="col-md-6">
                      <h5 className="card-title">{livre.livre.titre}</h5>
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

                    {/* Deuxième colonne : statut de lecture + menu */}
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

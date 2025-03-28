//importations nécessaires
import React, { useState, useEffect } from "react";
import axios from "axios";

const LecturesEnCours = () => {
  //déclaration des états du composant
  const [lecturesEnCours, setLecturesEnCours] = useState([]); // Liste des lectures en cours
  const [progressions, setProgressions] = useState({}); // Stockage des progressions pour chaque livre
  const [error, setError] = useState(""); // Message d'erreur
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [nombreLivres, setNombreLivres] = useState(null); //nombre de lectures en cours

  //récupération de l'id de l'utilisateur depuis le localStorage
  const userIdString = localStorage.getItem("id");
  //convertir l'id en entier
  const userId = parseInt(userIdString, 10);

  //fonction pour récupérer le nombre de livres en cours de lecture
  const fetchNombreLivres = async () => {
    try {
        //requête GET pour récupérer les livres en cours de lectures
        const response = await axios.get(`http://localhost:8080/possederLivre/enCours/${userId}`);
        //met à jour l'état du nombre de livres en cours de lecture
        setNombreLivres(response.data.length);
    } catch (err) {
        console.error("Erreur lors de la récupération du nombre de livres :", err);
    }
  };

  //fonction pour récupérer la liste des lectures en cours
  const fetchLecturesEnCours = async () => {
    try {
      //affichage du message de chargement
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/possederLivre/enCours/${userId}`);
      //met à jour l'état de la liste des livres en cours de lectures
      setLecturesEnCours(response.data);
      //réinitialise le message d'erreur en cas de succès
      setError("");

      //initialise les progressions avec les données existantes ou une valeur par défaut
      const initialProgressions = response.data.reduce((acc, lecture) => {
        acc[lecture.idPossession] = lecture.progression || 0; 
        return acc;
      }, {});
      //met à jour l'état des progressions
      setProgressions(initialProgressions);
    } catch (err) {
      //met à vide la liste des livres en cours de lectures
      setLecturesEnCours([]);
      setError("Erreur lors de la récupération des lectures en cours.");
      console.error(err);
    } finally {
      //arrêt du chargement une fois la récupération terminé
      setLoading(false);
    }
  };

  //fonction pour mettre à jour la progression du livre dans la base de données
  const updateProgression = async (idPossession, newProgression) => {
    try {
      // Sauvegarde la progression immédiatement
      await axios.put(`http://localhost:8080/possederLivre/${idPossession}/progression/${newProgression}`);
      //met à jour l'état pour la progression 
      setProgressions((Progressionsprec) => ({
        ...Progressionsprec,
        [idPossession]: newProgression,
      }));
      //recharge la liste des livres après la mise à jour
      fetchLecturesEnCours();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la progression :", err);
      alert("Erreur lors de la mise à jour de la progression.");
    }
  };

  // Utilise useEffect pour charger les livres en cours au montage du composant
  useEffect(() => {
    if (!userId) {
      setError("Utilisateur non trouvé");
      return;
    }
    fetchNombreLivres(); //récupère le nombre de livres en cours
    fetchLecturesEnCours(); //récupère les livres en cours
  }, [userId]); //se déclenche lorsque l'id de l'utilisateur change

  //fonction qui gère la modification de la progression d'un livre
  const handleProgressionChange = (idPossession, newProgression, maxPages) => {
    //valide la nouvelle progression pour ne pas dépasser les limites de pages
    const validatedProgression = Math.min(Math.max(0, newProgression), maxPages);
    //met à jour l'état des progressions
    setProgressions((Progressionsprec) => ({
      ...Progressionsprec,
      [idPossession]: validatedProgression,
    }));

    // Sauvegarde la progression dès qu'elle est changée
    updateProgression(idPossession, validatedProgression);

    //affiche un message de succès si un livre est terminé
    if (validatedProgression === maxPages) {
      // Délai de 1 seconde avant d'afficher l'alerte
      setTimeout(() => {
        alert("Bravo, vous avez fini un livre !");
      }, 500); 
    }

    //filtre les livres pour n'afficher que ceux en cours de lecture
    const updatedLecturesEnCours = lecturesEnCours.filter((lecture) => lecture.statutLecture === "en cours");

    //met à jour du nombre de livres non lus
    setNombreLivres((Countprec) => Math.max(0, Countprec - 1));
    
    //met à jour la liste des lectures en cours
    setLecturesEnCours(updatedLecturesEnCours);

  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lectures en cours</h1>

      {/* Affichage du message de chargement */}
      {loading && <div className="alert alert-info">Chargement des lectures en cours...</div>}
      {/* Affichage des erreurs */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Affichage du nombre de livres en cours */}
      {nombreLivres!== null && !loading && (
        <h4>Vous possédez {lecturesEnCours.length} livre(s) dans vos livres en cours.</h4>
      )}
      
      {/* Affichage d'un message si aucune lecture n'est en cours */}
      {lecturesEnCours.length === 0 && !loading && !error && (
        <p className="text-center">Aucun livre trouvé dans vos livres en cours.</p>
      )}

      {/* Affichage de la liste des livres en cours */}
      {lecturesEnCours.length > 0 && (
        <div >
          {lecturesEnCours.map((lecture) => (
            <div key={lecture.idPossession} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    {/* Affichage des informations du livre */}
                    <div className="col-md-4">
                      <h4 className="card-title" style={{ color: 'red' }}>{lecture.livre.titre}</h4>
                      <p className="card-text">
                        <strong>Auteur(s):</strong>{" "}
                        {lecture.livre.auteurs
                          .map((auteur) => `${auteur.prenomAuteur} ${auteur.nomAuteur}`)
                          .join(", ")}
                      </p>
                      <p className="card-text">
                        <strong>Éditeur:</strong> {lecture.edition.editeur}
                      </p>
                      <p className="card-text">
                        <strong>Pages:</strong> {lecture.edition.nbPages}
                      </p>
                    </div>

                    {/* Affichage de la progression */}
                    <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
                      <p className="card-text">
                        <strong>Progression:</strong> {progressions[lecture.idPossession]} / {lecture.edition.nbPages} pages
                      </p>
                      <div className="progress w-100">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(progressions[lecture.idPossession] / lecture.edition.nbPages) * 100}%`,
                          }}
                        >
                          {Math.floor((progressions[lecture.idPossession] / lecture.edition.nbPages) * 100)}%
                        </div>
                      </div>

                      {/* Champ pour modifier la progression */}
                      <label htmlFor={`page-${lecture.idPossession}`} className="mt-2">Page actuelle :</label>
                      <input
                        type="number"
                        id={`page-${lecture.idPossession}`}
                        className="form-control-sm mb-2"
                        min="0"
                        max={lecture.edition.nbPages}
                        value={progressions[lecture.idPossession] || 0}
                        onChange={(e) => handleProgressionChange(lecture.idPossession, e.target.value, lecture.edition.nbPages)}
                      />
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

export default LecturesEnCours;

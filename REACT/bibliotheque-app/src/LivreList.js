import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//import { AuthContext } from "./AuthContext";

function LivreList() {
  const { user } = useContext(AuthContext);
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get("http://localhost:8080/livres")
        .then((response) => {
          setLivres(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur de récupération des livres", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return <p>Veuillez vous connecter pour voir la liste des livres.</p>;

  return (
    <div>
      <h1>Liste des Livres</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {livres.map((livre) => (
            <li key={livre.idLivre}>{livre.titre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LivreList;

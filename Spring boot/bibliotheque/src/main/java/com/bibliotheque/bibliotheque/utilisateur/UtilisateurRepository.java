package com.bibliotheque.bibliotheque.utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;
//importe Optional permettant d'encapsuler un objet potentiellement null
import java.util.Optional;

//Déclare une interface qui hérite de JpaRepository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>{
	//rechercher un utilisateur par son email
	Optional<Utilisateur> findByEmail(String email); 
	//rechercher un utilisateur par son pseudo
	Optional<Utilisateur> findByPseudo(String pseudo); 
}

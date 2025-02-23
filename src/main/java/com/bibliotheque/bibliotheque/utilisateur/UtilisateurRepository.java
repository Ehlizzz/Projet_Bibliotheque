package com.bibliotheque.bibliotheque.utilisateur;

//importe JpaRepository pour utiliser des méthodes
import org.springframework.data.jpa.repository.JpaRepository;
//importe Optional permettant d'encapsuler un objet potentiellement null
import java.util.Optional;

//Déclare une interface qui hérite de JpaRepository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long>{
	// Pour rechercher un utilisateur par son email
	Optional<Utilisateur> findByEmail(String email); 
}

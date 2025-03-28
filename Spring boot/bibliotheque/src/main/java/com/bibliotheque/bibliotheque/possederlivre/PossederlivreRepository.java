package com.bibliotheque.bibliotheque.possederlivre;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bibliotheque.bibliotheque.edition.Edition;
import com.bibliotheque.bibliotheque.utilisateur.Utilisateur;

@Repository
public interface PossederlivreRepository extends JpaRepository<Possederlivre, Long> {
	
	//trouver tous les livres terminés par un utilisateur
    @Query("SELECT pl FROM Possederlivre pl WHERE pl.utilisateur.id = :idUtilisateur AND pl.statutLecture = 'terminé'")
    List<Possederlivre> findLivresTerminesByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
	
    //trouver tous les livres pas encore lu par un utilisateur
    @Query("SELECT pl FROM Possederlivre pl WHERE pl.utilisateur.id = :idUtilisateur AND pl.statutLecture = 'pas encore lu'")
    List<Possederlivre> findLivresPasEncoreLuByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
    
    //trouver tous les livres en cours de l'utilisateur
    @Query("SELECT pl FROM Possederlivre pl WHERE pl.utilisateur.id = :idUtilisateur AND pl.statutLecture = 'en cours'")
    List<Possederlivre> findLivresEnCoursByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
    
    //trouver tous les livres possédés par un utilisateur
    @Query("SELECT p FROM Possederlivre p WHERE p.utilisateur.idUtilisateur = :idUtilisateur AND p.possede = true")
	List<Possederlivre> findLivresPossedesByUtilisateur(@Param("idUtilisateur") Long idUtilisateur);
	
    //compter le nombre de livres dans la bibliothèque
	@Query("SELECT COUNT(p) FROM Possederlivre p WHERE p.utilisateur.idUtilisateur = :idUtilisateur AND p.possede = true")
    int countLivresPossedes(@Param("idUtilisateur") Long idUtilisateur);

    // Trouver tous les livres possédés par un utilisateur
    List<Possederlivre> findByUtilisateur(Utilisateur utilisateur);

    // Trouver un PossederLivre par utilisateur et édition
    Optional<Possederlivre> findByUtilisateurAndEdition(Utilisateur utilisateur, Edition edition);
    
    //vérifie si une édition existe pour un utilisateur
	boolean existsByUtilisateurAndEdition(Utilisateur utilisateur, Edition edition);
    
}

package com.bibliotheque.bibliotheque.livre;

//importe JpaRepository pour utiliser la méthode findAll
import org.springframework.data.jpa.repository.JpaRepository;

//importe les listes
import java.util.List;

//Déclare une interface qui hérite de JpaRepository
public interface LivreRepository extends JpaRepository<Livre, Long> {
	//déclare une methode findAll qui retourne tout les livres de la base de données
	List<Livre> findAll();
	List<Livre> findByTitreContainingIgnoreCase(String titre);

}

package com.bibliotheque.bibliotheque.livre;

//importe @Autowired pour injecter automatiquement des dépendances
import org.springframework.beans.factory.annotation.Autowired;
//importe @Service pour le marquer comme tel
import org.springframework.stereotype.Service;
//importe les listes
import java.util.List;

//permet de la reconnaitre comme un composant métier
@Service
public class LivreService {
	//permet d'injecter automatiquement LivreRepository
    @Autowired
    private LivreRepository livreRepository;

    //methode qui récupère tout les livres de la base de données
    public List<Livre> getAllLivres() {
    	//retourne tout les livres via la méthode findAll
        return livreRepository.findAll();
    }
    public List<Livre> findByTitre(String titre) {
    	return livreRepository.findByTitreContainingIgnoreCase(titre);
    }

}
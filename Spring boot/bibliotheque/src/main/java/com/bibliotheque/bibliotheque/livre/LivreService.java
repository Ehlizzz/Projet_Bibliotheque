package com.bibliotheque.bibliotheque.livre;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivreService {
    @Autowired
    private LivreRepository livreRepository;

    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }
    public List<Livre> findByTitre(String titre) {
    	return livreRepository.findByTitreContainingIgnoreCase(titre);
    }

}
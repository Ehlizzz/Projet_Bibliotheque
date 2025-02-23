package com.bibliotheque.bibliotheque.auteur;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuteurService {

    @Autowired
    private AuteurRepository auteurRepository;

    // Récupérer tous les auteurs
    public List<Auteur> getAllAuteurs() {
        return auteurRepository.findAll();
    }

}
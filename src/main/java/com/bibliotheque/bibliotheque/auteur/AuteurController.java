package com.bibliotheque.bibliotheque.auteur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auteurs")
public class AuteurController {

    @Autowired
    private AuteurService auteurService;

    // Récupérer tous les auteurs
    @GetMapping
    public List<Auteur> getAllAuteurs() {
        return auteurService.getAllAuteurs();
    }

}
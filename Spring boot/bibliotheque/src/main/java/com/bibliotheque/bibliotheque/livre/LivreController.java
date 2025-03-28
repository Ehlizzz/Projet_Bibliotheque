package com.bibliotheque.bibliotheque.livre;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/livres")

public class LivreController {

    @Autowired
    private LivreService livreService;

    @GetMapping
    public List<Livre> getAllLivres() {
        return livreService.getAllLivres();
    }
    
    @GetMapping("/recherche/titre")
    public List<Livre> searchLivres(@RequestParam(required = false) String titre){
        if (!titre.isEmpty()) {
            return livreService.findByTitre(titre);
        } else {
            return new ArrayList<>();
        }
    }

}
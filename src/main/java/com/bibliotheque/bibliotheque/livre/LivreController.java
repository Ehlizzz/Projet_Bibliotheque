package com.bibliotheque.bibliotheque.livre;

//importe @Autowired pour injecter automatiquement de dépendances
import org.springframework.beans.factory.annotation.Autowired;
//import @GetMapping pour gérer les requêtes get
import org.springframework.web.bind.annotation.GetMapping;
//importe @RequestMapping pour définir l'url
import org.springframework.web.bind.annotation.*;
//importe les listes
import java.util.List;
import java.util.ArrayList;
//indique que la classe est un controleur
@RestController

//définit le point d'accès pour ce controleur
@RequestMapping("/livres")

//Autorise React à faire des requêtes
@CrossOrigin(origins = "http://localhost:3000") 

//déclare la classe LivreController
public class LivreController {

	//injecte automatiquement une instance de LivreService
    @Autowired
    private LivreService livreService;

    // Associe cette méthode aux requêtes GET envoyées à l'url
    @GetMapping
    
    //Methode qui récupère tout les livres de la base de données
    public List<Livre> getAllLivres() {
        return livreService.getAllLivres();
    }
    
    @GetMapping("/recherche/titre")
    public List<Livre> searchLivres(@RequestParam(required = false) String titre){
        if (titre != null && !titre.isEmpty()) {
            return livreService.findByTitre(titre);
        } else {
            return new ArrayList<>();
        }
    }

}
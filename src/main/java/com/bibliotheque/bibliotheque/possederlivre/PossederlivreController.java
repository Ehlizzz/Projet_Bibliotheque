package com.bibliotheque.bibliotheque.possederlivre;

import java.util.List;

//import java.util.Date;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bibliotheque.bibliotheque.utilisateur.Utilisateur;

@RestController
@RequestMapping("/possederLivre")
public class PossederlivreController {
	@Autowired
    private PossederlivreService possederLivreService;

    public PossederlivreController(PossederlivreService possederLivreService) {
        this.possederLivreService = possederLivreService;
    }
    
    @GetMapping("/posseder/{idUtilisateur}")
    public ResponseEntity<List<Possederlivre>> getLivresPossedes(@PathVariable Long idUtilisateur) {
        List<Possederlivre> livresPossedes = possederLivreService.getLivresPossedes(idUtilisateur);
        if (livresPossedes.isEmpty()) {
            return ResponseEntity.noContent().build(); // Si aucun livre possédé, on renvoie une réponse sans contenu
        }
        return ResponseEntity.ok(livresPossedes); // On renvoie la liste des livres possédés
    }

    @GetMapping("/termines/{idUtilisateur}")
    public List<Possederlivre> getLivresTermines(@PathVariable Long idUtilisateur) {
        return possederLivreService.getLivresTermines(idUtilisateur);
    }
    
    @GetMapping("/pasLu/{idUtilisateur}")
    public List<Possederlivre> getLivrePasEncoreLu(@PathVariable Long idUtilisateur){
    	return possederLivreService.getLivresPasEncoreLu(idUtilisateur);
    }
    
 // Méthode pour ajouter un livre à la possession d'un utilisateur
    @PostMapping("/ajouter")
    public ResponseEntity<Possederlivre> ajouterLivre(@RequestBody PossederLivreRequest request) {
    	// Appel du service pour ajouter un livre avec les informations fournies dans la requête
        Possederlivre possederLivre = possederLivreService.ajouterLivreALaBibliotheque(
            request.getIdUtilisateur(), 
            request.getIdEdition(), 
            request.getIdLivre(),
            request.getStatut()
        );
        return ResponseEntity.ok(possederLivre);
    }

    @DeleteMapping("/gerer-possession/{idPossession}")
    public ResponseEntity<Void> gererPossessionLivre(@PathVariable Long idPossession) {
        possederLivreService.gererPossessionLivre(idPossession);
        //permet d'être sur que la requête a reussi sans contenu retourner
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remettre/{idPossession}")
    public ResponseEntity<Possederlivre> remettreLivreDansBibliotheque(@PathVariable Long idPossession) {
        return ResponseEntity.ok(possederLivreService.remettreLivreDansBibliotheque(idPossession));
    }


    // Nombre de livres possédés par un utilisateur
    @GetMapping("/count/{idUtilisateur}")
    public int getNombreLivresPossedes(@PathVariable Long idUtilisateur) {
        return possederLivreService.getNombreLivresPossedes(idUtilisateur);
    }
    
    @PutMapping("/modifierStatut/{id}")
    public ResponseEntity<?> modifierStatut(@PathVariable Long id, @RequestParam String statutLecture) {
        try {
            Possederlivre updatedLivre = possederLivreService.modifierStatut(id, statutLecture);
            return ResponseEntity.ok(updatedLivre);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur interne lors de la mise à jour du statut.");
        }
    }
    

    @PutMapping("/{id}/note/{nouvelleNote}")
    public ResponseEntity<Possederlivre> modifierNote(@PathVariable Long id, @PathVariable int nouvelleNote) {
        return ResponseEntity.ok(possederLivreService.modifierNote(id, nouvelleNote));
    }


}

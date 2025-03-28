package com.bibliotheque.bibliotheque.possederlivre;

import java.util.List;

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

@RestController
@RequestMapping("/possederLivre")
public class PossederlivreController {
	@Autowired
    private PossederlivreService possederLivreService;
    
    //récupère la liste des livres possédés par un utilisateur
    @GetMapping("/posseder/{idUtilisateur}")
    public ResponseEntity<List<Possederlivre>> getLivresPossedes(@PathVariable Long idUtilisateur) {
        List<Possederlivre> livresPossedes = possederLivreService.getLivresPossedes(idUtilisateur);
        //si aucun livre possédé, on renvoie une réponse sans contenu
        if (livresPossedes.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        //sinon on renvoie la liste des livres possédés
        return ResponseEntity.ok(livresPossedes); 
    }

    //récupère tous les livres terminés par un utilisateur
    @GetMapping("/termines/{idUtilisateur}")
    public List<Possederlivre> getLivresTermines(@PathVariable Long idUtilisateur) {
        return possederLivreService.getLivresTermines(idUtilisateur);
    }
    
    //récupère tous les livres pas encore lu d'un utilisateur
    @GetMapping("/pasLu/{idUtilisateur}")
    public List<Possederlivre> getLivrePasEncoreLu(@PathVariable Long idUtilisateur){
    	return possederLivreService.getLivresPasEncoreLu(idUtilisateur);
    }
    
    //récupère tous les livres en cours par un utilisateur
    @GetMapping("/enCours/{idUtilisateur}")
    public List<Possederlivre> getLivresEnCours(@PathVariable Long idUtilisateur) {
    	return possederLivreService.getLivresEnCoursByUtilisateur(idUtilisateur);
    }
    
    //ajoute un livre à la possession d'un utilisateur
    @PostMapping("/ajouter")
    public ResponseEntity<Possederlivre> ajouterLivre(@RequestBody PossederLivreRequest request) {
        Possederlivre possederLivre = possederLivreService.ajouterLivreALaBibliotheque(
            request.getIdUtilisateur(), 
            request.getIdEdition(), 
            request.getIdLivre(),
            request.getStatut()
        );
        return ResponseEntity.ok(possederLivre);
    }

    //supprime (ou modifie seulement) la possession d'un utilisateur
    @DeleteMapping("/gerer-possession/{idPossession}")
    public ResponseEntity<Void> gererPossessionLivre(@PathVariable Long idPossession) {
        possederLivreService.gererPossessionLivre(idPossession);
        return ResponseEntity.noContent().build();
    }
    
    //remet un livre dans la bibliothèque
    @PostMapping("/remettre/{idPossession}")
    public ResponseEntity<Possederlivre> remettreLivreDansBibliotheque(@PathVariable Long idPossession) {
        return ResponseEntity.ok(possederLivreService.remettreLivreDansBibliotheque(idPossession));
    }

    // récupère le nombre de livres possédés par un utilisateur
    @GetMapping("/count/{idUtilisateur}")
    public int getNombreLivresPossedes(@PathVariable Long idUtilisateur) {
        return possederLivreService.getNombreLivresPossedes(idUtilisateur);
    }
    
    //modifie le statut de lecture d'un livre
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
    
    //modifie la note d'un livre
    @PutMapping("/{id}/note/{nouvelleNote}")
    public ResponseEntity<Possederlivre> modifierNote(@PathVariable Long id, @PathVariable int nouvelleNote) {
        return ResponseEntity.ok(possederLivreService.modifierNote(id, nouvelleNote));
    }

    //modifie la progression d'un livre
    @PutMapping("/{id}/progression/{nouvelleProgression}")
    public ResponseEntity<Possederlivre> modifierProgression(@PathVariable Long id, @PathVariable int nouvelleProgression) {
        return ResponseEntity.ok(possederLivreService.modifierProgression(id, nouvelleProgression));
    }
}

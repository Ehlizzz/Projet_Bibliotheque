package com.bibliotheque.bibliotheque.utilisateur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utilisateur")

public class UtilisateurController {
	
	@Autowired
    private UtilisateurService utilisateurService;	
	
	//récupère l'utilisateur via son identifiant
	@GetMapping("/{id}")
	public ResponseEntity<?> getUtilisateurById(@PathVariable Long id) {
	    try {
	        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
	        return ResponseEntity.ok(utilisateur);
	    } catch (UtilisateurException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	//inscrit l'utilisateur
	@PostMapping("/inscription")
	public ResponseEntity inscription(@RequestBody Utilisateur utilisateur) {
		try {
			return ResponseEntity.ok(utilisateurService.inscription(utilisateur.getPseudo(), utilisateur.getEmail(), utilisateur.getMotDePasse()));
		}catch (UtilisateurException e) {
			return ResponseEntity.badRequest().body(e);
		}
	}

	//connecte un utilisateur
    @PostMapping("/connexion")
    public ResponseEntity connexion(@RequestBody Utilisateur utilisateur) {
        try {
			return ResponseEntity.ok(utilisateurService.connexion(utilisateur.getEmail(), utilisateur.getMotDePasse()));
		} catch (UtilisateurException e) {
			return ResponseEntity.badRequest().body(e);
		}
    }


}

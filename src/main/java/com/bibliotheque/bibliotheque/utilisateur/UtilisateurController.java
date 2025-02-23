package com.bibliotheque.bibliotheque.utilisateur;

//importe @Autowired pour injecter automatiquement de dépendances
import org.springframework.beans.factory.annotation.Autowired;
//importe ResponseEntity pour retourner une réponse personnalisée
import org.springframework.http.ResponseEntity;
//importe les annotations pour définir un controleur
import org.springframework.web.bind.annotation.*;

//indique que la classe est un controleur
@RestController

//définit le point d'accès pour ce controleur
@RequestMapping("/utilisateur")

//Autorise React à faire des requêtes
@CrossOrigin(origins = "http://localhost:3000")


public class UtilisateurController {
	
	//injecte automatiquement une instance de UtilisateurService
	@Autowired
    private UtilisateurService utilisateurService;	

	// Associe cette méthode aux requêtes POST sur le chemin /utilisateur
	@PostMapping("/utilisateur")
	//methode qui prend un utilisateur dans le corps de la requête
	public ResponseEntity<String> ajouterUtilisateur(@RequestBody Utilisateur utilisateur) {
	    //retourne une réponse HTTP ok avec un message de succès
		return ResponseEntity.ok("Utilisateur ajouté !");
	}
	
	// Associe cette méthode aux requêtes GET sur /utilisateur/{id}
	@GetMapping("/{id}")
	public ResponseEntity<?> getUtilisateurById(@PathVariable Long id) {
	    try {
	        Utilisateur utilisateur = utilisateurService.getUtilisateurById(id);
	        return ResponseEntity.ok(utilisateur);
	    } catch (UtilisateurException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	// Associe cette méthode aux requêtes POST sur le chemin /inscription
	@PostMapping("/inscription")
	//methode qui prend un utilisateur dans le corps de la requête
	public ResponseEntity inscription(@RequestBody Utilisateur utilisateur) {
		//retourne les information de l'utilisateur via la méthodes d'inscription du service
		try {
			return ResponseEntity.ok(utilisateurService.inscription(utilisateur.getPseudo(), utilisateur.getEmail(), utilisateur.getMotDePasse()));
		}catch (UtilisateurException e) {
			return ResponseEntity.badRequest().body(e);
		}
	}

	// Associe cette méthode aux requêtes POST sur le chemin /connexion
    @PostMapping("/connexion")
	//methode qui prend un utilisateur dans le corps de la requête
    public ResponseEntity connexion(@RequestBody Utilisateur utilisateur) {
		//retourne les information de l'utilisateur via la méthodes de connexion du service
        try {
			return ResponseEntity.ok(utilisateurService.connexion(utilisateur.getEmail(), utilisateur.getMotDePasse()));
		} catch (UtilisateurException e) {
			return ResponseEntity.badRequest().body(e);
		}
    }


}

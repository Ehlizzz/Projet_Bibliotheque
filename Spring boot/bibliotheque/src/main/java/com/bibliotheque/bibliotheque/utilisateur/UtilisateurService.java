package com.bibliotheque.bibliotheque.utilisateur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UtilisateurService {
	// Injecte du repository pour interagir avec la base de données
	@Autowired
    private UtilisateurRepository utilisateurRepository;
	
	// Inscription d'un utilisateur
    public Utilisateur inscription(String pseudo, String email, String motDePasse)throws UtilisateurException {
    	//vérifie si un autre utilisateur à le même mail
        if (utilisateurRepository.findByEmail(email).isPresent()) {
        	//retourne un message d'erreur car il est déjà pris
        	throw new UtilisateurException("Email déjà utilisé");
        }
        if (utilisateurRepository.findByPseudo(pseudo).isPresent()) {
        	//retourne un message d'erreur car il est déjà pris
        	throw new UtilisateurException("Pseudo déjà utilisé par un autre utilisateur");
        }
        //sinon, créer un nouvel utilisateur
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setPseudo(pseudo);
        utilisateur.setEmail(email);
        utilisateur.setMotDePasse(hasherMotDePasse(motDePasse)); // Hachage du mot de passe

        //sauvegarder le nouvel utilisateur en base de données
        return utilisateurRepository.save(utilisateur);
    }
    
    public Utilisateur getUtilisateurById(Long id) throws UtilisateurException {
        return utilisateurRepository.findById(id)
            .orElseThrow(() -> new UtilisateurException("Utilisateur non trouvé"));
    }

    // Connexion d'un utilisateur
    public Utilisateur connexion(String email, String motDePasse) throws UtilisateurException  {
    	//rechercher l'utilisateur dans la base de données via les mails
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);
        //vérifie si l'email de l'utilisateur existe
        if (utilisateur.isEmpty()) {
        	//retourne un message d'erreur
            throw new UtilisateurException("Utilisateur inconnu");
        }
        //sinon stocke le mot de passe hashé et entré par l'utilisateur  
        String motDePasseHache = hasherMotDePasse(motDePasse);
        //vérifie si le mot de passe hashé est le même que celui de la base de donnée
        if (!motDePasseHache.equals(utilisateur.get().getMotDePasse())) {
        	//retourne un message d'erreur
            throw new UtilisateurException("Mot de passe incorrect.");
        }
        //retourne un message de réussite
        return utilisateur.get();
    }

    // Méthode pour hacher un mot de passe en SHA-256
    private String hasherMotDePasse(String motDePasse) {
        try {
        	//création d'une instance de MessageDigest pour utiliser SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            //Convertit le mot de passe en tableau de octets et applique le hachage
            byte[] hash = digest.digest(motDePasse.getBytes());
            //Convertit le tableau d'octets en une chaîne hexadécimale
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
            	//Formate chaque octet en hexadécimal
                hexString.append(String.format("%02x", b));
            }
            //retourne le mot de passe haché sous forme de chaine d'hexadécimale
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
        	//excepetion levé en cas d'erreur
            throw new RuntimeException("Erreur lors du hachage du mot de passe", e);
        }
    }
}

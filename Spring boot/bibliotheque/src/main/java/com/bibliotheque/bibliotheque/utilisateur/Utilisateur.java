package com.bibliotheque.bibliotheque.utilisateur;

import jakarta.persistence.Entity;
//importe column pour définir le nom de l'attribut de la table
import jakarta.persistence.Column;
//importe l'id pour indiqué la clé primaire
import jakarta.persistence.Id;
//permet de générer automatiquement de l'id
import jakarta.persistence.GeneratedValue;
//définit le type de génération de l'id
import jakarta.persistence.GenerationType;

@Entity
public class Utilisateur {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idutilisateur")
    private Long idUtilisateur;
    
	@Column(name = "pseudo")
    private String pseudo;
	
	@Column(name = "email")
    private String email;
	
	@Column(name = "motdepasse")
    private String motDePasse; 

	// Constructeurs
    public Utilisateur() {
    }

    public Utilisateur(Long idUtilisateur, String pseudo, String email, String motDePasse) {
    	this.idUtilisateur = idUtilisateur;
        this.pseudo = pseudo;
        this.email = email;
        this.motDePasse = motDePasse;
    }

 //getter et setter
    
    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

//setter inutile pour idutilisateur 
    
    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

}

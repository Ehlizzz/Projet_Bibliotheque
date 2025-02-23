package com.bibliotheque.bibliotheque.utilisateur;

//importe entity
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
	//définit l'attribut comme clé primaire de l'entity
	@Id
	
	//spécifie que la clé primaire est généré automatiquement
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
	//indique le nom de l'id de l'utilisateur dans la base de données
	@Column(name = "idutilisateur")
    private Long idUtilisateur;//identifiant de l'utilisateur
    
	//indique le nom du pseudo dans la base de données
	@Column(name = "pseudo")
    private String pseudo;//pseudo en chaine de caractères
	
	//indique le nom de l'email dans la base de données
	@Column(name = "email")
    private String email;//email en chaine de caractères
	
	//indique le nom du mot de passe dans la base de données
	@Column(name = "motdepasse")
    private String motDePasse; //mot de passe en chaine de caractères

	// Constructeur sans paramètres nécessaire pour JPA
    public Utilisateur() {
    }

 // Constructeur avec paramètres pour initialiser un nouvel utilisateur
    public Utilisateur(Long idUtilisateur, String pseudo, String email, String motDePasse) {
        //initialise les attributs avec les valeurs passées en paramètre
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

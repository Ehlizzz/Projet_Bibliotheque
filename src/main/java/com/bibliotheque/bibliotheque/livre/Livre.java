package com.bibliotheque.bibliotheque.livre;

//importe entity
import jakarta.persistence.Entity;

import java.util.HashSet;
import java.util.Set;

import com.bibliotheque.bibliotheque.auteur.Auteur;
import com.bibliotheque.bibliotheque.edition.Edition;
import com.bibliotheque.bibliotheque.formeLitteraire.FormeLitteraire;
import com.bibliotheque.bibliotheque.genre.Genre;

//importe column pour définir le nom de l'attribut de la table
import jakarta.persistence.*;
//importe l'id pour indiqué la clé primaire
import jakarta.persistence.Id;
//permet de générer automatiquement de l'id
import jakarta.persistence.GeneratedValue;
//définit le type de génération de l'id
import jakarta.persistence.GenerationType;

//indique que la classe est une entity
@Entity
public class Livre {
	//définit l'attribut comme clé primaire de l'entity
	@Id 	
	//spécifie que la clé primaire est généré automatiquement 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	//indique le nom de l'id du livre dans la base de données
	@Column(name = "idlivre")
    private Long idlivre; //identifiant du livre
	
	//indique le nom du titre dans la base de données
	@Column(name = "titre")
    private String titre; //titre du livre
	


	@ManyToOne
    @JoinColumn(name = "idforme")
    private FormeLitteraire formeLitteraire;

    @ManyToMany
    @JoinTable(
        name = "appartenirgenre",
        joinColumns = @JoinColumn(name = "idlivre"),
        inverseJoinColumns = @JoinColumn(name = "idgenre")
    )
    private Set<Genre> genres = new HashSet<>();

	@ManyToMany(mappedBy = "livres")
	 // Empêche la sérialisation infinie
	private Set<Auteur> auteurs = new HashSet<>();

    @OneToMany(mappedBy = "livre")
    private Set<Edition> editions = new HashSet<>();
	
	
	//constructeur vide requis pour la création d'instance
    public Livre() {
    }

    //constructeur permettant d'initialiser un livre
    public Livre(Long idLivre, String titre, FormeLitteraire formeLitteraire) {
        this.idlivre = idLivre;
        this.titre = titre;
        this.formeLitteraire = formeLitteraire;
    }

//getter et setter pour chaque attribut 
    public Long getIdLivre() {
        return idlivre;
    }

//pas de setter pour l'id car inutile
    
    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }
    
    public Set<Auteur> getAuteurs() {
        return auteurs;
    }

    public void setAuteurs(Set<Auteur> auteurs) {
        this.auteurs = auteurs;
    }
    
    public FormeLitteraire getFormeLitteraire() {
        return formeLitteraire;
    }

    public void setFormeLitteraire(FormeLitteraire formeLitteraire) {
        this.formeLitteraire = formeLitteraire;
    }
    
    public Set<Edition> getEditions() {
        return editions;
    }

    public void setEditions(Set<Edition> editions) {
        this.editions = editions;
    }
}

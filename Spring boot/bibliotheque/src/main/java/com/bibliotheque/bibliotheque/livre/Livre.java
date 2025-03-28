package com.bibliotheque.bibliotheque.livre;

import java.util.HashSet;
import java.util.Set;

import com.bibliotheque.bibliotheque.auteur.Auteur;
import com.bibliotheque.bibliotheque.edition.Edition;
import com.bibliotheque.bibliotheque.formeLitteraire.FormeLitteraire;
import com.bibliotheque.bibliotheque.genre.Genre;

import jakarta.persistence.*;

@Entity
public class Livre {
	@Id 	
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idlivre")
    private Long idlivre;
	
	@Column(name = "titre")
    private String titre; 
	
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
	private Set<Auteur> auteurs = new HashSet<>();

    @OneToMany(mappedBy = "livre")
    private Set<Edition> editions = new HashSet<>();
	
	
	//constructeur
    public Livre() {
    }

    //Getters et Setters
    public Long getIdLivre() {
        return idlivre;
    }
    
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

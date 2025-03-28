package com.bibliotheque.bibliotheque.auteur;
import com.bibliotheque.bibliotheque.livre.Livre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Set;
import java.util.Date;
import java.util.HashSet;

@Entity
public class Auteur {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idauteur")
	private Long idAuteur;

	@Column(name = "nomauteur")
    private String nomAuteur;
	
	@Column(name = "prenomauteur")
    private String prenomAuteur;
	
	@Column(name = "datenaiss")
    private Date dateNaiss;
	
	@Column(name = "datemort")
    private Date dateMort;

    @ManyToMany
    @JoinTable(
        name = "ecrireauteur",
        joinColumns = @JoinColumn(name = "idauteur"),
        inverseJoinColumns = @JoinColumn(name = "idlivre")
    )
    @JsonIgnore
    private Set<Livre> livres = new HashSet<>();
    
    //Constructeur
    public Auteur() {   	
    }

    //Getters et Setters
    public Long getIdAuteur() {
        return idAuteur;
    }

    public void setIdAuteur(Long idAuteur) {
        this.idAuteur = idAuteur;
    }

    public String getNomAuteur() {
        return nomAuteur;
    }

    public void setNomAuteur(String nomAuteur) {
        this.nomAuteur = nomAuteur;
    }

    public String getPrenomAuteur() {
        return prenomAuteur;
    }

    public void setPrenomAuteur(String prenomAuteur) {
        this.prenomAuteur = prenomAuteur;
    }

    public Date getDateNaiss() {
        return dateNaiss;
    }

    public void setDateNaiss(Date dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public Date getDateMort() {
        return dateMort;
    }

    public void setDatemort(Date dateMort) {
        this.dateMort = dateMort;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public void setLivres(Set<Livre> livres) {
        this.livres = livres;
    }
}

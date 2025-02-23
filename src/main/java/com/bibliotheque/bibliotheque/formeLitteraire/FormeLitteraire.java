package com.bibliotheque.bibliotheque.formeLitteraire;

import java.util.HashSet;
import java.util.Set;

import com.bibliotheque.bibliotheque.livre.Livre;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "formelitteraire")
public class FormeLitteraire {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "idforme")
	    private Long idForme;

	    @Column(name = "nomforme")
	    private String nomForme;

	    @OneToMany(mappedBy = "formeLitteraire")
	    @JsonIgnore // Empêche la sérialisation infinie entre FormeLitteraire et Livre
	    private Set<Livre> livres = new HashSet<>();

	    // Constructeur par défaut
	    public FormeLitteraire() {}

	    // Constructeur avec paramètres
	    public FormeLitteraire(Long idForme, String nomForme) {
	        this.idForme = idForme;
	        this.nomForme = nomForme;
	    }

	    // Getters et Setters
	    public Long getIdForme() {
	        return idForme;
	    }

	    public String getNomForme() {
	        return nomForme;
	    }

	    public void setNomForme(String nomForme) {
	        this.nomForme = nomForme;
	    }

	    public Set<Livre> getLivres() {
	        return livres;
	    }

	    public void setLivres(Set<Livre> livres) {
	        this.livres = livres;
	    }
}

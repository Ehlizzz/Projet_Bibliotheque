package com.bibliotheque.bibliotheque.genre;

import java.util.HashSet;
import java.util.Set;

import com.bibliotheque.bibliotheque.livre.Livre;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Genre {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="idgenre")
    private Long idgenre;

    @Column(name = "nomgenre")
    private String nomGenre;

    @ManyToMany(mappedBy = "genres")
    @JsonIgnore // Empêche la sérialisation infinie
    private Set<Livre> livres = new HashSet<>();

    // Constructeurs, Getters et Setters
    public Genre() {}

    public Genre(String nomGenre) {
        this.nomGenre = nomGenre;
    }

    public Long getIdGenre() {
        return idgenre;
    }


    public String getNomGenre() {
        return nomGenre;
    }

    public void setNomGenre(String nomgenre) {
        this.nomGenre = nomgenre;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public void setLivres(Set<Livre> livres) {
        this.livres = livres;
    }
}

package com.bibliotheque.bibliotheque.format;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Format {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idformat")
    private Long idFormat; // Clé primaire

    @Column(name = "nomformat")
    private String nomFormat; // Nom du format (ex: Broché, Ebook, etc.)

    // Constructeurs
    public Format() {
    }

    public Format(String nomFormat) {
        this.nomFormat = nomFormat;
    }

    // Getters et Setters
    public Long getIdFormat() {
        return idFormat;
    }

    public void setIdFormat(Long idFormat) {
        this.idFormat = idFormat;
    }

    public String getNomFormat() {
        return nomFormat;
    }

    public void setNomFormat(String nomFormat) {
        this.nomFormat = nomFormat;
    }
}

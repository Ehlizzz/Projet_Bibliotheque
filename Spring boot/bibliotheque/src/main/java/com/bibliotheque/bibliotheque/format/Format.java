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
    private Long idFormat; 

    @Column(name = "nomformat")
    private String nomFormat;

    // Constructeur
    public Format() {
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

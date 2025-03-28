package com.bibliotheque.bibliotheque.edition;
import com.bibliotheque.bibliotheque.format.Format;
import com.bibliotheque.bibliotheque.livre.Livre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Edition {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idedition")
    private Long idEdition;

    @ManyToOne
    @JoinColumn(name = "idlivre")
    @JsonIgnore
    private Livre livre;

    @Column(name = "editeur")
    private String editeur;

    @Column(name = "datepublication")
    private String datePublication;

    @ManyToOne
    @JoinColumn(name = "idformat")
    private Format format;


    @Column(name = "nbpages")
    private int nbPages;

    // Constructeur
    public Edition() {
    }

    // Getters et Setters
    public Long getIdEdition() {
        return idEdition;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public String getEditeur() {
        return editeur;
    }

    public void setEditeur(String editeur) {
        this.editeur = editeur;
    }

    public String getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(String datePublication) {
        this.datePublication = datePublication;
    }

    public Format getFormat() {
        return format;
    }

    public void setFormat(Format format) {
        this.format = format;
    }

    public Integer getNbPages() {
        return nbPages;
    }

    public void setNbPages(Integer nbPages) {
        this.nbPages = nbPages;
    }
}

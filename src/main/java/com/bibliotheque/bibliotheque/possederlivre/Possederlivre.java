package com.bibliotheque.bibliotheque.possederlivre;

import java.time.LocalDate;
import java.util.Date;

import com.bibliotheque.bibliotheque.edition.Edition;
import com.bibliotheque.bibliotheque.livre.Livre;
import com.bibliotheque.bibliotheque.utilisateur.Utilisateur;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "possederlivre")
public class Possederlivre {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpossession")
    private Long idPossession;

    @ManyToOne
    @JoinColumn(name = "idutilisateur")
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "idedition")
    private Edition edition;

    @ManyToOne
    @JoinColumn(name = "idlivre")
    private Livre livre;

    @Column(name = "statutlecture")
    private String statutLecture = "pas encore lu";

    
    private Boolean possede;

    @Temporal(TemporalType.DATE)
    @Column(name="datepossession")
    private LocalDate datePossession;
    
    @Column(name = "note")
    private Integer note = null; // Initialisé à null



    // Constructeurs
    public Possederlivre(){
    	
    }

    public Possederlivre(Utilisateur utilisateur, Edition edition, Livre livre, String statutLecture, boolean possede, LocalDate datePossession) {
        this.utilisateur = utilisateur;
        this.edition = edition;
        this.livre = livre;
        this.statutLecture = statutLecture;
        this.possede = possede;
        this.datePossession = datePossession;
    }

    // Getters et Setters
    public Long getIdPossession() { 
    	return idPossession; 
    }
    public void setIdPossession(Long idPossession) { 
    	this.idPossession = idPossession; 
    }

    public Utilisateur getUtilisateur() { 
    	return utilisateur; 
    }
    public void setUtilisateur(Utilisateur utilisateur) { 
    	this.utilisateur = utilisateur; 
    }

    public Edition getEdition() { 
    	return edition; 
    }
    public void setEdition(Edition edition) { 
    	this.edition = edition; 
    }

    public Livre getLivre() { 
    	return livre; 
    }
    public void setLivre(Livre livre) { 
    	this.livre = livre; 
    }

    public String getStatutLecture() { 
    	return statutLecture; 
    }
    // Vérification manuelle du statut pour éviter des valeurs incorrectes
    public void setStatutLecture(String statutLecture) {
        if (!statutLecture.equals("en cours") && !statutLecture.equals("pas encore lu") && !statutLecture.equals("terminé")) {
            throw new IllegalArgumentException("Statut non valide : " + statutLecture);
        }
        this.statutLecture = statutLecture;
        // Si le statut n'est plus "terminé", on remet la note à null
        if (!"terminé".equals(statutLecture)) {
            this.note = null;
        }
    }

    public boolean getPossede() { 
    	return possede; 
    }
    public void setPossede(boolean possede) { 
    	this.possede = possede; 
    }

    public LocalDate getDatePossession() { 
    	return datePossession; 
    }
    public void setDatePossession(LocalDate localDate) { 
    	this.datePossession = localDate;
    }
    
    public void setNote(Integer note) {
        this.note = note;
    }
    
    public Integer getNote() { 
        return note; 
    }
}

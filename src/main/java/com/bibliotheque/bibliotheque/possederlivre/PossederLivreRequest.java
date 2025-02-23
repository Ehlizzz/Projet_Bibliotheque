package com.bibliotheque.bibliotheque.possederlivre;

//DTO pour séparer les préoccupations de la logique métier
public class PossederLivreRequest {
	private Long idUtilisateur;
    private Long idEdition;
    private String statut;
    private Long idLivre;

    // Getters and setters
    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public Long getIdEdition() {
        return idEdition;
    }

    public void setIdEdition(Long idEdition) {
        this.idEdition = idEdition;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
    public Long getIdLivre() {
        return idLivre;
    }

    public void setIdLivre(Long idLivre) {
        this.idLivre = idLivre;
    }
}

package com.bibliotheque.bibliotheque.possederlivre;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bibliotheque.bibliotheque.edition.Edition;
import com.bibliotheque.bibliotheque.edition.EditionRepository;
import com.bibliotheque.bibliotheque.livre.Livre;
import com.bibliotheque.bibliotheque.livre.LivreRepository;
import com.bibliotheque.bibliotheque.utilisateur.Utilisateur;
import com.bibliotheque.bibliotheque.utilisateur.UtilisateurRepository;

@Service
public class PossederlivreService {
	
	@Autowired
    private PossederlivreRepository possederlivreRepository;
	@Autowired
    private UtilisateurRepository utilisateurRepository;
	@Autowired
	private EditionRepository editionRepository; 
	@Autowired
	private LivreRepository livreRepository;
    
    @Transactional
    public Possederlivre ajouterLivreALaBibliotheque(Long idUtilisateur, Long idEdition,Long idLivre,String statutLecture) {
        // Récupère l'utilisateur en fonction de son ID
        Utilisateur utilisateur = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Edition edition = editionRepository.findById(idEdition)
                .orElseThrow(() -> new RuntimeException("Édition non trouvée"));
        Livre livre = livreRepository.findById(idLivre)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));
        if (possederlivreRepository.existsByUtilisateurAndEdition(utilisateur, edition)) {
            throw new RuntimeException("Ce livre est déjà dans votre bibliothèque !");
        }
        

        Possederlivre possederLivre = new Possederlivre();
        possederLivre.setUtilisateur(utilisateur);
        possederLivre.setEdition(edition);
        possederLivre.setLivre(livre);
        possederLivre.setStatutLecture(statutLecture);
        possederLivre.setPossede(true);
        possederLivre.setDatePossession(LocalDate.now());

        return possederlivreRepository.save(possederLivre);
    }
    
    @Transactional
    public void gererPossessionLivre(Long idPossession) {
        Possederlivre possederLivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        String statut = possederLivre.getStatutLecture();

        if ("pas encore lu".equalsIgnoreCase(statut) || "en cours".equalsIgnoreCase(statut)) {
            possederlivreRepository.delete(possederLivre);
        } else if ("terminé".equalsIgnoreCase(statut)) {
            possederLivre.setPossede(false);
            possederlivreRepository.save(possederLivre);
        } else {
            throw new RuntimeException("Statut inconnu, impossible de modifier la possession.");
        }
    }

    @Transactional
    public Possederlivre remettreLivreDansBibliotheque(Long idPossession) {
        Possederlivre possederLivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        if ("terminé".equalsIgnoreCase(possederLivre.getStatutLecture()) && !possederLivre.getPossede()) {
            possederLivre.setPossede(true);
            possederLivre.setDatePossession(LocalDate.now());
            return possederlivreRepository.save(possederLivre);
        } else {
            throw new RuntimeException("Ce livre ne peut pas être remis dans la bibliothèque.");
        }
    }
    
    public int getNombreLivresPossedes(Long idUtilisateur) {
        return possederlivreRepository.countLivresPossedes(idUtilisateur);
    }
    
    public List<Possederlivre> getLivresPossedes(Long idUtilisateur) {
        return possederlivreRepository.findLivresPossedesByUtilisateur(idUtilisateur);
    }
    
    public List<Possederlivre> getLivresTermines(Long idUtilisateur) {
        return possederlivreRepository.findLivresTerminesByUtilisateur(idUtilisateur);
    }
    
    public List<Possederlivre> getLivresPasEncoreLu(Long idUtilisateur){
    	return possederlivreRepository.findLivresPasEncoreLuByUtilisateur(idUtilisateur);
    }
    
    public Possederlivre modifierStatut(Long id, String nouveauStatut) {
        Optional<Possederlivre> possederLivreOpt = possederlivreRepository.findById(id);

        if (possederLivreOpt.isPresent()) {
            Possederlivre possederLivre = possederLivreOpt.get();

            if (possederLivre.getStatutLecture().equals(nouveauStatut)) {
                throw new IllegalArgumentException("C'est déjà votre statut de lecture !");
            }

            possederLivre.setStatutLecture(nouveauStatut);
            return possederlivreRepository.save(possederLivre); // Met à jour automatiquement
        } else {
            throw new RuntimeException("Livre non trouvé.");
        }
    }
    

    @Transactional
    public Possederlivre modifierNote(Long idPossession, int nouvelleNote) {
        Possederlivre possederlivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new IllegalArgumentException("Possession introuvable"));

        if (nouvelleNote < 0 || nouvelleNote > 20) {
            throw new IllegalArgumentException("La note doit être entre 0 et 20.");
        }

        possederlivre.setNote(nouvelleNote);
        return possederlivreRepository.save(possederlivre);
    }


}

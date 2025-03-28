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
	//injection des dépendances 
	@Autowired
    private PossederlivreRepository possederlivreRepository;
	@Autowired
    private UtilisateurRepository utilisateurRepository;
	@Autowired
	private EditionRepository editionRepository; 
	@Autowired
	private LivreRepository livreRepository;
    
	//ajoute l'édition d'un livre à la bibliothèque d'un utilisateur
    @Transactional
    public Possederlivre ajouterLivreALaBibliotheque(Long idUtilisateur, Long idEdition,Long idLivre,String statutLecture) {
        // récupère l'utilisateur
        Utilisateur utilisateur = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        //récupère l'édition
        Edition edition = editionRepository.findById(idEdition)
                .orElseThrow(() -> new RuntimeException("Édition non trouvée"));
        //récupère le livre
        Livre livre = livreRepository.findById(idLivre)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));
        //vérifier si le livre est déjà dans la bibliothèque
        if (possederlivreRepository.existsByUtilisateurAndEdition(utilisateur, edition)) {
            throw new RuntimeException("Ce livre est déjà dans votre bibliothèque !");
        }
        //création d'une nouvelle possession de livre
        Possederlivre possederLivre = new Possederlivre(utilisateur, edition, livre, statutLecture, LocalDate.now());
        //si le statut est "terminé", mettre la progression au nombre de pages total
        if ("terminé".equals(statutLecture)) {
            int totalPages = edition.getNbPages();
            possederLivre.setProgression(totalPages); 
        }
        //sauvegarde la possession dans la base de données
        return possederlivreRepository.save(possederLivre);
    }
    
    //gère la possession d'un livre
    @Transactional
    public void gererPossessionLivre(Long idPossession) {
    	//récupère la possession
        Possederlivre possederLivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));
        //stocke le getter du statut lecture
        String statut = possederLivre.getStatutLecture();
        //si le livre est "pas encore lu" ou "en cours" on le supprime
        if ("pas encore lu".equalsIgnoreCase(statut) || "en cours".equalsIgnoreCase(statut)) {
            possederlivreRepository.delete(possederLivre);
        //si le livre est "terminé" on modifie juste l'état possede à false
        } else if ("terminé".equalsIgnoreCase(statut)) {
            possederLivre.setPossede(false);
            possederlivreRepository.save(possederLivre);
        //sinon on affiche une erreur de statut
        } else {
            throw new RuntimeException("Statut inconnu, impossible de modifier la possession.");
        }
    }

    //remettre un livre dans la bibliothèque
    @Transactional
    public Possederlivre remettreLivreDansBibliotheque(Long idPossession) {
        //récupère la possession
    	Possederlivre possederLivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));
    	//vérifie si le livre peut être remis dans la bibliothèque
        if ("terminé".equalsIgnoreCase(possederLivre.getStatutLecture()) && !possederLivre.getPossede()) {
            possederLivre.setPossede(true);
            possederLivre.setDatePossession(LocalDate.now());
            return possederlivreRepository.save(possederLivre);
        //sinon renvoie une erreur
        } else {
            throw new RuntimeException("Ce livre ne peut pas être remis dans la bibliothèque.");
        }
    }
    
    //retourne le nombre de livres possédés par un utilisateur
    public int getNombreLivresPossedes(Long idUtilisateur) {
        return possederlivreRepository.countLivresPossedes(idUtilisateur);
    }
    
    //retourne la liste des livres possédés par un utilisateur
    public List<Possederlivre> getLivresPossedes(Long idUtilisateur) {
        return possederlivreRepository.findLivresPossedesByUtilisateur(idUtilisateur);
    }
    
    //retourne la liste des livres terminés par un utilisateur
    public List<Possederlivre> getLivresTermines(Long idUtilisateur) {
        return possederlivreRepository.findLivresTerminesByUtilisateur(idUtilisateur);
    }
    
    //retourne la liste des livres pas encore lu par un utilisateur
    public List<Possederlivre> getLivresPasEncoreLu(Long idUtilisateur){
    	return possederlivreRepository.findLivresPasEncoreLuByUtilisateur(idUtilisateur);
    }
    
    //retourne la liste des livres en cours par un utilisateur
    public List<Possederlivre> getLivresEnCoursByUtilisateur(Long idUtilisateur) {
        return possederlivreRepository.findLivresEnCoursByUtilisateur(idUtilisateur);
    }
    
    //modifier le statut de lecture d'un livre
    @Transactional
    public Possederlivre modifierStatut(Long id, String nouveauStatut) {
    	//récupère la possession 
        Optional<Possederlivre> possederLivreOpt = possederlivreRepository.findById(id);

        //vérifie si la possession existe dans la base de données
        if (possederLivreOpt.isPresent()) {
        	//récupère possederLivre
            Possederlivre possederLivre = possederLivreOpt.get();

            //vérifie si le statut actuel et le même que le nouveau
            if (possederLivre.getStatutLecture().equals(nouveauStatut)) {
                throw new IllegalArgumentException("C'est déjà votre statut de lecture !");
            }
            //met à jour le statut de lecture
            possederLivre.setStatutLecture(nouveauStatut);
            
            // Si le statut devient "en cours", on remet la progression à 0
            if ("en cours".equalsIgnoreCase(nouveauStatut)) {
                possederLivre.setProgression(0);
            }
            //si le statut est terminé, on met la progression aux nombres de pages total
            if ("terminé".equalsIgnoreCase(nouveauStatut)) {
                int totalPages = possederLivre.getEdition().getNbPages();
                possederLivre.setProgression(totalPages);
            }
            //met à jour la possession dans la base de données
            return possederlivreRepository.save(possederLivre); 
        } else {
            throw new RuntimeException("Livre non trouvé.");
        }
    }

    //modifier la note d'un livre terminé
    @Transactional
    public Possederlivre modifierNote(Long idPossession, int nouvelleNote) {
    	//récupère la possession
        Possederlivre possederlivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new IllegalArgumentException("Possession introuvable"));
        //vérifie si la nouvelle note est entre 0 et 20
        if (nouvelleNote < 0 || nouvelleNote > 20) {
            throw new IllegalArgumentException("La note doit être entre 0 et 20.");
        }
        //sauvegarde la possession dans la base de données
        possederlivre.setNote(nouvelleNote);
        return possederlivreRepository.save(possederlivre);
    }

    //modifier la progression de lecture d'un livre
    @Transactional
    public Possederlivre modifierProgression(Long idPossession, int pagesLues) {
        //récupère la possession 
        Possederlivre possederlivre = possederlivreRepository.findById(idPossession)
                .orElseThrow(() -> new IllegalArgumentException("Possession introuvable"));
        if (possederlivre != null) {
            //récupère le nombre total de pages du livre
            int totalPages = possederlivre.getEdition().getNbPages();

            //mettre à jour la progression avec le nombre de pages lues
            possederlivre.setProgression(pagesLues);
            // vérifie si le nombre de pages lues vaut le nombre total
            if (pagesLues == totalPages) {
                possederlivre.setStatutLecture("terminé");
            }
            // Sauvegarder les changements dans la base de données
            possederlivreRepository.save(possederlivre);
        }
        return possederlivre;
    }

}

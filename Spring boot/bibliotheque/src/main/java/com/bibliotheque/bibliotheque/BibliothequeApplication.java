package com.bibliotheque.bibliotheque;

//import com.bibliotheque.bibliotheque.livre.Livre;
//import com.bibliotheque.bibliotheque.livre.LivreRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BibliothequeApplication {

	//@Autowired
    //private LivreRepository livreRepository; // Injection du repository
	
	public static void main(String[] args) {
		SpringApplication.run(BibliothequeApplication.class, args);
	}
	/*
    // Ce CommandLineRunner va s'exécuter au démarrage de l'application
    @Bean
    public CommandLineRunner run() {
        return args -> {
            // Récupère tous les livres de la base de données
            Iterable<Livre> livres = livreRepository.findAll();

            // Affiche les livres dans la console
            livres.forEach(livre -> System.out.println(livre));
        };
    }*/

}

package com.bibliotheque.bibliotheque.livre;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
	List<Livre> findAll();
	List<Livre> findByTitreContainingIgnoreCase(String titre);
}

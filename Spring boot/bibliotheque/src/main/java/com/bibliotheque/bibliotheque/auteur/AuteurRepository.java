package com.bibliotheque.bibliotheque.auteur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuteurRepository extends JpaRepository<Auteur, Long> {
	List<Auteur> findAll();
}
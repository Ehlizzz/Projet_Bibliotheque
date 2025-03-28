package com.bibliotheque.bibliotheque.formeLitteraire;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormeLitteraireRepository extends JpaRepository<FormeLitteraire, Long> {
    List<FormeLitteraire> findAll();
}
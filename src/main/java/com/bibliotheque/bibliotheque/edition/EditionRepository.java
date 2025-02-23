package com.bibliotheque.bibliotheque.edition;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EditionRepository extends JpaRepository<Edition, Long>{
    List<Edition> findAll();

}

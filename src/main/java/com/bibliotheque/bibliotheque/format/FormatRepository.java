package com.bibliotheque.bibliotheque.format;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface FormatRepository extends JpaRepository<Format, Long>{
    List<Format> findAll();
}

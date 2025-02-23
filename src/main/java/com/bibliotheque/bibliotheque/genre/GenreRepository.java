package com.bibliotheque.bibliotheque.genre;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import com.bibliotheque.bibliotheque.livre.Livre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    List<Genre> findAll();
}

package com.bibliotheque.bibliotheque.genre;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenreService {
	
    @Autowired
    private GenreRepository genreRepository;
    
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

}

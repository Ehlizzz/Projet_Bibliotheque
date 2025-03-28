package com.bibliotheque.bibliotheque.genre;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genres")
public class GenreController {
	@Autowired
    private GenreService genreService;

    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }
    
}

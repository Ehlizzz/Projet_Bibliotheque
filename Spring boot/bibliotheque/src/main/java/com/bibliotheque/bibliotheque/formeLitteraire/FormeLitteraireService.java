package com.bibliotheque.bibliotheque.formeLitteraire;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormeLitteraireService {
	
	@Autowired
	private FormeLitteraireRepository formeRepository;
	
    public List<FormeLitteraire> getAllFormesLitteraires() {
        return formeRepository.findAll();
    }

}

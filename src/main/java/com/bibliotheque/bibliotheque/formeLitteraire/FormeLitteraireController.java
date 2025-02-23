package com.bibliotheque.bibliotheque.formeLitteraire;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/formesLitteraires")
public class FormeLitteraireController {
	@Autowired
	private FormeLitteraireService formeLitteraireService;
	
	@GetMapping
    public List<FormeLitteraire> getAllFormesLitteraires() {
        return formeLitteraireService.getAllFormesLitteraires();
    }


}

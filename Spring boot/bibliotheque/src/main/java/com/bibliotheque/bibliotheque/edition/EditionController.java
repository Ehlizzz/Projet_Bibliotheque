package com.bibliotheque.bibliotheque.edition;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/editions")
public class EditionController {
	@Autowired
    private EditionService editionService;

    @GetMapping
    public List<Edition> getAllEditions() {
        return editionService.getAllEditions();
    }

}

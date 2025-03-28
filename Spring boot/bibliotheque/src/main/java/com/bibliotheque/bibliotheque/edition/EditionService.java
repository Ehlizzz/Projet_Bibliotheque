package com.bibliotheque.bibliotheque.edition;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditionService {
	@Autowired
    private EditionRepository editionRepository;

    public List<Edition> getAllEditions() {
        return editionRepository.findAll();
    }

}

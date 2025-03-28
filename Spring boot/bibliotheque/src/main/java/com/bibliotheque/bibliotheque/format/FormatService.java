package com.bibliotheque.bibliotheque.format;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormatService {
	@Autowired
    private FormatRepository formatRepository;

    public List<Format> getAllFormats() {
        return formatRepository.findAll();
    }

}

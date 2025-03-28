package com.bibliotheque.bibliotheque.format;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/formats")
public class FormatController {
	@Autowired
    private FormatService formatService;

    @GetMapping
    public List<Format> getAllFormats() {
        return formatService.getAllFormats();
    }

}

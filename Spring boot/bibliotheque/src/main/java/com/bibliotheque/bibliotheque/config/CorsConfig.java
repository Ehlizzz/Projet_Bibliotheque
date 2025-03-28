package com.bibliotheque.bibliotheque.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000") // Autoriser les requêtes venant de localhost:3000
        .allowedMethods("GET", "POST", "PUT", "DELETE"); // Autoriser les méthodes que tu utilises
    }
}
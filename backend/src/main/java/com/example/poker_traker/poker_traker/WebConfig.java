package com.example.poker_traker.poker_traker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allows CORS for all endpoints
                .allowedOrigins("http://localhost:3000") // Allow only this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow HTTP methods
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

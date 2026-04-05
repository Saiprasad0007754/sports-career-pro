package com.careerpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SportsCareerApplication — Entry point for the Spring Boot backend.
 *
 * @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
 * It starts the embedded Tomcat server on port 8080.
 */
@SpringBootApplication
public class SportsCareerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SportsCareerApplication.class, args);
        System.out.println("✅ Sports Career Guidance API running → http://localhost:8080/api");
    }
}

package com.careerpro.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DatabaseSeeder {

    @Autowired
    private DataSource dataSource;
    @Autowired
    private com.careerpro.repository.SportRepository sportRepo;

    @EventListener(ApplicationReadyEvent.class)
    public void seedDatabase() {
        if (sportRepo.count() == 0) {
            ResourceDatabasePopulator populator = new ResourceDatabasePopulator(false, false, "UTF-8", new ClassPathResource("data.sql"));
            populator.execute(dataSource);
            System.out.println("VIVA LOG: Database seeded successfully with data.sql!");
        }
    }
}

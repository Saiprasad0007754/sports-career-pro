package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Sport — JPA Entity mapped to the 'sports' table.
 *
 * @Entity  → tells Hibernate this class maps to a DB table
 * @Table   → specifies the exact table name
 * @Data    → Lombok: generates getters, setters, toString, equals, hashCode
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "sports")
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer minAge;
    private Integer maxAge;
    private Double minWeightKg;
    private Double maxWeightKg;

    // One sport → many careers (bidirectional, lazy loaded)
    @OneToMany(mappedBy = "sport", fetch = FetchType.LAZY)
    private List<Career> careers;

    // One sport → many skills
    @OneToMany(mappedBy = "sport", fetch = FetchType.LAZY)
    private List<Skill> skills;

    // One sport → many training paths
    @OneToMany(mappedBy = "sport", fetch = FetchType.LAZY)
    private List<TrainingPath> trainingPaths;

    // One sport → many diet plans
    @OneToMany(mappedBy = "sport", fetch = FetchType.LAZY)
    private List<DietPlan> dietPlans;
}

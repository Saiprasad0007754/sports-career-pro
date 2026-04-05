package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Career — maps to the 'careers' table.
 * Each career belongs to one Sport (many-to-one relationship).
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many careers belong to one sport
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sport_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Sport sport;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String avgSalaryInr;
    private String levelRequired;    // District / State / National / International

    // Scores used by recommendation engine (1–10)
    private Integer passionScore;
    private Integer incomeScore;
    private Integer stabilityScore;
    private Integer fitnessScore;
}

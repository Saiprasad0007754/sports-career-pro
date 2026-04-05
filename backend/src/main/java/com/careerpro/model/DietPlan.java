package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/** DietPlan — diet recommendations per sport and fitness level. */
@Data @NoArgsConstructor
@Entity @Table(name = "diet_plans")
public class DietPlan {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sport_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Sport sport;

    private String fitnessLevel;    // Beginner / Intermediate / Advanced
    private String mealTime;        // Breakfast / Lunch / Dinner / Pre-workout / Post-workout

    @Column(columnDefinition = "TEXT", nullable = false)
    private String recommendation;

    private Integer caloriesApprox;

    @Column(columnDefinition = "TEXT")
    private String notes;
}

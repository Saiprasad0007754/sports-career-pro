package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * UserProfile — stores each submitted user profile.
 * Also holds computed fields: BMI and fitness score.
 *
 * VIVA TIP: This entity is created when the user submits the
 * input form. The recommendation engine uses these fields to
 * score and rank careers.
 */
@Data @NoArgsConstructor
@Entity @Table(name = "user_profiles")
public class UserProfile {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private String sportInterest;   // e.g. "Cricket"

    private String location;        // e.g. "Mumbai"

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Double weightKg;

    private Double heightCm;

    @Column(nullable = false)
    private String fitnessLevel;    // Beginner / Intermediate / Advanced

    @Column(nullable = false)
    private String careerLevel;     // District / State / National / International

    @Column(nullable = false)
    private String priority;        // fitness / income / passion / stability

    private Double bmi;             // computed: weight / (height/100)^2
    private Integer fitnessScore;   // computed: 0–100

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}

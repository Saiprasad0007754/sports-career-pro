package com.careerpro.dto;

import com.careerpro.model.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * GuidanceReport — the complete response object returned to React
 * after processing the user's profile form.
 *
 * VIVA TIP: This is a "response DTO". It bundles all the data
 * the frontend needs to display the result dashboard in one API call.
 */
@Data
@NoArgsConstructor
public class GuidanceReport {

    // --- Echo back user inputs ---
    private Long profileId;
    private String userName;
    private String sportInterest;
    private String location;
    private Integer age;
    private Double weightKg;
    private Double heightCm;
    private String fitnessLevel;
    private String careerLevel;
    private String priority;

    // --- Computed metrics ---
    private Double bmi;
    private String bmiCategory;        // Underweight / Normal / Overweight / Obese
    private Integer fitnessScore;      // 0–100
    private String fitnessRemarks;

    // --- Recommendations ---
    private List<CareerRecommendation> recommendedCareers;
    private List<Skill> requiredSkills;
    private List<TrainingPath> trainingRoadmap;
    private List<TrainingCenter> trainingCenters;
    private List<DietPlan> dietPlan;

    // --- Growth path text ---
    private String growthPath;          // "District → State → National → International"
    private String overallAdvice;
}

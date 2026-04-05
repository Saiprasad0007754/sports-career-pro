package com.careerpro.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * CareerRecommendation — represents a single scored career suggestion.
 * The recommendation engine populates this and sorts by matchScore DESC.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CareerRecommendation {
    private Long careerId;
    private String title;
    private String description;
    private String avgSalaryInr;
    private String levelRequired;
    private int matchScore;        // 0–100, computed by engine
    private String matchReason;    // human-readable explanation
}

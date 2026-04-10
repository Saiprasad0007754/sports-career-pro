package com.careerpro.controller;

import com.careerpro.dto.GuidanceReport;
import com.careerpro.dto.UserProfileRequest;
import com.careerpro.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * GuidanceController — REST API for the profile form and recommendation engine.
 *
 * VIVA TIP:
 *   The flow is:
 *   React Form  →  POST /api/guidance/analyze  →  GuidanceController
 *               →  RecommendationService (logic)
 *               →  SportRepo / CareerRepo / etc. (DB)
 *               →  GuidanceReport (JSON)  →  React Dashboard
 */
@RestController
@RequestMapping("/api/guidance")
@RequiredArgsConstructor
public class GuidanceController {

    private final RecommendationService recommendationService;

    /**
     * POST /api/guidance/analyze
     * Accepts user profile form data and returns a full guidance report.
     *
     * Request body example:
     * {
     *   "name": "Ravi Kumar",
     *   "sportInterest": "Cricket",
     *   "age": 18,
     *   "weightKg": 68.5,
     *   "heightCm": 175.0,
     *   "fitnessLevel": "Intermediate",
     *   "careerLevel": "State",
     *   "priority": "passion"
     * }
     */
    @PostMapping("/analyze")
    public ResponseEntity<GuidanceReport> analyzeProfile(
            @Valid @RequestBody UserProfileRequest request) {
        GuidanceReport report = recommendationService.generateReport(request);
        return ResponseEntity.ok(report);
    }

    /**
     * GET /api/guidance/sports
     * Returns a simple list of supported sports (for populating the dropdown).
     */
    @GetMapping("/sports")
    public ResponseEntity<?> getSupportedSports() {
        return ResponseEntity.ok(
            java.util.List.of(
                "Cricket", "Football", "Athletics", "Badminton",
                "Tennis", "Swimming", "Basketball", "Kabaddi"
            )
        );
    }

    /**
     * GET /api/guidance/report?email={email}
     * Retrieves an existing guidance report for a user by their email.
     */
    @GetMapping("/report")
    public ResponseEntity<GuidanceReport> getReportByEmail(@RequestParam String email) {
        try {
            GuidanceReport report = recommendationService.getReportByEmail(email);
            return ResponseEntity.ok(report);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

package com.careerpro.service;

import com.careerpro.dto.*;
import com.careerpro.model.*;
import com.careerpro.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * RecommendationService — core engine of the guidance system.
 *
 * VIVA TIP: This service does the following:
 *   1. Accepts user profile (sport, age, weight, fitness, priority)
 *   2. Computes BMI and a fitness score (0-100)
 *   3. Fetches careers from DB for the chosen sport
 *   4. Scores each career using a weighted algorithm based on user's priority
 *   5. Fetches skills, training paths, diet plans from DB
 *   6. Builds and returns a complete GuidanceReport
 *
 * This is a RULE-BASED recommendation engine — a common pattern
 * for mini projects before applying ML-based collaborative filtering.
 */
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SportRepository sportRepository;
    private final CareerRepository careerRepository;
    private final SkillRepository skillRepository;
    private final TrainingPathRepository trainingPathRepository;
    private final DietPlanRepository dietPlanRepository;
    private final UserProfileRepository userProfileRepository;
    private final TrainingCenterRepository trainingCenterRepository;


    // -------------------------------------------------------
    // generateReport — main public method called by controller
    // -------------------------------------------------------
    public GuidanceReport generateReport(UserProfileRequest req) {

        // 1. Find the sport in DB
        Sport sport = sportRepository.findByNameIgnoreCase(req.getSportInterest())
                .orElseThrow(() -> new RuntimeException(
                    "Sport not found: " + req.getSportInterest() +
                    ". Please choose from: Cricket, Football, Athletics, Badminton, Tennis, Swimming, Basketball, Kabaddi"));

        // 2. Compute BMI
        double bmi = computeBmi(req.getWeightKg(), req.getHeightCm());
        String bmiCategory = classifyBmi(bmi);

        // 3. Compute fitness score (0-100)
        int fitnessScore = computeFitnessScore(req.getAge(), req.getWeightKg(),
                req.getHeightCm(), req.getFitnessLevel(), sport);

        // 4. Save user profile to DB
        UserProfile profile = saveProfile(req, bmi, fitnessScore);

        // 5. Fetch and score careers
        List<Career> careers = careerRepository.findBySportId(sport.getId());
        List<CareerRecommendation> recommendations = scoreAndRankCareers(
                careers, req.getPriority(), req.getCareerLevel(), fitnessScore);

        // 6. Fetch skills
        List<Skill> skills = skillRepository.findBySportId(sport.getId());
        if (skills == null || skills.isEmpty()) {
            // Fallback for missing skills
            Skill s1 = new Skill();
            s1.setSkillName("Core Fundamentals");
            s1.setSkillType("Technical");
            s1.setDescription("Master the fundamental movements and rules of " + sport.getName() + ".");

            Skill s2 = new Skill();
            s2.setSkillName("Physical Conditioning");
            s2.setSkillType("Physical");
            s2.setDescription("Build the specific stamina, agility, and strength required.");
            
            skills = List.of(s1, s2);
        }

        // 7. Fetch training path for chosen career level
        List<TrainingPath> trainingPaths = trainingPathRepository
                .findBySportIdAndCareerLevelIgnoreCaseOrderByStepNumberAsc(
                        sport.getId(), req.getCareerLevel());
        if (trainingPaths.isEmpty()) {
            // fallback: fetch all training steps for this sport
            trainingPaths = trainingPathRepository.findBySportIdOrderByStepNumberAsc(sport.getId());
        }
        if (trainingPaths.isEmpty()) {
            // Ultimate fallback
            TrainingPath gp = new TrainingPath();
            gp.setStepNumber(1);
            gp.setStepTitle("Foundational " + sport.getName() + " Training");
            gp.setStepDescription("Join a certified academy to build basic physical and technical skills.");
            gp.setDurationEstimate("Ongoing");
            trainingPaths = List.of(gp);
        }

        // 8. Fetch diet plan
        List<DietPlan> dietPlans = dietPlanRepository
                .findBySportIdAndFitnessLevelIgnoreCase(sport.getId(), req.getFitnessLevel());
        if (dietPlans.isEmpty()) {
            dietPlans = dietPlanRepository.findBySportIdAndFitnessLevelIgnoreCase(sport.getId(), "Beginner");
            if (dietPlans.isEmpty()) {
                dietPlans = dietPlanRepository.findBySportId(sport.getId());
            }
        }
        if (dietPlans.isEmpty()) {
            // Ultimate fallback
            DietPlan dp = new DietPlan();
            dp.setMealTime("General Plan");
            dp.setRecommendation("Maintain a balanced diet rich in protein, complex carbohydrates, and hydration suited for " + sport.getName() + ".");
            dp.setCaloriesApprox(2000);
            dp.setNotes("Consult a local sports nutritionist for a detailed, personalised meal plan.");
            dietPlans = List.of(dp);
        }

        // 8b. Fetch Database Training Centers
        List<TrainingCenter> liveCenters = new ArrayList<>();
        if (req.getLocation() != null && !req.getLocation().trim().isEmpty()) {
            liveCenters = trainingCenterRepository.findBySportNameIgnoreCaseAndLocationIgnoreCase(sport.getName(), req.getLocation());
            if (liveCenters.isEmpty()) {
                TrainingCenter mock1 = new TrainingCenter("Elite " + sport.getName() + " Academy of " + req.getLocation(), req.getLocation() + " Central Sports Complex", 4.8, 124, "mock_1");
                mock1.setSportName(sport.getName());
                mock1.setLocation(req.getLocation());
                
                TrainingCenter mock2 = new TrainingCenter("NextGen " + sport.getName() + " Training Hub", req.getLocation() + " Downtown Arena", 4.5, 87, "mock_2");
                mock2.setSportName(sport.getName());
                mock2.setLocation(req.getLocation());
                
                liveCenters = trainingCenterRepository.saveAll(List.of(mock1, mock2));
            }
        }

        // 9. Build the report
        GuidanceReport report = new GuidanceReport();
        report.setProfileId(profile.getId());
        report.setUserName(req.getName());
        report.setSportInterest(req.getSportInterest());
        report.setAge(req.getAge());
        report.setWeightKg(req.getWeightKg());
        report.setHeightCm(req.getHeightCm());
        report.setFitnessLevel(req.getFitnessLevel());
        report.setCareerLevel(req.getCareerLevel());
        report.setPriority(req.getPriority());
        report.setBmi(Math.round(bmi * 100.0) / 100.0);
        report.setBmiCategory(bmiCategory);
        report.setFitnessScore(fitnessScore);
        report.setFitnessRemarks(generateFitnessRemarks(fitnessScore, bmiCategory, req.getFitnessLevel()));
        report.setRecommendedCareers(recommendations);
        report.setRequiredSkills(skills);
        report.setTrainingRoadmap(trainingPaths);
        report.setTrainingCenters(liveCenters);
        report.setDietPlan(dietPlans);
        report.setGrowthPath(buildGrowthPath(req.getCareerLevel()));
        report.setOverallAdvice(generateOverallAdvice(req, fitnessScore, bmiCategory));

        return report;
    }

    // -------------------------------------------------------
    // BMI Calculation
    // -------------------------------------------------------
    private double computeBmi(Double weightKg, Double heightCm) {
        if (heightCm == null || heightCm <= 0) return 0.0;
        double heightM = heightCm / 100.0;
        return weightKg / (heightM * heightM);
    }

    private String classifyBmi(double bmi) {
        if (bmi <= 0)    return "Unknown (height not provided)";
        if (bmi < 18.5)  return "Underweight";
        if (bmi < 25.0)  return "Normal";
        if (bmi < 30.0)  return "Overweight";
        return "Obese";
    }

    // -------------------------------------------------------
    // Fitness Score Calculation (0-100)
    // Factors: age suitability, BMI, fitness level, weight range
    // -------------------------------------------------------
    private int computeFitnessScore(Integer age, Double weightKg,
                                    Double heightCm, String fitnessLevel, Sport sport) {
        int score = 0;

        // Age suitability (max 30 pts)
        if (age >= sport.getMinAge() && age <= sport.getMaxAge()) {
            if (age <= (sport.getMinAge() + 10)) score += 30;  // young and in range
            else score += 20;
        } else if (age < sport.getMinAge()) {
            score += 15; // too young but can still start
        } else {
            score += 5;  // beyond peak age
        }

        // BMI / weight (max 30 pts)
        if (heightCm != null && heightCm > 0) {
            double bmi = computeBmi(weightKg, heightCm);
            if (bmi >= 18.5 && bmi < 25) score += 30;
            else if (bmi >= 25 && bmi < 27) score += 20;
            else if (bmi < 18.5) score += 15;
            else score += 10;
        } else {
            // Use weight range if height not given
            if (weightKg >= sport.getMinWeightKg() && weightKg <= sport.getMaxWeightKg()) {
                score += 25;
            } else {
                score += 10;
            }
        }

        // Fitness level (max 40 pts)
        switch (fitnessLevel.toLowerCase()) {
            case "advanced":     score += 40; break;
            case "intermediate": score += 25; break;
            case "beginner":     score += 10; break;
            default:             score += 10;
        }

        return Math.min(score, 100); // cap at 100
    }

    // -------------------------------------------------------
    // Career Scoring — weighted by user's priority
    // -------------------------------------------------------
    private List<CareerRecommendation> scoreAndRankCareers(
            List<Career> careers, String priority, String careerLevel, int fitnessScore) {

        List<CareerRecommendation> result = new ArrayList<>();

        for (Career c : careers) {
            // Base match score using user's declared priority
            int score = computePriorityScore(c, priority);

            // Bonus if level matches
            if (c.getLevelRequired() != null &&
                c.getLevelRequired().equalsIgnoreCase(careerLevel)) {
                score += 15;
            }

            // Fitness compatibility bonus
            int fitnessDiff = Math.abs(fitnessScore - (c.getFitnessScore() * 10));
            if (fitnessDiff <= 10) score += 10;
            else if (fitnessDiff <= 20) score += 5;

            score = Math.min(score, 100); // cap

            String reason = buildMatchReason(c, priority, score);

            CareerRecommendation rec = new CareerRecommendation();
            rec.setCareerId(c.getId());
            rec.setTitle(c.getTitle());
            rec.setDescription(c.getDescription());
            rec.setAvgSalaryInr(c.getAvgSalaryInr());
            rec.setLevelRequired(c.getLevelRequired());
            rec.setMatchScore(score);
            rec.setMatchReason(reason);
            result.add(rec);
        }

        // Sort by matchScore descending
        result.sort((a, b) -> b.getMatchScore() - a.getMatchScore());
        return result;
    }

    private int computePriorityScore(Career career, String priority) {
        return switch (priority.toLowerCase()) {
            case "income"    -> (career.getIncomeScore()    != null ? career.getIncomeScore()    : 5) * 8;
            case "passion"   -> (career.getPassionScore()   != null ? career.getPassionScore()   : 5) * 8;
            case "stability" -> (career.getStabilityScore() != null ? career.getStabilityScore() : 5) * 8;
            case "fitness"   -> (career.getFitnessScore()   != null ? career.getFitnessScore()   : 5) * 8;
            default          -> 40; // neutral base score
        };
    }

    private String buildMatchReason(Career career, String priority, int score) {
        String level = score >= 70 ? "Strong" : score >= 50 ? "Good" : "Fair";
        return level + " match based on your " + priority + " priority. " +
               "Recommended level: " + career.getLevelRequired() + ".";
    }

    // -------------------------------------------------------
    // Growth Path Text
    // -------------------------------------------------------
    private String buildGrowthPath(String careerLevel) {
        return switch (careerLevel.toLowerCase()) {
            case "district"      -> "District → State → National → International";
            case "state"         -> "State → National → International";
            case "national"      -> "National → International";
            case "international" -> "International (Elite Level)";
            default              -> "District → State → National → International";
        };
    }

    // -------------------------------------------------------
    // Remarks and Advice
    // -------------------------------------------------------
    private String generateFitnessRemarks(int score, String bmiCat, String level) {
        if (score >= 75) return "Excellent fitness profile! You are well positioned to pursue a high-level sports career.";
        if (score >= 55) return "Good fitness base. Focus on consistency in training and nutrition to move to the next level.";
        if (score >= 35) return "Moderate fitness. Increase training frequency, improve diet and work with a certified coach.";
        return "Fitness needs significant improvement. Begin with 3-4 months of foundational conditioning before specialised training.";
    }

    private String generateOverallAdvice(UserProfileRequest req, int fitnessScore, String bmiCat) {
        StringBuilder sb = new StringBuilder();
        sb.append("Based on your profile (Age: ").append(req.getAge())
          .append(", Sport: ").append(req.getSportInterest())
          .append(", Level Goal: ").append(req.getCareerLevel()).append("):\n\n");

        if (fitnessScore >= 70) {
            sb.append("You have a strong foundation to pursue a career in ").append(req.getSportInterest()).append(". ");
            sb.append("Focus on technical skill refinement and consistent competitive exposure.\n\n");
        } else {
            sb.append("Start by building your physical base over the next 3-6 months before focusing on technical skills.\n\n");
        }

        if ("Overweight".equals(bmiCat) || "Obese".equals(bmiCat)) {
            sb.append("Your BMI suggests weight management should be a priority. Work with a sports nutritionist.\n\n");
        } else if ("Underweight".equals(bmiCat)) {
            sb.append("Your BMI is below normal. Increase caloric intake with protein-rich foods to build muscle mass.\n\n");
        }

        sb.append("Priority focus (").append(req.getPriority()).append("): ");
        sb.append(switch (req.getPriority().toLowerCase()) {
            case "income"    -> "Aim for leagues like IPL/ISL or take up coaching/commentary which offer high income.";
            case "passion"   -> "Playing professionally will give you the highest passion satisfaction. Train relentlessly.";
            case "stability" -> "Coaching, PE teaching, or sports science roles offer stable long-term careers.";
            case "fitness"   -> "Professional playing or sports science roles will keep you deeply connected to fitness.";
            default          -> "Explore multiple paths and choose based on your evolving interests.";
        });

        return sb.toString();
    }

    // -------------------------------------------------------
    // Save UserProfile to DB
    // -------------------------------------------------------
    private UserProfile saveProfile(UserProfileRequest req, double bmi, int fitnessScore) {
        UserProfile p = new UserProfile();
        p.setName(req.getName());
        p.setSportInterest(req.getSportInterest());
        p.setLocation(req.getLocation());
        p.setAge(req.getAge());
        p.setWeightKg(req.getWeightKg());
        p.setHeightCm(req.getHeightCm());
        p.setFitnessLevel(req.getFitnessLevel());
        p.setCareerLevel(req.getCareerLevel());
        p.setPriority(req.getPriority());
        p.setBmi(Math.round(bmi * 100.0) / 100.0);
        p.setFitnessScore(fitnessScore);
        return userProfileRepository.save(p);
    }
}

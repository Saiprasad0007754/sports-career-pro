package com.careerpro.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * UserProfileRequest — DTO (Data Transfer Object) for the user input form.
 *
 * VIVA TIP: DTOs are plain Java objects used to transfer data between
 * the client (React) and the server (Spring Boot). They do NOT have
 * database annotations — they are only for input/output.
 *
 * @NotBlank, @Min, @Max are Bean Validation annotations.
 * Spring validates these automatically when @Valid is used in controller.
 */
@Data
@NoArgsConstructor
public class UserProfileRequest {

    private String name;

    @NotBlank(message = "Sport interest is required")
    private String sportInterest;

    @NotBlank(message = "Location/City is required")
    private String location;

    @NotNull(message = "Age is required")
    @Min(value = 8, message = "Minimum age is 8")
    @Max(value = 50, message = "Maximum age is 50")
    private Integer age;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "30.0", message = "Minimum weight is 30 kg")
    @DecimalMax(value = "150.0", message = "Maximum weight is 150 kg")
    private Double weightKg;

    private Double heightCm;

    @NotBlank(message = "Fitness level is required")
    private String fitnessLevel;   // Beginner / Intermediate / Advanced

    @NotBlank(message = "Career level is required")
    private String careerLevel;    // District / State / National / International

    @NotBlank(message = "Priority is required")
    private String priority;       // fitness / income / passion / stability
}

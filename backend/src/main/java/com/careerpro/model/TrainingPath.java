package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/** TrainingPath — step-by-step training roadmap per sport and career level. */
@Data @NoArgsConstructor
@Entity @Table(name = "training_paths")
public class TrainingPath {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sport_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Sport sport;

    private String careerLevel;    // District / State / National / International
    private Integer stepNumber;
    private String stepTitle;

    @Column(columnDefinition = "TEXT")
    private String stepDescription;

    private String durationEstimate;
}

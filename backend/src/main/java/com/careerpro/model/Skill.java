package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Skill — JPA Entity mapped to the 'skills' table.
 * Each skill belongs to one Sport (Many-to-One relationship).
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sport_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Sport sport;

    private String skillName;
    private String skillType;   // Physical / Technical / Mental

    @Column(columnDefinition = "TEXT")
    private String description;
}

package com.careerpro.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "training_centers")
public class TrainingCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sportName;
    private String location;

    private String name;
    private String address;
    private Double rating;
    private Integer userRatingsTotal;
    private String placeId;

    public TrainingCenter(String name, String address, Double rating, Integer userRatingsTotal, String placeId) {
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.userRatingsTotal = userRatingsTotal;
        this.placeId = placeId;
    }
}

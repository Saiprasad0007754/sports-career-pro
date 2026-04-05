package com.careerpro.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TrainingCenterDto — Holds structured data returned from the Google Maps Places API.
 */
@Data
@NoArgsConstructor
public class TrainingCenterDto {
    private String name;
    private String address;
    private Double rating;
    private Integer userRatingsTotal;
    private String placeId;

    public TrainingCenterDto(String name, String address, Double rating, Integer userRatingsTotal, String placeId) {
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.userRatingsTotal = userRatingsTotal;
        this.placeId = placeId;
    }
}

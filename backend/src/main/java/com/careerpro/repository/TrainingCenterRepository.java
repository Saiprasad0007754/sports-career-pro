package com.careerpro.repository;

import com.careerpro.model.TrainingCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingCenterRepository extends JpaRepository<TrainingCenter, Long> {
    List<TrainingCenter> findBySportNameIgnoreCaseAndLocationIgnoreCase(String sportName, String location);
}

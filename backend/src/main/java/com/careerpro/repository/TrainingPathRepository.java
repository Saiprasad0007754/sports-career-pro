package com.careerpro.repository;

import com.careerpro.model.TrainingPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** TrainingPathRepository — DB access for the 'training_paths' table. */
@Repository
public interface TrainingPathRepository extends JpaRepository<TrainingPath, Long> {
    List<TrainingPath> findBySportIdOrderByStepNumberAsc(Long sportId);
    List<TrainingPath> findBySportIdAndCareerLevelIgnoreCaseOrderByStepNumberAsc(Long sportId, String careerLevel);
}

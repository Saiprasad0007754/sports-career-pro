package com.careerpro.repository;

import com.careerpro.model.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** DietPlanRepository — DB access for the 'diet_plans' table. */
@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findBySportId(Long sportId);
    List<DietPlan> findBySportIdAndFitnessLevelIgnoreCase(Long sportId, String fitnessLevel);
}

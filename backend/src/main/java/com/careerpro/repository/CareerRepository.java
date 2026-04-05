package com.careerpro.repository;

import com.careerpro.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** CareerRepository — DB access for the 'careers' table. */
@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    // Get all careers for a specific sport ID
    List<Career> findBySportId(Long sportId);

    // Get careers by sport ID and career level (District/State etc.)
    List<Career> findBySportIdAndLevelRequiredIgnoreCase(Long sportId, String levelRequired);
}

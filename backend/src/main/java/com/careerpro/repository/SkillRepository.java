package com.careerpro.repository;

import com.careerpro.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** SkillRepository — DB access for the 'skills' table. */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findBySportId(Long sportId);
    List<Skill> findBySportIdAndSkillTypeIgnoreCase(Long sportId, String skillType);
}

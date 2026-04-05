package com.careerpro.repository;

import com.careerpro.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * SportRepository — Data Access Layer for the 'sports' table.
 *
 * By extending JpaRepository<Sport, Long>, Spring auto-generates:
 *   save(), findById(), findAll(), deleteById(), count(), etc.
 * We only need to declare custom query methods here.
 */
@Repository
public interface SportRepository extends JpaRepository<Sport, Long> {
    Optional<Sport> findByNameIgnoreCase(String name);
    List<Sport> findByCategoryIgnoreCase(String category);
}

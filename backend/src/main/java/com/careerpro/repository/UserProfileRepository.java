package com.careerpro.repository;

import com.careerpro.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** UserProfileRepository — DB access for the 'user_profiles' table. */
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    List<UserProfile> findBySportInterestIgnoreCase(String sportInterest);
}

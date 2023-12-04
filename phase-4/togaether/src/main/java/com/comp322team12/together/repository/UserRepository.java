package com.comp322team12.together.repository;

import com.comp322team12.together.domain.User.User;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findAllByEmail(String email);

    @Lock(value = LockModeType.OPTIMISTIC)
    @Query("select u from User u where u.email = :email")
    Optional<User> findByEmailWithOptimisticLock(@Param("email") String email);
}

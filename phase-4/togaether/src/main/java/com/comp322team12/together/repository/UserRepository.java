package com.comp322team12.together.repository;

import com.comp322team12.together.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

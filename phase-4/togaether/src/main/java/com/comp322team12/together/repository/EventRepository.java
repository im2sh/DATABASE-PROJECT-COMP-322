package com.comp322team12.together.repository;

import com.comp322team12.together.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}

package com.comp322team12.together.repository;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.constants.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCategory(Category category);
}

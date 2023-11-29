package com.comp322team12.together.repository;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.bookmark.BookmarkId;
import com.comp322team12.together.domain.constants.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCategory(Category category);
    @Query("SELECT P FROM Place P WHERE P.city LIKE %:city%")
    List<Place> findByCityContaining(@Param("city") String city);

}

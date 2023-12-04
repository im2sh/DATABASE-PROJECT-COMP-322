package com.comp322team12.together.repository;

import com.comp322team12.together.domain.bookmark.Bookmark;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);


    Optional<Bookmark> findByUserIdAndPlaceId(Long userId, Long placeId);
}

package com.comp322team12.together.repository;

import com.comp322team12.together.domain.bookmark.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}

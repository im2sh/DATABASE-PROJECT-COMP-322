package com.comp322team12.together.repository;

import com.comp322team12.together.domain.Diary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllDiaryByPlaceId(Long placeId);
}

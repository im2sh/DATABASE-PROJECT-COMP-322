package com.comp322team12.together.service;

import com.comp322team12.together.domain.Diary;
import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.dto.request.diary.DiaryCreateRequest;
import com.comp322team12.together.exception.place.InvalidPlaceException;
import com.comp322team12.together.exception.user.InvalidUserException;
import com.comp322team12.together.repository.DiaryRepository;
import com.comp322team12.together.repository.PetRepository;
import com.comp322team12.together.repository.PlaceRepository;
import com.comp322team12.together.repository.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryService {
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final DiaryRepository diaryRepository;
    private final PetRepository petRepository;
    @Transactional
    public void createDiary(Long userId, Long placeId, DiaryCreateRequest diaryCreateRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new InvalidUserException("존재하지 않는 유저입니다."));
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new InvalidPlaceException("존재하지 않는 장소입니다."));

        Diary diary = new Diary(diaryCreateRequest.content(), diaryCreateRequest.emotion(), LocalDateTime.now(), user, place);
        diaryRepository.save(diary);

        user.addDiary(diary);
        place.addDiary(diary);
    }
}

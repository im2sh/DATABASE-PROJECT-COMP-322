package com.comp322team12.together.dto.response.diary;

import com.comp322team12.together.domain.Diary;
import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import java.time.LocalDateTime;
import java.util.List;

public record DiaryResponse(String content, String emotion, LocalDateTime createdDate, User user, Place place) {
    @Override
    public Place place() {
        return place;
    }

}

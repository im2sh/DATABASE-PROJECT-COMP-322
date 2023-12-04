package com.comp322team12.together.service;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.domain.bookmark.Bookmark;
import com.comp322team12.together.domain.bookmark.BookmarkId;
import com.comp322team12.together.domain.constants.Category;
import com.comp322team12.together.dto.request.place.BookMarkRequest;
import com.comp322team12.together.dto.response.place.PlaceResponse;
import com.comp322team12.together.exception.place.InvalidCategoryException;
import com.comp322team12.together.exception.place.InvalidCityException;
import com.comp322team12.together.exception.place.InvalidPlaceException;
import com.comp322team12.together.exception.place.InvalidBookmarkException;
import com.comp322team12.together.exception.user.InvalidUserException;
import com.comp322team12.together.repository.BookmarkRepository;
import com.comp322team12.together.repository.PlaceRepository;
import com.comp322team12.together.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlaceService {
    private final PlaceRepository placeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public List<PlaceResponse> findAllPlace() {
        List<Place> allPlace = placeRepository.findAll();
        List<PlaceResponse> placeResponses = new ArrayList<>();
        for (Place place : allPlace) {
            placeResponses.add(place.toResponse());
        }
        return placeResponses;
    }

    public List<PlaceResponse> findPlaceByCategory(String category) {
        try {
            Category getCategory = Category.valueOf(category.toUpperCase());
            List<Place> allPlace = placeRepository.findByCategory(getCategory);
            List<PlaceResponse> placeResponses = new ArrayList<>();
            for (Place place : allPlace) {
                placeResponses.add(place.toResponse());
            }
            return placeResponses;
        } catch (IllegalArgumentException e) {
            throw new InvalidCategoryException("존재하지 않는 카테고리입니다.");
        }
    }

    public List<PlaceResponse> findPlaceByCity(String city) {
        try {
            List<Place> allPlace = placeRepository.findByCityContaining(city);
            List<PlaceResponse> placeResponses = new ArrayList<>();
            for (Place place : allPlace) {
                placeResponses.add(place.toResponse());
            }
            if (placeResponses.isEmpty()) {
                throw new InvalidCityException("존재하지 않는 도시입니다.");
            }
            return placeResponses;
        } catch (InvalidCityException e) {
            throw e;
        }
    }

    public List<PlaceResponse> findPlacesByRatingRange(String minRating, String maxRating) {
        List<Place> all = placeRepository.findAll();
        List<PlaceResponse> placeResponses = new ArrayList<>();
        for (Place place : all) {
            double averageRating = place.getAverageRating();
            if (averageRating >= Integer.parseInt(minRating) && averageRating <= Integer.parseInt(maxRating)) {
                placeResponses.add(place.toResponse());
            }
        }
        return placeResponses;
    }

    public List<PlaceResponse> findBookmarkByUserId(Long userId) {
        List<Bookmark> bookmarkByUserId = bookmarkRepository.findByUserId(userId);
        if (bookmarkByUserId.isEmpty()) {
            throw new InvalidBookmarkException("북마크한 장소가 없습니다.");
        }
        List<PlaceResponse> placeResponses = new ArrayList<>();
        for (Bookmark bookmark : bookmarkByUserId) {
            if (bookmark.getStatus() == 0) {
                continue;
            }
            Place place = bookmark.getId().getPlace();
            placeResponses.add(place.toResponse());
        }
        if (placeResponses.isEmpty()) {
            throw new InvalidBookmarkException("북마크한 장소가 없습니다.");
        }
        return placeResponses;
    }


    @Transactional
    public void choiceBookmark(BookMarkRequest bookMarkRequest) {
        User user = userRepository.findById(bookMarkRequest.userId())
                .orElseThrow(() -> new InvalidUserException("존재하지 않는 유저입니다."));

        Place place = placeRepository.findById(bookMarkRequest.placeId())
                .orElseThrow(() -> new InvalidPlaceException("존재하지 않는 장소입니다."));
        Optional<Bookmark> byBookmarkIdUserAndBookmarkIdPlace = bookmarkRepository.findByUserIdAndPlaceId(
                user.getUserId(), place.getPlaceId());
        if (!byBookmarkIdUserAndBookmarkIdPlace.isPresent()) {
            BookmarkId bookmarkId = new BookmarkId(user, place);
            Bookmark bookmark = new Bookmark(bookmarkId, 1);
            bookmarkRepository.save(bookmark);
        } else {
            Bookmark bookmark = byBookmarkIdUserAndBookmarkIdPlace.get();
            bookmark.changeStatus();
        }
    }

    public List<PlaceResponse> findPlaceByKeyword(String placeName) {
        List<Place> places = placeRepository.findByPlaceNameContaining(placeName);
        if(places.isEmpty()) {
            throw new InvalidPlaceException("존재하지 않는 장소입니다.");
        }
        List<PlaceResponse> placeResponses = new ArrayList<>();
        for (Place place : places) {
            placeResponses.add(place.toResponse());
        }
        return placeResponses;
    }

    public Place findPlaceById(Long placeId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new InvalidPlaceException("존재하지 않는 장소입니다."));
        return place;
    }
}

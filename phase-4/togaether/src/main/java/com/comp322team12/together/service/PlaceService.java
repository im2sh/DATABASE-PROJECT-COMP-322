package com.comp322team12.together.service;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.domain.constants.Category;
import com.comp322team12.together.dto.response.place.PlaceResponse;
import com.comp322team12.together.exception.place.InvalidCategoryException;
import com.comp322team12.together.exception.place.InvalidCityException;
import com.comp322team12.together.repository.PlaceRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaceService {
    private final PlaceRepository placeRepository;

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
        }  catch (InvalidCityException e) {
            throw e;
        }
    }
}

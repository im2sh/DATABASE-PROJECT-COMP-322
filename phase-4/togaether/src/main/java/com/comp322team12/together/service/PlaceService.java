package com.comp322team12.together.service;

import com.comp322team12.together.domain.Place;
import com.comp322team12.together.dto.response.place.PlaceResponse;
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

    public List<PlaceResponse> findAllPlace(){
        List<Place> allPlace = placeRepository.findAll();
        List<PlaceResponse> placeResponses = new ArrayList<>();
        for (Place place : allPlace) {
            placeResponses.add(place.toResponse());
        }
        return placeResponses;
    }
}

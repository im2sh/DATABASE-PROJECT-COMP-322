package com.comp322team12.together.api;

import com.comp322team12.together.dto.response.place.PlaceResponse;
import com.comp322team12.together.service.PlaceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Place", description = "Place 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/place")
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("/all")
    public ResponseEntity<List<PlaceResponse>> findAllPlace(){
        return ResponseEntity.ok().body(placeService.findAllPlace());
    }

    @GetMapping("/{category}")
    public ResponseEntity<List<PlaceResponse>> findPlaceByCategory(@PathVariable String category){
        return ResponseEntity.ok().body(placeService.findPlaceByCategory(category));
    }
}

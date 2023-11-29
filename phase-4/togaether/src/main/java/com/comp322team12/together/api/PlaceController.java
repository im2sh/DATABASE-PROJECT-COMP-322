package com.comp322team12.together.api;

import com.comp322team12.together.dto.response.place.PlaceResponse;
import com.comp322team12.together.exception.place.InvalidCategoryException;
import com.comp322team12.together.exception.place.InvalidCityException;
import com.comp322team12.together.exception.place.InvalidRatingException;
import com.comp322team12.together.exception.place.NotBookmarkException;
import com.comp322team12.together.service.PlaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@RequestMapping(value = "/api/place", produces = "application/json; charset=UTF-8")
public class PlaceController {

    private final PlaceService placeService;

    @Operation(
            summary = "모든 장소 조회",
            description = "모든 장소를 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "모든 장소 조회에 성공하였습니다."
    )
    @GetMapping("/all")
    public ResponseEntity<List<PlaceResponse>> findAllPlace() {
        return ResponseEntity.ok().body(placeService.findAllPlace());
    }

    @Operation(
            summary = "도시별 장소 조회",
            description = "도시별 장소를 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "도시별 장소 조회에 성공하였습니다."
    )
    @GetMapping("city/{city}")
    public ResponseEntity<?> findPlacesByCity(@PathVariable String city) {
        try {
            List<PlaceResponse> places = placeService.findPlaceByCity(city);
            return ResponseEntity.ok().body(places);
        } catch (InvalidCityException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(
            summary = "카테고리별 장소 조회",
            description = "카테고리별 장소를 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "카테고리별 장소 조회에 성공하였습니다."
    )
    @GetMapping("category/{category}")
    public ResponseEntity<?> findPlaceByCategory(@PathVariable String category) {
        try {
            List<PlaceResponse> places = placeService.findPlaceByCategory(category);
            return ResponseEntity.ok().body(places);
        } catch (InvalidCategoryException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(
            summary = "평점별 장소 조회",
            description = "평점별 장소를 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "평점별 장소 조회에 성공하였습니다."
    )
    @GetMapping("rating/{minRating}/{maxRating}")
    public ResponseEntity<?> findPlaceByRating(@PathVariable String minRating, @PathVariable String maxRating) {
        try {
            List<PlaceResponse> placesByRatingRange = placeService.findPlacesByRatingRange(minRating, maxRating);
            return ResponseEntity.ok().body(placesByRatingRange);
        } catch (InvalidRatingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(
            summary = "북마크한 장소 조회",
            description = "북마크한 장소를 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "북마크한 장소 조회에 성공하였습니다."
    )
    @GetMapping("/bookmark/{userId}")
    public ResponseEntity<?> findBookmarkByUserId(@PathVariable Long userId) {
        try {
            List<PlaceResponse> placeResponse = placeService.findBookmarkByUserId(userId);
            return ResponseEntity.ok().body(placeResponse);
        } catch (NotBookmarkException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

package com.comp322team12.together.api;

import com.comp322team12.together.dto.request.diary.DiaryCreateRequest;
import com.comp322team12.together.dto.response.common.ResponseDto;
import com.comp322team12.together.dto.response.pet.PetResponse;
import com.comp322team12.together.exception.place.InvalidPlaceException;
import com.comp322team12.together.exception.user.InvalidUserException;
import com.comp322team12.together.service.DiaryService;
import com.comp322team12.together.service.UserService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Diary", description = "Diary 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(value = "/api/diary", produces = "application/json; charset=UTF-8")
public class DiaryController {
    private final DiaryService diaryService;
    private final UserService userService;
    @GetMapping("/create/{userId}/{placeId}")
    public ResponseEntity<?> loadUserPet(@PathVariable Long userId, @PathVariable Long placeId) {
        try {
            List<PetResponse> petInfo = userService.getPetInfo(userId);
            return ResponseEntity.ok().body(petInfo);
        } catch (InvalidPlaceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        } catch (InvalidUserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        }
    }

    @Operation(
            summary = "다이어리 생성",
            description = "다이어리를 생성합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "다이어리 생성에 성공하였습니다."
    )
    @PostMapping("/create/{userId}/{placeId}")
    public ResponseEntity<?> createDiary(@PathVariable Long userId, @PathVariable Long placeId, @RequestBody DiaryCreateRequest diaryCreateRequest) {
        try {
            diaryService.createDiary(userId, placeId, diaryCreateRequest);
            return ResponseEntity.ok().body(new ResponseDto("다이어리 생성에 성공하였습니다."));
        } catch (InvalidPlaceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        } catch (InvalidUserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        }
    }

}

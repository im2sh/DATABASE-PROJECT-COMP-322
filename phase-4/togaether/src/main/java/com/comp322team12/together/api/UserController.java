package com.comp322team12.together.api;

import com.comp322team12.together.dto.request.UserSignupRequest;
import com.comp322team12.together.dto.response.ResponseDto;
import com.comp322team12.together.exception.DuplicateEmailException;
import com.comp322team12.together.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signup(@RequestBody @Validated UserSignupRequest userSignupRequest) {
        try {
            userService.signup(userSignupRequest);
            return ResponseEntity.ok().body(new ResponseDto("회원가입에 성공하였습니다."));
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto("이미 가입된 이메일입니다."));
        }
    }

}

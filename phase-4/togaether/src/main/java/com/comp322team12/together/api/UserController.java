package com.comp322team12.together.api;

import com.comp322team12.together.domain.User.SessionConst;
import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.dto.request.user.UserLoginRequest;
import com.comp322team12.together.dto.request.user.UserPwModificationRequest;
import com.comp322team12.together.dto.request.user.UserSignupRequest;
import com.comp322team12.together.dto.response.common.ResponseDto;
import com.comp322team12.together.dto.response.user.UserLoginResponse;
import com.comp322team12.together.exception.user.DuplicateEmailException;
import com.comp322team12.together.exception.user.IncorrectPassword;
import com.comp322team12.together.exception.user.NotEmailException;
import com.comp322team12.together.exception.user.NotPasswordException;
import com.comp322team12.together.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User", description = "User 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Operation(
            summary = "회원가입",
            description = "회원가입을 합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "회원가입에 성공하였습니다."
    )
    @PostMapping("/signup")
    public ResponseEntity<ResponseDto> signup(@RequestBody @Validated UserSignupRequest userSignupRequest) {
        try {
            userService.signup(userSignupRequest);
            return ResponseEntity.ok().body(new ResponseDto("회원가입에 성공하였습니다."));
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        }
    }

    @Operation(
            summary = "로그인",
            description = "로그인을 합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "로그인에 성공하였습니다."
    )
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody @Validated UserLoginRequest userLoginRequest,
                                                   HttpServletRequest request) {
        try {
            String email = userLoginRequest.email();
            String password = userLoginRequest.password();
            User user = userService.authenticate(email, password);
            HttpSession session = request.getSession();
            session.setAttribute(SessionConst.LOGIN_MEMBER, user.getUserId());

            return ResponseEntity.ok().body(new UserLoginResponse(user.getUserId(), user.getUserName()));
        } catch (NotEmailException | NotPasswordException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserLoginResponse(null, null));
        }
    }

    @Operation(
            summary = "로그아웃",
            description = "로그아웃을 합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "로그아웃에 성공하였습니다."
    )
    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body(new ResponseDto("로그아웃 되었습니다."));
    }

    @Operation(
            summary = "비밀번호 변경",
            description = "비밀번호를 변경합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "비밀번호 변경에 성공하였습니다."
    )
    @PostMapping("/modifyPw/{userId}")
    public ResponseEntity<ResponseDto> modifyUserPw(@PathVariable("userId") Long userId,
                                                    @RequestBody UserPwModificationRequest request) {
        try {
            userService.modifyUserPw(userId, request);
            return ResponseEntity.ok().body(new ResponseDto("비밀번호가 변경되었습니다."));
        } catch (IncorrectPassword e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(e.getMessage()));
        }
    }
}

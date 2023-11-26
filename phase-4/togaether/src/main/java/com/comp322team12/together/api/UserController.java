package com.comp322team12.together.api;

import com.comp322team12.together.domain.User.SessionConst;
import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.dto.request.UserLoginRequest;
import com.comp322team12.together.dto.request.UserSignupRequest;
import com.comp322team12.together.dto.response.ResponseDto;
import com.comp322team12.together.dto.response.user.UserLoginResponse;
import com.comp322team12.together.exception.DuplicateEmailException;
import com.comp322team12.together.exception.NotEmailException;
import com.comp322team12.together.exception.NotPasswordException;
import com.comp322team12.together.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody @Validated UserLoginRequest userLoginRequest,
                                                   HttpServletRequest request) {
        try {
            String email = userLoginRequest.email();
            String password = userLoginRequest.password();
            User user = userService.authenticate(email, password);
            HttpSession session = request.getSession();
            session.setAttribute(SessionConst.LOGIN_MEMBER, user);

            return ResponseEntity.ok().body(new UserLoginResponse(user.getUserId(), user.getUserName()));
        } catch (NotEmailException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserLoginResponse(null, "이메일이 존재하지 않습니다."));
        } catch (NotPasswordException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserLoginResponse(null, "비밀번호가 틀렸습니다."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logoutUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return ResponseEntity.ok().body(new ResponseDto("로그아웃 되었습니다."));
    }
}

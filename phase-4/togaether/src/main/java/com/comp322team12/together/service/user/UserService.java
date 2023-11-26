package com.comp322team12.together.service.user;

import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.dto.request.UserPwModificationRequest;
import com.comp322team12.together.dto.request.UserSignupRequest;
import com.comp322team12.together.exception.DuplicateEmailException;
import com.comp322team12.together.exception.IncorrectPassword;
import com.comp322team12.together.exception.NotEmailException;
import com.comp322team12.together.exception.NotPasswordException;
import com.comp322team12.together.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public void signup(UserSignupRequest userSignupRequest) {
        if (userRepository.findByEmail(userSignupRequest.email()).isPresent()) {
            throw new DuplicateEmailException("이미 가입된 이메일입니다.");
        }
        User user = userSignupRequest.toEntity();
        userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotEmailException("가입되지 않은 이메일입니다."));
        if (!user.getPassword().equals(password)) {
            throw new NotPasswordException("잘못된 비밀번호입니다.");
        }
        return user;
    }

    @Transactional
    public void modifyUserPw(Long userId, UserPwModificationRequest request) {
        User user = userRepository.findById(userId).orElse(null);
        System.out.println(user.getUserName());
        if (user == null) {
            throw new IllegalStateException("존재하지 않는 회원입니다.");
        }

        if (!(user.getPassword().equals(request.getNowUserPw()))) {
            throw new IncorrectPassword("이전 비밀번호가 일치하지 않습니다.");
        } else if (!(request.getUpdateUserPw().equals(request.getPwConfirm()))) {
            throw new IncorrectPassword("변경하려는 번호와 입력한 비밀번호를 다시 한 번 확인해주십시오.");
        } else {
            user.pwUpdate(request.getUpdateUserPw());
        }
    }
}

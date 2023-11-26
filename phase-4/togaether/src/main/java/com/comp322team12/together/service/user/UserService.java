package com.comp322team12.together.service.user;

import com.comp322team12.together.domain.User;
import com.comp322team12.together.dto.request.UserSignupRequest;
import com.comp322team12.together.exception.DuplicateEmailException;
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
    public void signup(UserSignupRequest userSignupRequest){
        if(userRepository.findByEmail(userSignupRequest.email()).isPresent()){
            throw new DuplicateEmailException("이미 가입된 이메일입니다.");
        }
        User user = userSignupRequest.toEntity();
        userRepository.save(user);
    }
}

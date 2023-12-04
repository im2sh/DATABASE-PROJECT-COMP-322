package com.comp322team12.together.service;

import com.comp322team12.together.domain.User.User;
import com.comp322team12.together.domain.pet.Pet;
import com.comp322team12.together.dto.request.user.UserPwModificationRequest;
import com.comp322team12.together.dto.request.user.UserSignupRequest;
import com.comp322team12.together.dto.response.pet.PetResponse;
import com.comp322team12.together.exception.user.DuplicateEmailException;
import com.comp322team12.together.exception.user.IncorrectPassword;
import com.comp322team12.together.exception.user.InvalidUserException;
import com.comp322team12.together.exception.user.NotEmailException;
import com.comp322team12.together.exception.user.NotPasswordException;
import com.comp322team12.together.repository.PetRepository;
import com.comp322team12.together.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    private final PetRepository petRepository;

    @Transactional
    public Long signup(UserSignupRequest userSignupRequest) {
        if (userRepository.findByEmailWithOptimisticLock(userSignupRequest.email()).isPresent()) {
            throw new DuplicateEmailException("이미 가입된 이메일입니다.");
        }

        User user = userSignupRequest.toEntity();
        userRepository.save(user);
        return user.getId();
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
    public void modifyUserPw(UserPwModificationRequest request) {
        User user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new NotEmailException("가입되지 않은 이메일입니다."));

        if (!(user.getPassword().equals(request.getNowUserPw()))) {
            throw new IncorrectPassword("이전 비밀번호가 일치하지 않습니다.");
        } else if (!(request.getUpdateUserPw().equals(request.getPwConfirm()))) {
            throw new IncorrectPassword("변경하려는 번호와 입력한 비밀번호를 다시 한 번 확인해주십시오.");
        } else {
            user.pwUpdate(request.getUpdateUserPw());
        }
    }

    public List<PetResponse> getPetInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new InvalidUserException("존재하지 않는 유저입니다."));
        List<PetResponse> petInfoList = new ArrayList<>();
        List<Pet> allPetByUser = user.getPetList();
        for (Pet pet : allPetByUser) {
            petInfoList.add(new PetResponse(pet.getPetName(), pet.getSpecies(), pet.getGender(), pet.getAge(), pet.getIntroduction()));
        }
        return petInfoList;
    }

    public User findByUserId(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new InvalidUserException("존재하지 않는 유저입니다."));
        return user;
    }
}

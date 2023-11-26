package com.comp322team12.together.dto.request;

import com.comp322team12.together.domain.User.User;

public record UserSignupRequest(String userName, String password, String email, String phoneNumber) {
    public User toEntity() {
        return User.builder()
                .userName(userName)
                .password(password)
                .email(email)
                .phoneNumber(phoneNumber)
                .build();
    }
}

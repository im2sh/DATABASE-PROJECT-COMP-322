package com.comp322team12.together.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserPwModificationRequest {
    @NotBlank(message = "현재 비밀번호를 입력해주세요.")
    String nowUserPw;
    @NotBlank(message = "새로운 비밀번호를 입력해주세요.")
    String updateUserPw;
    @NotBlank(message = "입력하신 비밀번호를 확인해주세요.")
    String pwConfirm;

    public UserPwModificationRequest(String nowUserPw, String updateUserPw, String pwConfirm) {
        this.nowUserPw = nowUserPw;
        this.updateUserPw = updateUserPw;
        this.pwConfirm = pwConfirm;
    }
}

package com.comp322team12.together.dto.response;

import lombok.Data;

@Data
public class ResponseDto {
    private String message;

    public ResponseDto(String message) {
        this.message = message;
    }
}

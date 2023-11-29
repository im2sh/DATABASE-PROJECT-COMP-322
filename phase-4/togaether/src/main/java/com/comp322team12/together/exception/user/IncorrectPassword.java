package com.comp322team12.together.exception.user;

public class IncorrectPassword extends RuntimeException{
    public IncorrectPassword(String message) {
        super(message);
    }
}

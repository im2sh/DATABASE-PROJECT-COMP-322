package com.comp322team12.together.exception;

public class IncorrectPassword extends RuntimeException{
    public IncorrectPassword(String message) {
        super(message);
    }
}

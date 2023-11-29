package com.comp322team12.together.exception.user;

public class NotPasswordException extends RuntimeException{
    public NotPasswordException(String message) {
        super(message);
    }
}

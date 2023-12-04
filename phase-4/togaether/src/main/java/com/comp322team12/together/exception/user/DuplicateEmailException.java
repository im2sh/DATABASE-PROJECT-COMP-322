package com.comp322team12.together.exception.user;

public class DuplicateEmailException extends RuntimeException{ ;

    public DuplicateEmailException(String message) {
        super(message);
    }
}

package com.example.MTG_Mox.advice;

public class EmailDoesNotExistException extends RuntimeException{
    public EmailDoesNotExistException(String message) {
        super(message);
    }
}

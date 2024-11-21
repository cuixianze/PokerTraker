package com.example.poker_traker.poker_traker.Exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException (String messege){
        super(messege);
    }
}

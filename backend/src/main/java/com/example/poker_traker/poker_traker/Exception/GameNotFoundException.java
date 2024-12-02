package com.example.poker_traker.poker_traker.Exception;

public class GameNotFoundException extends RuntimeException{
    public GameNotFoundException (String messege){
        super(messege);
    }
}

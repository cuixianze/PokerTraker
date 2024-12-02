package com.example.poker_traker.poker_traker.Entity;

public class GamePlayerDTO {
    private String username;
    private int profitLoss;

    public GamePlayerDTO(String username, int profitLoss) {
        this.username = username;
        this.profitLoss = profitLoss;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getProfitLoss() {
        return profitLoss;
    }

    public void setProfitLoss(int profitLoss) {
        this.profitLoss = profitLoss;
    }
}

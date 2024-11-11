package com.example.poker_traker.poker_traker.Entity;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaderboardDTO {
    private String username;
    private int totalProfit;
    private double winRate;
    private int totalGames;

    public LeaderboardDTO(String username, int totalProfit, double winRate, int totalGames) {
        this.username = username;
        this.totalProfit = totalProfit;
        this.winRate = winRate;
        this.totalGames = totalGames;
    }

    // Getters and setters
}

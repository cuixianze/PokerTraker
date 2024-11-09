package com.example.poker_traker.poker_traker.Entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class GameSummaryDTO {
    private Long id;
    private LocalDateTime gameDate;
    private int totalRake;
    private String sharkUsername;
    private String fishUsername;

    public GameSummaryDTO(Long id, LocalDateTime gameDate, int totalRake, String sharkUsername, String fishUsername) {
        this.id = id;
        this.gameDate = gameDate;
        this.totalRake = totalRake;
        this.sharkUsername = sharkUsername;
        this.fishUsername = fishUsername;
    }

    // Getters and Setters
}

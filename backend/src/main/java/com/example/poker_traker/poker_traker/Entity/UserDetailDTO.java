package com.example.poker_traker.poker_traker.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDetailDTO {
    private String username;
    private int winningGames;
    private int losingGames;
    private List<GameProfitLossDTO> gameRecords;
    private List<ProfitLossGraphPoint> profitLossGraph;

    public UserDetailDTO(String username, int winningGames, int losingGames, List<GameProfitLossDTO> gameRecords, List<ProfitLossGraphPoint> profitLossGraph) {
        this.username = username;
        this.winningGames = winningGames;
        this.losingGames = losingGames;
        this.gameRecords = gameRecords;
        this.profitLossGraph = profitLossGraph;
    }

    // Getters and setters (if needed)
}

package com.example.poker_traker.poker_traker.Entity;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class GameCreationDTO {

    // totalRake와 players에 대한 Getters와 Setters
    private int totalRake;
    private List<PlayerPnL> players;

    @Setter
    @Getter
    public static class PlayerPnL {
        // Getters와 Setters
        private String username;
        private int profitLoss;

    }

}


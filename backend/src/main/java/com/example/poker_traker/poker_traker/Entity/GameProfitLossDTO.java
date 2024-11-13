package com.example.poker_traker.poker_traker.Entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class GameProfitLossDTO {
    private LocalDateTime gameDate;
    private int profitLoss;

    // Constructor, getters, and setters
}


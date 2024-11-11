package com.example.poker_traker.poker_traker.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@AllArgsConstructor
@Getter
@Setter
public class ProfitLossGraphPoint {
    private LocalDateTime date;
    private int cumulativeProfitLoss;

    // Constructor, getters, and setters
}

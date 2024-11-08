package com.example.poker_traker.poker_traker.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Game_Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(nullable = false)
    private int profitLoss;
}


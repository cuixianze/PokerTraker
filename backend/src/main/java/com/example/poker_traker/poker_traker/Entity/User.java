package com.example.poker_traker.poker_traker.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private int totalPnL;

    @Column(nullable = false)
    private int winningGames = 0; // 승리 게임 수

    @Column(nullable = false)
    private int losingGames = 0; // 패배 게임 수
}

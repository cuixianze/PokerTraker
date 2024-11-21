package com.example.poker_traker.poker_traker.Entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime gameDate = LocalDateTime.now();

    @Column(nullable = false)
    private int totalRake;

    @ManyToOne
    @JoinColumn(name = "shark", nullable = false)
    private User shark;

    @ManyToOne
    @JoinColumn(name = "fish", nullable = false)
    private User fish;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Game_Player> players = new ArrayList<>();
}

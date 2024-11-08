package com.example.poker_traker.poker_traker.Repository;


import com.example.poker_traker.poker_traker.Entity.Game_Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GamePlayerRepository extends JpaRepository<Game_Player, Long> {

    // Find all players with their PnL for a specific game
    @Query("SELECT gp FROM Game_Player gp WHERE gp.game.id = :gameId")
    List<Game_Player> findByGameId(@Param("gameId") Long gameId);
}

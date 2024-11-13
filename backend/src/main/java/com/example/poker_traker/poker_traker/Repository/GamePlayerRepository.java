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

    // Retrieve all games for a user, ordered by game date (used for graph and detailed records)
    @Query("SELECT gp FROM Game_Player gp WHERE gp.user.username = :username ORDER BY gp.game.gameDate ASC")
    List<Game_Player> findByUsernameOrderedByDate(@Param("username") String username);

    // Calculate total games and winning games for a user to support win rate calculation
    @Query("SELECT COUNT(gp), SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) " +
            "FROM Game_Player gp WHERE gp.user.username = :username")
    List<Object[]> findGameCountsAndWinsByUsername(@Param("username") String username);
}

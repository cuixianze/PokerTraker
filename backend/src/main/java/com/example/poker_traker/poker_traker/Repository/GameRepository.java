package com.example.poker_traker.poker_traker.Repository;

import com.example.poker_traker.poker_traker.Entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    // Total rake for the specified month
    @Query("SELECT SUM(g.totalRake) " +
            "FROM Game g " +
            "WHERE EXTRACT(MONTH FROM g.gameDate) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.gameDate) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP))")
    Integer findTotalRakeForMonth(@Param("date") LocalDateTime date);

    // Top profit for the specified month (Shark)
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalProfit, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN gp.game g " +
            "WHERE EXTRACT(MONTH FROM g.gameDate) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.gameDate) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY totalProfit DESC")
    List<Object[]> findTopSharkForMonth(@Param("date") LocalDateTime date);

    // Top loss for the specified month (Fish)
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalLoss, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN gp.game g " +
            "WHERE EXTRACT(MONTH FROM g.gameDate) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.gameDate) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY totalLoss ASC")
    List<Object[]> findTopFishForMonth(@Param("date") LocalDateTime date);

    // All-time leaderboard - Top profit (Shark)
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalProfit, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY totalProfit DESC")
    List<Object[]> findTopAllTimeShark();

    // All-time leaderboard - Top loss (Fish)
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalLoss, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY totalLoss ASC")
    List<Object[]> findTopAllTimeFish();

    // All-time leaderboard - Top win rate
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalProfit, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY winRate DESC")
    List<Object[]> findTopAllTimeWinRate();

    // Monthly leaderboard - Top win rate
    @Query("SELECT gp.user.username, " +
            "SUM(gp.profitLoss) AS totalProfit, " +
            "COUNT(gp) AS totalGames, " +
            "SUM(CASE WHEN gp.profitLoss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN gp.game g " +
            "WHERE EXTRACT(MONTH FROM g.gameDate) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.gameDate) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY gp.user.id, gp.user.username " +
            "ORDER BY winRate DESC")
    List<Object[]> findTopWinRateForMonth(@Param("date") LocalDateTime date);

}

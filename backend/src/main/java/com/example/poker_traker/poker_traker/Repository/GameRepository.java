package com.example.poker_traker.poker_traker.Repository;

import com.example.poker_traker.poker_traker.Entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    // Total rake for the specified month
    @Query(value = "SELECT SUM(g.total_rake) FROM game g " +
            "WHERE EXTRACT(MONTH FROM g.game_date) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.game_date) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP))", nativeQuery = true)
    Integer findTotalRakeForMonth(@Param("date") LocalDateTime date);

    // Top profit for the specified month (Shark)
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalProfit, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN game g ON gp.game_id = g.id " +
            "JOIN users u ON gp.user_id = u.id " +
            "WHERE EXTRACT(MONTH FROM g.game_date) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.game_date) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY u.id, u.username ORDER BY totalProfit DESC", nativeQuery = true)
    List<Object[]> findTopSharkForMonth(@Param("date") LocalDateTime date);

    // Top loss for the specified month (Fish)
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalLoss, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN game g ON gp.game_id = g.id " +
            "JOIN users u ON gp.user_id = u.id " +
            "WHERE EXTRACT(MONTH FROM g.game_date) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.game_date) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY u.id, u.username ORDER BY totalLoss ASC", nativeQuery = true)
    List<Object[]> findTopFishForMonth(@Param("date") LocalDateTime date);

    // All-time leaderboard - Top profit (Shark)
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalProfit, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN users u ON gp.user_id = u.id " +
            "GROUP BY u.id, u.username ORDER BY totalProfit DESC", nativeQuery = true)
    List<Object[]> findTopAllTimeShark();

    // All-time leaderboard - Top loss (Fish)
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalLoss, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN users u ON gp.user_id = u.id " +
            "GROUP BY u.id, u.username ORDER BY totalLoss ASC", nativeQuery = true)
    List<Object[]> findTopAllTimeFish();

    // All-time leaderboard - Top win rate
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalProfit, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN users u ON gp.user_id = u.id " +
            "GROUP BY u.id, u.username ORDER BY winRate DESC", nativeQuery = true)
    List<Object[]> findTopAllTimeWinRate();

    // Monthly leaderboard - Top win rate
    @Query(value = "SELECT u.username, SUM(gp.profit_loss) AS totalProfit, COUNT(gp.id) AS totalGames, " +
            "SUM(CASE WHEN gp.profit_loss >= 0 THEN 1 ELSE 0 END) * 1.0 / COUNT(gp.id) AS winRate " +
            "FROM Game_Player gp " +
            "JOIN game g ON gp.game_id = g.id " +
            "JOIN users u ON gp.user_id = u.id " +
            "WHERE EXTRACT(MONTH FROM g.game_date) = EXTRACT(MONTH FROM CAST(:date AS TIMESTAMP)) " +
            "AND EXTRACT(YEAR FROM g.game_date) = EXTRACT(YEAR FROM CAST(:date AS TIMESTAMP)) " +
            "GROUP BY u.id, u.username ORDER BY winRate DESC", nativeQuery = true)
    List<Object[]> findTopWinRateForMonth(@Param("date") LocalDateTime date);
}

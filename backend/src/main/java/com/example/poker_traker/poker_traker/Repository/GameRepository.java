package com.example.poker_traker.poker_traker.Repository;


import com.example.poker_traker.poker_traker.Entity.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    // Pagination for game summaries
    Page<Game> findAll(Pageable pageable);

    // Total rake for the specified month
    @Query("SELECT SUM(g.totalRake) FROM Game g WHERE MONTH(g.gameDate) = MONTH(:date) AND YEAR(g.gameDate) = YEAR(:date)")
    Integer findTotalRakeForMonth(@Param("date") LocalDateTime date);

    // Top profit (Shark) for the specified month
    @Query("SELECT gp.user.username, SUM(gp.profitLoss) AS totalProfit FROM Game_Player gp " +
            "JOIN gp.game g WHERE MONTH(g.gameDate) = MONTH(:date) AND YEAR(g.gameDate) = YEAR(:date) " +
            "GROUP BY gp.user.id ORDER BY totalProfit DESC")
    List<Object[]> findTopSharkForMonth(@Param("date") LocalDateTime date);

    // Top loss (Fish) for the specified month
    @Query("SELECT gp.user.username, SUM(gp.profitLoss) AS totalLoss FROM Game_Player gp " +
            "JOIN gp.game g WHERE MONTH(g.gameDate) = MONTH(:date) AND YEAR(g.gameDate) = YEAR(:date) " +
            "GROUP BY gp.user.id ORDER BY totalLoss ASC")
    List<Object[]> findTopFishForMonth(@Param("date") LocalDateTime date);
}

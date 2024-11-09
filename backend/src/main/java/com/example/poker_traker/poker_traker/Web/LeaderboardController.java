package com.example.poker_traker.poker_traker.Web;

import com.example.poker_traker.poker_traker.Service.GamePlayerService;
import com.example.poker_traker.poker_traker.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {

    private final GameService gameService;

    @Autowired
    public LeaderboardController(GameService gameService) {
        this.gameService = gameService;
    }

    // Endpoint for monthly profit (Shark) leaderboard
    @GetMapping("/monthly/shark")
    public ResponseEntity<List<Object[]>> getTopMonthlyShark(@RequestParam String month) {
        LocalDateTime date = LocalDateTime.parse(month + "-01T00:00:00");
        return ResponseEntity.ok(gameService.getTopSharkForMonth(date));
    }

    // Endpoint for monthly loss (Fish) leaderboard
    @GetMapping("/monthly/fish")
    public ResponseEntity<List<Object[]>> getTopMonthlyFish(@RequestParam String month) {
        LocalDateTime date = LocalDateTime.parse(month + "-01T00:00:00");
        return ResponseEntity.ok(gameService.getTopFishForMonth(date));
    }

    // Endpoint for all-time profit (Shark) leaderboard
    @GetMapping("/all-time/shark")
    public ResponseEntity<List<Object[]>> getTopAllTimeShark() {
        return ResponseEntity.ok(gameService.getTopAllTimeShark());
    }

    // Endpoint for all-time loss (Fish) leaderboard
    @GetMapping("/all-time/fish")
    public ResponseEntity<List<Object[]>> getTopAllTimeFish() {
        return ResponseEntity.ok(gameService.getTopAllTimeFish());
    }
}

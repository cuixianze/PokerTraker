package com.example.poker_traker.poker_traker.Web;


import com.example.poker_traker.poker_traker.Entity.Game;
import com.example.poker_traker.poker_traker.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main")
public class MainPageController {

    private final GameService gameService;

    @Autowired
    public MainPageController(GameService gameService) {
        this.gameService = gameService;
    }

    // Endpoint to get paginated game summaries
    @GetMapping("/games")
    public ResponseEntity<Page<Game>> getGameSummaries(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Game> games = gameService.getAllGames(pageable);
        return ResponseEntity.ok(games);
    }

    // Endpoint to get monthly statistics (Shark, Fish, Rake)
    @GetMapping("/monthlyStats")
    public ResponseEntity<Map<String, Object>> getMonthlyStatistics(@RequestParam String month) {
        LocalDateTime date = LocalDateTime.parse(month + "-01T00:00:00");

        List<Object[]> sharkOfMonth = gameService.getTopSharkForMonth(date);
        List<Object[]> fishOfMonth = gameService.getTopFishForMonth(date);
        Integer totalRakeForMonth = gameService.getTotalRakeForMonth(date);

        Map<String, Object> response = Map.of(
                "sharkOfMonth", sharkOfMonth.isEmpty() ? null : sharkOfMonth.get(0),
                "fishOfMonth", fishOfMonth.isEmpty() ? null : fishOfMonth.get(0),
                "totalRakeForMonth", totalRakeForMonth
        );

        return ResponseEntity.ok(response);
    }
}

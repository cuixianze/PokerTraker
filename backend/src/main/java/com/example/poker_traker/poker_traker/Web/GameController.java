package com.example.poker_traker.poker_traker.Web;


import com.example.poker_traker.poker_traker.Entity.Game;
import com.example.poker_traker.poker_traker.Entity.Game_Player;
import com.example.poker_traker.poker_traker.Service.GameService;
import com.example.poker_traker.poker_traker.Service.GamePlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;
    private final GamePlayerService gamePlayerService;

    @Autowired
    public GameController(GameService gameService, GamePlayerService gamePlayerService) {
        this.gameService = gameService;
        this.gamePlayerService = gamePlayerService;
    }



    // Endpoint to get details of a specific game, including participants' PnL
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getGameDetails(@PathVariable Long id) {
        // Get the game details by ID
        Game game = gameService.getGameById(id).orElseThrow(() -> new RuntimeException("Game not found"));

        // Get the list of players with their PnL for this game
        List<Game_Player> playersPnL = gamePlayerService.getGamePlayersByGameId(id);

        // Prepare the response data
        Map<String, Object> response = Map.of(
                "gameId", game.getId(),
                "rake", game.getTotalRake(),
                "shark", game.getShark(),
                "fish", game.getFish(),
                "players", playersPnL
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeGame(@PathVariable Long id){
        gameService.removeGameById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}


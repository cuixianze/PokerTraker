package com.example.poker_traker.poker_traker.Web;


import com.example.poker_traker.poker_traker.Entity.Game;
import com.example.poker_traker.poker_traker.Entity.GameCreationDTO;
import com.example.poker_traker.poker_traker.Entity.Game_Player;
import com.example.poker_traker.poker_traker.Entity.User;
import com.example.poker_traker.poker_traker.Service.GamePlayerService;
import com.example.poker_traker.poker_traker.Service.GameService;
import com.example.poker_traker.poker_traker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/create")
public class CreateController {

    private final UserService userService;
    private final GameService gameService;
    private final GamePlayerService gamePlayerService;

    @Autowired
    public CreateController(UserService userService, GameService gameService, GamePlayerService gamePlayerService) {
        this.userService = userService;
        this.gameService = gameService;
        this.gamePlayerService = gamePlayerService;
    }

    // Endpoint to create a new User
    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userService.usernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body(null); // Optionally, add an error message
        }
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }



    @PostMapping("/gameWithPlayers")
    public ResponseEntity<String> createGameWithPlayers(@RequestBody GameCreationDTO request) {
        // Step 1: Find Shark and Fish from the player list based on profit/loss
        Optional<GameCreationDTO.PlayerPnL> shark = request.getPlayers().stream()
                .max(Comparator.comparingInt(GameCreationDTO.PlayerPnL::getProfitLoss));

        Optional<GameCreationDTO.PlayerPnL> fish = request.getPlayers().stream()
                .min(Comparator.comparingInt(GameCreationDTO.PlayerPnL::getProfitLoss));

        if (shark.isEmpty() || fish.isEmpty()) {
            return ResponseEntity.badRequest().body("Shark or fish could not be determined.");
        }

        // Retrieve User entities for shark and fish
        User sharkUser = userService.getUserByUsername(shark.get().getUsername())
                .orElseThrow(() -> new RuntimeException("Shark user not found"));
        User fishUser = userService.getUserByUsername(fish.get().getUsername())
                .orElseThrow(() -> new RuntimeException("Fish user not found"));

        // Step 2: Create the Game with identified Shark and Fish
        Game game = new Game();
        game.setTotalRake(request.getTotalRake());
        game.setShark(sharkUser);
        game.setFish(fishUser);
        Game savedGame = gameService.createGame(game);

        // Step 3: Create Game_Player entries for each player in the request
        List<Game_Player> gamePlayers = new ArrayList<>();
        for (GameCreationDTO.PlayerPnL playerData : request.getPlayers()) {
            User user = userService.getUserByUsername(playerData.getUsername())
                    .orElseThrow(() -> new RuntimeException("User " + playerData.getUsername() + " not found"));

            // Update the user's PnL
            user.setTotalPnL(user.getTotalPnL() + playerData.getProfitLoss());

            // Increment winning or losing games based on profit/loss
            if (playerData.getProfitLoss() >= 0) {
                user.setWinningGames(user.getWinningGames() + 1);
            } else {
                user.setLosingGames(user.getLosingGames() + 1);
            }

            // Create and save Game_Player entry
            Game_Player gamePlayer = new Game_Player();
            gamePlayer.setUser(user);
            gamePlayer.setGame(savedGame);
            gamePlayer.setProfitLoss(playerData.getProfitLoss());
            gamePlayers.add(gamePlayerService.createGamePlayer(gamePlayer));

            // Save updated user
            userService.updateUser(user);
        }

        return ResponseEntity.ok("Game and players created successfully with Game ID: " + savedGame.getId());
    }

}

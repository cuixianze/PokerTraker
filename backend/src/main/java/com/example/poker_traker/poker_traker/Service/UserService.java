package com.example.poker_traker.poker_traker.Service;

import com.example.poker_traker.poker_traker.Entity.*;
import com.example.poker_traker.poker_traker.Repository.GamePlayerRepository;
import com.example.poker_traker.poker_traker.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final GamePlayerRepository gamePlayerRepository;

    @Autowired
    public UserService(UserRepository userRepository, GamePlayerRepository gamePlayerRepository) {
        this.userRepository = userRepository;
        this.gamePlayerRepository = gamePlayerRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public UserDetailDTO getUserDetails(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get game records for the user
        List<Game_Player> gamePlayers = gamePlayerRepository.findByUsernameOrderedByDate(username);

        int totalGames = gamePlayers.size();
        int winningGames = (int) gamePlayers.stream().filter(gp -> gp.getProfitLoss() >= 0).count();
        int losingGames = totalGames - winningGames;

        // Build lists for game records and cumulative profit/loss graph
        List<GameProfitLossDTO> gameRecords = new ArrayList<>();
        List<ProfitLossGraphPoint> profitLossGraph = new ArrayList<>();
        int cumulativeProfitLoss = 0;

        for (Game_Player gp : gamePlayers) {
            // Record individual game profit/loss
            gameRecords.add(new GameProfitLossDTO(gp.getGame().getGameDate(), gp.getProfitLoss()));

            // Update cumulative profit/loss for graphing
            cumulativeProfitLoss += gp.getProfitLoss();
            profitLossGraph.add(new ProfitLossGraphPoint(gp.getGame().getGameDate(), cumulativeProfitLoss));
        }

        return new UserDetailDTO(username, winningGames, losingGames, gameRecords, profitLossGraph);
    }



    // Other methods...
}

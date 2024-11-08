package com.example.poker_traker.poker_traker.Service;


import com.example.poker_traker.poker_traker.Entity.Game_Player;
import com.example.poker_traker.poker_traker.Repository.GamePlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GamePlayerService {

    private final GamePlayerRepository gamePlayerRepository;

    @Autowired
    public GamePlayerService(GamePlayerRepository gamePlayerRepository) {
        this.gamePlayerRepository = gamePlayerRepository;
    }

    public List<Game_Player> getGamePlayersByGameId(Long gameId) {
        return gamePlayerRepository.findByGameId(gameId);
    }

    public Game_Player createGamePlayer(Game_Player gamePlayerRequest) {
        return gamePlayerRepository.save(gamePlayerRequest);
    }
}

package com.example.poker_traker.poker_traker.Service;


import com.example.poker_traker.poker_traker.Entity.Game;
import com.example.poker_traker.poker_traker.Repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Page<Game> getAllGames(Pageable pageable) {
        return gameRepository.findAll(pageable);
    }

    public Integer getTotalRakeForMonth(LocalDateTime date) {
        return gameRepository.findTotalRakeForMonth(date);
    }

    public List<Object[]> getTopSharkForMonth(LocalDateTime date) {
        return gameRepository.findTopSharkForMonth(date);
    }

    public List<Object[]> getTopFishForMonth(LocalDateTime date) {
        return gameRepository.findTopFishForMonth(date);
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }
}

package com.example.poker_traker.poker_traker.Service;

import com.example.poker_traker.poker_traker.Entity.LeaderboardDTO;
import com.example.poker_traker.poker_traker.Entity.Game;
import com.example.poker_traker.poker_traker.Entity.GameSummaryDTO;
import com.example.poker_traker.poker_traker.Repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Page<GameSummaryDTO> getAllGameSummaries(Pageable pageable) {
        Page<Game> games = gameRepository.findAll(pageable);

        // Game 엔티티를 GameSummaryDTO로 변환
        return new PageImpl<>(
                games.getContent().stream()
                        .map(game -> new GameSummaryDTO(
                                game.getId(),
                                game.getGameDate(),
                                game.getTotalRake(),
                                game.getShark().getUsername(),
                                game.getFish().getUsername()
                        ))
                        .collect(Collectors.toList()),
                pageable,
                games.getTotalElements()
        );
    }

    public Integer getTotalRakeForMonth(LocalDateTime date) {
        return gameRepository.findTotalRakeForMonth(date);
    }

    public List<LeaderboardDTO> getTopSharkForMonth(LocalDateTime date) {
        return gameRepository.findTopSharkForMonth(date).stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public List<LeaderboardDTO> getTopFishForMonth(LocalDateTime date) {
        return gameRepository.findTopFishForMonth(date).stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public List<LeaderboardDTO> getTopAllTimeShark() {
        return gameRepository.findTopAllTimeShark().stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public List<LeaderboardDTO> getTopAllTimeFish() {
        return gameRepository.findTopAllTimeFish().stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public List<LeaderboardDTO> getTopAllTimeWinRate() {
        return gameRepository.findTopAllTimeWinRate().stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public List<LeaderboardDTO> getTopWinRateForMonth(LocalDateTime date) {
        return gameRepository.findTopWinRateForMonth(date).stream()
                .map(data -> new LeaderboardDTO(
                        (String) data[0],
                        ((Number) data[1]).intValue(),
                        ((Number) data[3]).doubleValue(),
                        ((Number) data[2]).intValue()
                ))
                .collect(Collectors.toList());
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    public void removeGameById(Long id){ gameRepository.deleteById(id);}
}

package com.example.poker_traker.poker_traker.Service;

import com.example.poker_traker.poker_traker.Entity.*;
import com.example.poker_traker.poker_traker.Repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final GamePlayerService gamePlayerService; // Game_Player 관리 서비스 추가
    private final UserService userService; // User 관리 서비스 추가

    @Autowired
    public GameService(GameRepository gameRepository, GamePlayerService gamePlayerService, UserService userService) {
        this.gameRepository = gameRepository;
        this.gamePlayerService = gamePlayerService;
        this.userService = userService;
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Page<GameSummaryDTO> getAllGameSummaries(Pageable pageable) {
        Page<Game> games = gameRepository.findAllByOrderByGameDateDesc(pageable);

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

    @Transactional
    public void removeGameById(Long gameId) {
        // 게임 데이터를 가져옵니다.
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        // 게임 플레이어 데이터를 가져옵니다.
        List<Game_Player> gamePlayers = gamePlayerService.getGamePlayersByGameId(gameId);

        // 각 플레이어의 기록을 업데이트합니다.
        for (Game_Player gamePlayer : gamePlayers) {
            User user = gamePlayer.getUser();
            int profitLoss = gamePlayer.getProfitLoss();

            // totalPnL 업데이트
            user.setTotalPnL(user.getTotalPnL() - profitLoss);

            // 승리/패배 게임 수 업데이트
            if (profitLoss > 0) {
                user.setWinningGames(user.getWinningGames() - 1);
            } else {
                user.setLosingGames(user.getLosingGames() - 1);
            }

            // 변경된 사용자 데이터를 저장합니다.
            userService.updateUser(user);
        }

        // 게임 데이터를 삭제합니다.
        gameRepository.deleteById(gameId);
    }
}

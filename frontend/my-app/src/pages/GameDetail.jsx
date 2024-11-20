import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function GameDetail() {
  const { id } = useParams(); // Fetch the game ID from the URL
  const [gameDetail, setGameDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch game details by game ID
    axios
      .get(
        `https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/games/${id}`
      )
      .then((response) => {
        setGameDetail(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch game details.");
      });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!gameDetail) return <p>Loading...</p>;

  // Destructure necessary fields from gameDetail for easier access
  const { gameDate, rake, shark, fish, players } = gameDetail;

  return (
    <div className="game-detail">
      <h2>Game Details</h2>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(players[0].game.gameDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Total Rake:</strong> {rake}
      </p>
      <div className="shark-fish-info">
        <p>
          <strong>Shark:</strong> {shark.username}{" "}
        </p>
        <p>
          <strong>Fish:</strong> {fish.username}{" "}
        </p>
      </div>

      <h3>Player Profit/Loss</h3>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="player-info">
            <p>
              <strong>Player:</strong> {player.user.username}
            </p>
            <p>
              <strong>Profit/Loss:</strong> {player.profitLoss}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameDetail;

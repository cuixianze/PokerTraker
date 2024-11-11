import React, { useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";

function GameCreationForm() {
  const [totalRake, setTotalRake] = useState(""); // Start with an empty string
  const [players, setPlayers] = useState([{ username: "", profitLoss: "" }]); // Default profitLoss is empty
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddPlayer = () => {
    setPlayers([...players, { username: "", profitLoss: "" }]); // Add new player with empty profitLoss
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare game data with number conversion for empty fields
    const gameData = {
      totalRake: totalRake === "" ? 0 : Number(totalRake),
      players: players.map((player) => ({
        username: player.username,
        profitLoss: player.profitLoss === "" ? 0 : Number(player.profitLoss),
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/create/gameWithPlayers",
        gameData
      );
      setResponseMessage("Game created successfully");
      setTotalRake(""); // Reset to empty after submission
      setPlayers([{ username: "", profitLoss: "" }]);
    } catch (error) {
      setResponseMessage("Error creating game. Please try again.");
    }
  };

  return (
    <div className="common">
      <Navbar />
      <h2>Create New Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Total Rake:</label>
          <input
            type="number"
            value={totalRake}
            onChange={(e) => setTotalRake(e.target.value)} // No conversion until submit
            required
          />
        </div>

        <h3>Players</h3>
        {players.map((player, index) => (
          <div key={index} className="player-input">
            <label>Username:</label>
            <input
              type="text"
              value={player.username}
              onChange={(e) =>
                handlePlayerChange(index, "username", e.target.value)
              }
              required
            />
            <label>Profit/Loss:</label>
            <input
              type="number"
              value={player.profitLoss}
              onChange={(e) =>
                handlePlayerChange(index, "profitLoss", e.target.value)
              } // No conversion until submit
              required
            />
          </div>
        ))}

        <button type="button" onClick={handleAddPlayer}>
          Add Player
        </button>
        <button type="submit">Create Game</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default GameCreationForm;

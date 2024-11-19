import React, { useState } from "react";
import iphone2 from "../images/iphone2.png";
import axios from "axios";
import Navbar from "../component/Navbar";
import Copyright from "../component/copyright";

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
        "https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/create/gameWithPlayers",
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
      <div className="create_game_container">
        <div className="create_game_box">
          <div className="create_game_title">
            <h2 className="create_game_box_h2">Create New Game</h2>
            <button
              type="button"
              onClick={handleAddPlayer}
              className="create_game_playerBtn"
            >
              Add Player
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="create_game_box_label">Total Rake:</label>
              <input
                className="player-input"
                type="number"
                value={totalRake}
                onChange={(e) => setTotalRake(e.target.value)} // No conversion until submit
                required
              />
            </div>
            <div className="create_game_box_players">
              <h3 className="create_game_box_h2">Players</h3>
              {players.map((player, index) => (
                <div key={index}>
                  <label className="create_game_box_label">Username:</label>
                  <input
                    className="player-input"
                    type="text"
                    value={player.username}
                    onChange={(e) =>
                      handlePlayerChange(index, "username", e.target.value)
                    }
                    required
                  />
                  <label className="create_game_box_label">Profit/Loss:</label>
                  <input
                    className="player-input"
                    type="number"
                    value={player.profitLoss}
                    onChange={(e) =>
                      handlePlayerChange(index, "profitLoss", e.target.value)
                    } // No conversion until submit
                    required
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="create_game_addBtn">
              Add Current Session
            </button>
          </form>

          {responseMessage && <p>{responseMessage}</p>}
        </div>
        <div className="game_create_promotionBox"></div>
      </div>
      <Copyright />
    </div>
  );
}

export default GameCreationForm;

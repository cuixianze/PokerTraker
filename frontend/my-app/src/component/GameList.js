import React from 'react';
import { Link } from 'react-router-dom';

function GameList({ games }) {
  return (
    <div className="game-list">
      <h3>Game List</h3>
      <ul>
        {games.map(game => (
          <li key={game.id} className="game-item">
            <p>Date: {new Date(game.gameDate).toLocaleString()}</p>
            <p>Total Rake: {game.totalRake}</p>
            <p>Shark: {game.sharkUsername}</p>
            <p>Fish: {game.fishUsername}</p>
            <Link to={`/games/${game.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;

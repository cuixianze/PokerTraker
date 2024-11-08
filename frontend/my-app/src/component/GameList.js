import React from 'react';

function GameList({ games }) {
  return (
    <div className="game-list">
      <h3>Game List</h3>
      <ul>
        {games.map(game => (
          <li key={game.id} className="game-item">
            <p>Date: {new Date(game.gameDate).toLocaleString()}</p>
            <p>Total Rake: {game.totalRake}</p>
            <p>Shark: {game.shark.username}</p>
            <p>Fish: {game.fish.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;

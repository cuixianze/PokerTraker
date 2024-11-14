import React from "react";
import { Link } from "react-router-dom";
import "../css/gameList.css";

function GameList({ games }) {
  return (
    <div className="gameList">
      <div className="gameList_title">
        <h3 className="gameList_h3">Game Review</h3>
      </div>
      <table>
        <thead>
          <tr className="gameList_tr">
            <th className="gameList_th">Date</th>
            <th className="gameList_th">Total Rake</th>
            <th className="gameList_th">Shark</th>
            <th className="gameList_th">Fish</th>
            <th className="gameList_th">Details</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="game-item">
              <td className="gameList_td">
                {new Date(game.gameDate).toLocaleString()}
              </td>
              <td className="gameList_td">{game.totalRake}</td>
              <td className="gameList_td">{game.sharkUsername}</td>
              <td className="gameList_td">{game.fishUsername}</td>
              <td className="gameList_td">
                <Link to={`/games/${game.id}`} className="gameList_td">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameList;

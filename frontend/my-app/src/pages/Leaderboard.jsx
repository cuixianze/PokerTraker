import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../css/leaderBoard.css";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortType, setSortType] = useState("profit"); // Default sort by profit
  const [timeRange, setTimeRange] = useState("all-time"); // Default to all-time
  const [error, setError] = useState(null);
  const currentMonth = new Date().toISOString().slice(0, 7);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (timeRange === "all-time") {
          url =
            sortType === "profit"
              ? "http://localhost:8080/leaderboard/all-time/shark"
              : sortType === "loss"
              ? "http://localhost:8080/leaderboard/all-time/fish"
              : "http://localhost:8080/leaderboard/all-time/winrate";
        } else {
          url =
            sortType === "profit"
              ? `http://localhost:8080/leaderboard/monthly/shark?month=${currentMonth}`
              : sortType === "loss"
              ? `http://localhost:8080/leaderboard/monthly/fish?month=${currentMonth}`
              : `http://localhost:8080/leaderboard/monthly/winrate?month=${currentMonth}`;
        }

        const response = await axios.get(url);
        setLeaderboardData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch leaderboard data. Please try again.");
      }
    };

    fetchData();
  }, [timeRange, sortType, currentMonth]);

  return (
    <div className="common">
      <Navbar />

      <div className="controls">
        <label>
          Time Range:
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="all-time">All-Time</option>
            <option value="monthly">This Month</option>
          </select>
        </label>
        <div className="sort-options">
          <button
            onClick={() => setSortType("profit")}
            className={sortType === "profit" ? "active" : ""}
          >
            Sort by Profit
          </button>
          <button
            onClick={() => setSortType("loss")}
            className={sortType === "loss" ? "active" : ""}
          >
            Sort by Loss
          </button>
          <button
            onClick={() => setSortType("winRate")}
            className={sortType === "winRate" ? "active" : ""}
          >
            Sort by Win Rate
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Total Profit</th>
            <th>Win Rate</th>
            <th>Total Games</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/user/${user.username}`}>{user.username}</Link>
              </td>
              <td>{user.totalProfit}</td>
              <td>{Math.round(user.winRate * 100)}%</td>
              <td>{user.totalGames}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Copyright from "../component/copyright";
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
              ? "http://13.239.32.249:8080/leaderboard/all-time/shark"
              : sortType === "loss"
              ? "http://13.239.32.249:8080/leaderboard/all-time/fish"
              : "http://13.239.32.249:8080/leaderboard/all-time/winrate";
        } else {
          url =
            sortType === "profit"
              ? `http://13.239.32.249:8080/leaderboard/monthly/shark?month=${currentMonth}`
              : sortType === "loss"
              ? `http://13.239.32.249:8080/leaderboard/monthly/fish?month=${currentMonth}`
              : `http://13.239.32.249:8080/leaderboard/monthly/winrate?month=${currentMonth}`;
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
      <div className="leaderboard_container">
        <div className="board_box">
          <div className="board_controller">
            <div className="board_controller_title">
              <div className="fuck">
                <div className="fuckfuck">LeaderBoard</div>
                <label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="all-time">All-Time</option>
                    <option value="monthly">This Month</option>
                  </select>
                </label>
              </div>
              <div className="sort-options">
                <button
                  onClick={() => setSortType("profit")}
                  className={
                    sortType === "profit"
                      ? "button profit-button active"
                      : "button profit-button"
                  }
                >
                  Sort by Profit
                </button>
                <button
                  onClick={() => setSortType("loss")}
                  className={
                    sortType === "loss"
                      ? "button profit-button active"
                      : "button profit-button"
                  }
                >
                  Sort by Loss
                </button>
                <button
                  onClick={() => setSortType("winRate")}
                  className={
                    sortType === "winRate"
                      ? "button profit-button active"
                      : "button profit-button"
                  }
                >
                  Sort by Win Rate
                </button>
              </div>
            </div>
            <div className="board_table">
              <table className="leaderboard_table">
                <thead>
                  <tr>
                    <th className="board_table_th">Username</th>
                    <th className="board_table_th">Total Profit</th>
                    <th className="board_table_th">Win Rate</th>
                    <th className="board_table_th">Total Games</th>
                  </tr>
                </thead>
                <tbody className="board_body">
                  {leaderboardData.map((user, index) => (
                    <tr key={index} className="board_table_tr">
                      <td>
                        <Link
                          to={`/user/${user.username}`}
                          className="board_table_link"
                        >
                          {user.username}
                        </Link>
                      </td>
                      <td className="board_table_td">{user.totalProfit}</td>
                      <td className="board_table_td">
                        {Math.round(user.winRate * 100)}%
                      </td>
                      <td className="board_table_td">{user.totalGames}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <Copyright />
    </div>
  );
}

export default Leaderboard;

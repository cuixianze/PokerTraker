import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortType, setSortType] = useState('profit'); // Default sort by profit
  const [timeRange, setTimeRange] = useState('all-time'); // Default to all-time
  const [error, setError] = useState(null);

  // Get the current month in YYYY-MM format
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch leaderboard data based on selected options
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';

        // Determine URL based on selected time range and sort type
        if (timeRange === 'all-time') {
          url = sortType === 'profit'
            ? 'http://localhost:8080/leaderboard/all-time/shark'
            : 'http://localhost:8080/leaderboard/all-time/fish';
        } else {
          url = sortType === 'profit'
            ? `http://localhost:8080/leaderboard/monthly/shark?month=${currentMonth}`
            : `http://localhost:8080/leaderboard/monthly/fish?month=${currentMonth}`;
        }

        const response = await axios.get(url);
        setLeaderboardData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leaderboard data. Please try again.');
      }
    };

    fetchData();
  }, [timeRange, sortType, currentMonth]);

  return (
    <div className="leaderboard">
      <h2>User Leaderboard</h2>

      <div className="controls">
        {/* Time Range Selection */}
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

        {/* Sorting Options */}
        <div className="sort-options">
          <button
            onClick={() => setSortType('profit')}
            className={sortType === 'profit' ? 'active' : ''}
          >
            Sort by Profit
          </button>
          <button
            onClick={() => setSortType('loss')}
            className={sortType === 'loss' ? 'active' : ''}
          >
            Sort by Loss
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>{sortType === 'profit' ? 'Total Profit' : 'Total Loss'}</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{user[0]}</td> {/* Username */}
              <td>{user[1]}</td> {/* Total Profit or Loss */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;

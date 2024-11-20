import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const UserDetail = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://xn--hj2bu55bba230b7ub.xn--oi2b61z32a.xn--3e0b707e/user/${username}/details`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>No user data found.</p>;

  // Get total profit from the last game
  const totalProfit =
    userData.gameRecords.length > 0
      ? userData.gameRecords[userData.gameRecords.length - 1].profitLoss
      : 0;

  // Calculate win rate
  const totalGames = userData.winningGames + userData.losingGames;
  const winRate =
    totalGames > 0 ? (userData.winningGames / totalGames) * 100 : 0;

  // Prepare data for the chart
  const chartData = {
    labels: userData.profitLossGraph.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Cumulative Profit/Loss",
        data: userData.profitLossGraph.map(
          (entry) => entry.cumulativeProfitLoss
        ),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Cumulative Profit/Loss Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cumulative Profit/Loss ($)",
        },
      },
    },
  };

  return (
    <div>
      <h2>User Details</h2>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Total Games:</strong> {totalGames}
      </p>
      <p>
        <strong>Total Profit:</strong> ${totalProfit}
      </p>
      <p>
        <strong>Win Rate:</strong> {winRate.toFixed(2)}%
      </p>

      <div style={{ width: "600px", marginTop: "20px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UserDetail;

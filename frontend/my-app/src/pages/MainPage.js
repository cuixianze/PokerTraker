import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SharkFish from '../component/SharkFish';
import TotalRake from '../component/TotalRake';
import GameList from '../component/GameList';

function MainPage() {
  const [sharkFishData, setSharkFishData] = useState(null);
  const [totalRake, setTotalRake] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for Shark, Fish, and Total Rake using Axios
    axios.get('http://localhost:8080/main/monthlyStats', {
      params: { month: '2024-11' }
    })
      .then(response => {
        const data = response.data;
        setSharkFishData({
          shark: data.sharkOfMonth?.[0] || 'No Data',
          fish: data.fishOfMonth?.[0]|| 'No Data'
        });
        setTotalRake(data.totalRakeForMonth || 0);
      })
      .catch(error => setError(error.message));

    // Fetch paginated game list using Axios
    axios.get('http://localhost:8080/main/games')
      .then(response => {
        setGameList(response.data.content || []);
      })
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="main-page">
      <h2>Main Page</h2>
      {error && <p className="error">Error: {error}</p>}
      {sharkFishData && <SharkFish shark={sharkFishData.shark} fish={sharkFishData.fish} />}
      <TotalRake totalRake={totalRake} />
      <GameList games={gameList} />
    </div>
  );
}

export default MainPage;

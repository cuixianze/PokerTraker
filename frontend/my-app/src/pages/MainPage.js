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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch data for Shark, Fish, and Total Rake
    axios.get('http://localhost:8080/main/monthlyStats', {
      params: { month: '2024-11' }
    })
      .then(response => {
        const data = response.data;
        setSharkFishData({
          shark: data.sharkOfMonth?.[0] || 'No Data',
          fish: data.fishOfMonth?.[0] || 'No Data'
        });
        setTotalRake(data.totalRakeForMonth || 0);
      })
      .catch(error => setError(error.message));

    // Fetch paginated game list
    fetchGames(page);
  }, [page]);

  const fetchGames = (page) => {
    axios.get('http://localhost:8080/main/games', {
      params: { page, size: 10 }
    })
      .then(response => {
        setGameList(response.data.content || []);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => setError(error.message));
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="main-page">
      <h2>Main Page</h2>
      {error && <p className="error">Error: {error}</p>}
      {sharkFishData && <SharkFish shark={sharkFishData.shark} fish={sharkFishData.fish} />}
      <TotalRake totalRake={totalRake} />
      <GameList games={gameList} />
      
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MainPage;

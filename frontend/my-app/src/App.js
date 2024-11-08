import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './component/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/leaderboard" element={<h2>User Leaderboard (coming soon)</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

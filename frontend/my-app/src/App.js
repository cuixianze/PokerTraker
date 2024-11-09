import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './component/Navbar';
import GameDetail from './pages/GameDetail';
import Leaderboard from './pages/Leaderboard';
import GameCreationForm from './pages/GameCreationForm';
import UserForm from './pages/UserForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/create-game" element={<GameCreationForm />} />
          <Route path="/create-user" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

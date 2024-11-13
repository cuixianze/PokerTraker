import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GameDetail from "./pages/GameDetail";
import Leaderboard from "./pages/Leaderboard";
import GameCreationForm from "./pages/GameCreationForm";
import UserForm from "./pages/UserForm";
import UserDetailPage from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-game" element={<GameCreationForm />} />
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/user/:username" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

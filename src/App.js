import React, { useState } from "react";
import "./App.css";
import DifficultySelection from "./components/DifficultySelection";
import Game from "./components/Game";
import Start from "./components/Start";

function App() {
  // Lưu trữ mức độ khó hiện tại của trò chơi
  const [difficulty, setDifficulty] = useState("");
  // Lưu trữ trạng thái hiện tại của trò chơi (Đã bắt đầu hay chưa)
  const [gameStarted, setGameStarted] = useState(false);
  // Lưu trữ điểm cao nhất của trò chơi
  const [highScore, setHighScore] = useState(() => {
    return localStorage.getItem("highScore") || 0;
  });

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const startGame = () => {
    setGameStarted(!gameStarted);
  };

  const endGame = (score) => {
    setGameStarted(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  };

  return (
    <div className="container">
      <h1>TƯ DUY TÍNH NHẨM</h1>
      {(!gameStarted && difficulty === "") && (
        <DifficultySelection onSelectDifficulty={handleDifficultySelection} />
      )}
      {(!gameStarted && difficulty !== "") && (
        <Start startGame={startGame} difficultyText={difficulty} onSelectDifficulty={handleDifficultySelection} />
      )}
      {(gameStarted && difficulty !== "") && <Game difficulty={difficulty} score onGameEnd={endGame} highScore={highScore} />}
    </div>
  );
}

export default App;

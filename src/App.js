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
  const [finalScore, setFinalScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setIsGameOver(false);
  };

  const startGame = () => {
    setGameStarted(!gameStarted);
    setIsGameOver(false);
  };

  const endGame = (score) => {
    setGameStarted(false);
    setFinalScore(score); // Cập nhật điểm số cuối cùng
    setIsGameOver(true); // Đánh dấu trò chơi đã kết thúc
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
      {!gameStarted && isGameOver && ( // Hiển thị điểm số cuối cùng khi trò chơi kết thúc
        <div>
          <h2>Trò chơi kết thúc! Điểm của bạn: {finalScore}</h2>
        </div>
      )}
    </div>
  );
}

export default App;

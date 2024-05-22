import React, { useState, useEffect } from "react";
import Question from "./Question";
import ScoreBoard from "./ScoreBoard";
import "./styles/GameStyle.css";

const difficultyMapping = {
  easy: "Dễ",
  medium: "Trung bình",
  decent: "Khá",
  "hard-1": "Khó loại 1",
  "hard-2": "Khó loại 2",
};

const Game = ({ difficulty, onGameEnd, highScore }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answer, setAnswer] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      onGameEnd(score);
    }
  }, [timeLeft, onGameEnd, score]);

  const generateQuestion = () => {
    let numberOfDigits;
    if (difficulty === "easy") {
      numberOfDigits = 1;
    } else if (difficulty === "medium") {
      numberOfDigits = Math.floor(Math.random() * 2) + 1;
    } else if (difficulty === "decent") {
      numberOfDigits = Math.floor(Math.random() * 2) + 2;
    } else if (difficulty === "hard-1") {
      numberOfDigits = Math.floor(Math.random() * 2) + 3;
    } else if (difficulty === "hard-2") {
      numberOfDigits = Math.floor(Math.random() * 2) + 4;
    }

    const maxNumber = Math.pow(10, numberOfDigits) - 1;
    const newNum1 = Math.floor(Math.random() * maxNumber) + 1;
    const newNum2 = Math.floor(Math.random() * maxNumber) + 1;
    const newOperator = Math.random() > 0.5 ? "+" : "-";

    if (newNum1 === newNum2) {
      setCorrectAnswer(
        newOperator === "+" ? newNum1 + newNum2 : newNum1 - newNum2
      );
    } else {
      if (newOperator === "+") {
        setNum1(newNum1);
        setNum2(newNum2);
        setCorrectAnswer(newNum1 + newNum2);
        setOperator(newOperator);
      } else {
        if (newNum1 < newNum2) {
          setNum1(newNum2);
          setNum2(newNum1);
          setCorrectAnswer(newNum2 - newNum1);
          setOperator(newOperator);
        } else {
          setNum1(newNum1);
          setNum2(newNum2);
          setCorrectAnswer(newNum1 - newNum2);
          setOperator(newOperator);
        }
      }
    }
  };

  const checkAnswer = () => {
    if (!gameOver && timeLeft > 0 && parseInt(answer, 10) === correctAnswer) {
      setScore(score + 1);
    }
    setAnswer("");
    generateQuestion();
  };

  const pauseGame = () => {
    setIsPaused(true);
  };

  const resumeGame = () => {
    setIsPaused(false);
  };

  return (
    <div id="game">
      <h3>Mức độ: {difficultyMapping[difficulty] || "Khó"}</h3>
      <Question num1={num1} num2={num2} operator={operator} />
      <input
        type="text"
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            checkAnswer();
          }
        }}
        placeholder="Nhập kết quả của bạn"
        disabled={gameOver || isPaused} // Ngăn người dùng nhập khi trò chơi kết thúc hoặc đang tạm dừng
      />
      {!gameOver &&
        timeLeft > 0 && ( // Thay đổi điều kiện hiển thị nút "Kiểm tra"
          <button onClick={checkAnswer}>Kiểm tra</button>
        )}
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <h3>Kỉ lục: {highScore} điểm</h3>
      {gameOver ? (
        <button onClick={resumeGame}>Chơi lại</button>
      ) : (
        <button onClick={isPaused ? resumeGame : pauseGame}>
          {isPaused ? "Tiếp tục" : "Tạm dừng"}
        </button>
      )}
    </div>
  );
};

export default Game;

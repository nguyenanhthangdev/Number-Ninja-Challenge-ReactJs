import React, { useState, useEffect } from 'react';
import "./styles/GameStyle.css";

function Game() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  let timer;

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';
    const correctAns = operator === '+' ? num1 + num2 : num1 - num2;
    setQuestion(`${num1} ${operator} ${num2}`);
    setCorrectAnswer(correctAns);
  };

  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
    }
    setAnswer('');
    generateQuestion();
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(60);
    generateQuestion();
  };

  const endGame = () => {
    setGameStarted(false);
    clearInterval(timer);
    alert(`Time's up! Your final score is ${score}`);
  };

  return (
    <div>
      <h1>TƯ DUY TÍNH NHẨM</h1>
      <div>
        <div>Điểm: {score}</div>
        <div>Thời gian còn lại: {timeLeft}s</div>
      </div>
      {gameStarted ? (
        <div>
          <div>Câu hỏi: {question}</div>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập kết quả của bạn"
          />
          <button onClick={checkAnswer}>Kiểm tra</button>
        </div>
      ) : (
        <button onClick={startGame}>Bắt đầu ngay</button>
      )}
    </div>
  );
}

export default Game;

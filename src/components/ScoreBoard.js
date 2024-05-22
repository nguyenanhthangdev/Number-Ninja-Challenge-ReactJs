import React from 'react';

const ScoreBoard = ({ score, timeLeft }) => {
  return (
    <div>
      <div id="score">Điểm: {score}</div>
      <div id="timer">Thời gian còn lại: {timeLeft}s</div>
    </div>
  );
};

export default ScoreBoard;

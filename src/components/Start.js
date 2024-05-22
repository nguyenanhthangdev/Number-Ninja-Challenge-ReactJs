import React from "react";

const difficultyMapping = {
  easy: "Dễ",
  medium: "Trung bình",
  decent: "Khá",
  "hard-1": "Khó loại 1",
  "hard-2": "Khó loại 2",
};

const Start = ({ startGame, difficultyText, onSelectDifficulty }) => {
  const displayedDifficulty = difficultyMapping[difficultyText] || "Khó";
  return (
    <div id="start-section">
      <h3>Mức độ: {displayedDifficulty}</h3>
      <button
        type="button"
        onClick={() => onSelectDifficulty("")}
        id="button-type-1"
      >
        Quay lại
      </button>
      <button type="button" onClick={startGame}>
        Bắt đầu ngay
      </button>
    </div>
  );
};

export default Start;

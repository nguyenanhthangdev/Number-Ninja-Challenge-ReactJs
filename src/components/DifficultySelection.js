import React from 'react';
import "./styles/DifficultySelection.css";

const DifficultySelection = ({onSelectDifficulty}) => {
    return (
        <div id="difficulty-selection">
            <button onClick={() => onSelectDifficulty('easy')} id="easy-button">Dễ</button>
            <button onClick={() => onSelectDifficulty('medium')} id="medium-button">Trung bình</button>
            <button onClick={() => onSelectDifficulty('decent')} id="decent-button">Khá</button>
            <button onClick={() => onSelectDifficulty('hard-1')} id="hard-1-button">Khó độ 1</button>
            <button onClick={() => onSelectDifficulty('hard-2')} id="hard-2-button">Khó độ 2</button>
        </div>
    );
};

export default DifficultySelection;
import React from "react";

const Question = ({ num1, num2, operator }) => {
  return (
    <div id="question">
      {num1} {operator} {num2}?
    </div>
  );
};

export default Question;

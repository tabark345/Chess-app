import React from "react";

const MoveHistory = ({ history }) => {
  return (
    <div className="move-history">
      <h3>📜 Move History</h3>
      <ol>
        {history.map((move, index) => (
          <li key={index}>
            {Math.floor(index / 2) + 1}. {move.san}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MoveHistory;

import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import MoveHistory from "./MoveHistory";
import moveSound from "../assets/move.mp3";
import "../components/board.css";

const levels = ["Beginner", "Intermediate", "Advanced"];

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [level, setLevel] = useState("Beginner");

  const moveSoundEffect = new Audio(moveSound);

  const makeAMove = (move) => {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy);
      setMoveHistory([...moveHistory, result]);
      setLastMove([result.from, result.to]);
      moveSoundEffect.play();
    }
    return result;
  };

  const onPieceClick = (square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length > 0) {
      setSelectedSquare(square);
      setLegalMoves(moves.map((m) => m.to));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const onDrop = (source, target) => {
    const move = makeAMove({
      from: source,
      to: target,
      promotion: "q",
    });
    setSelectedSquare(null);
    setLegalMoves([]);
    return move;
  };

  const restartGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
  };

  const getSquareStyles = (square) => {
    if (square === selectedSquare) return { backgroundColor: "#0074D9" };
    if (legalMoves.includes(square)) return { backgroundColor: "#2ECC40" };
    if (lastMove?.includes(square)) return { backgroundColor: "#FFDC00" };
    return {};
  };

  return (
    <div className={`chess-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="game-panel">
        <h2>♟️ Chess Pro</h2>

        <div className="settings">
          <label>🎯 Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <button onClick={restartGame}>♻️ Restart</button>
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          onSquareClick={onPieceClick}
          boardWidth={480}
          customSquareStyles={{
            ...Object.fromEntries(
              [...legalMoves, selectedSquare, ...(lastMove || [])].map((sq) => [
                sq,
                getSquareStyles(sq),
              ])
            ),
          }}
          animationDuration={200}
        />
      </div>

      <MoveHistory history={moveHistory} />
    </div>
  );
};

export default ChessGame;

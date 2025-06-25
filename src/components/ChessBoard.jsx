import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { motion } from "framer-motion";

const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [board, setBoard] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [replayMode, setReplayMode] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);

  useEffect(() => {
    setBoard(game.board());
  }, [game]);

  // Replay controller
  useEffect(() => {
    let interval;
    if (replayMode && replayIndex < moveHistory.length) {
      interval = setInterval(() => {
        const tempGame = new Chess();
        for (let i = 0; i <= replayIndex; i++) {
          tempGame.move(moveHistory[i]);
        }
        setGame(tempGame);
        setReplayIndex((prev) => prev + 1);
      }, 600);
    } else if (replayIndex >= moveHistory.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [replayMode, replayIndex]);

  const handleSquareClick = (row, col) => {
    if (replayMode) return;

    const square = boardLetters[col] + (8 - row);
    if (selectedSquare) {
      const move = { from: selectedSquare, to: square, promotion: "q" };
      const result = game.move(move);
      if (result) {
        setGame(new Chess(game.fen()));
        setMoveHistory([...moveHistory, move]);
      }
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  const handleReplay = () => {
    setReplayMode(true);
    setReplayIndex(0);
  };

  const getUnicodePiece = (piece) => {
    const symbols = {
      p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
      P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔",
    };
    return symbols[piece.color === "w" ? piece.type.toUpperCase() : piece.type];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 w-96 h-96 border-4 border-gray-700 rounded-xl overflow-hidden shadow-2xl">
        {board.flat().map((square, idx) => {
          const row = Math.floor(idx / 8);
          const col = idx % 8;
          const isDark = (row + col) % 2 === 1;

          return (
            <motion.div
              key={idx}
              onClick={() => handleSquareClick(row, col)}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center text-xl font-bold cursor-pointer 
                ${isDark ? "bg-green-600" : "bg-green-100"}`}
            >
              {square?.type ? (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {getUnicodePiece(square)}
                </motion.div>
              ) : null}
            </motion.div>
          );
        })}
      </div>

      {/* Replay button */}
      {moveHistory.length > 0 && !replayMode && (
        <button
          onClick={handleReplay}
          className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition"
        >
          ▶️ مشاهدة المعركة
        </button>
      )}

      {replayMode && replayIndex >= moveHistory.length && (
        <p className="mt-4 text-green-400 font-semibold">✅ تمت الإعادة</p>
      )}
    </div>
  );
};

export default ChessBoard;

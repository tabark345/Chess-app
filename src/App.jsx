import React from "react";
import ChessGame from "./components/ChessGame";
import "./components/board.css";

function App() {
  return (
    <div className="app">
      <h1>♟️ Chess Pro</h1>
      <ChessGame />
    </div>
  );
}

export default App;

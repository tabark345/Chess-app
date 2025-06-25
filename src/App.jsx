import React from "react";
import ChessBoard from "./components/ChessBoard";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">لعبة الشطرنج</h1>
        <ChessBoard />
      </div>
    </div>
  );
}

export default App;

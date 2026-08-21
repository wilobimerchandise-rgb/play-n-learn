import React, { useState } from "react";

const games = [
  { id: "shapes", title: "Shapes Hunt", color: "bg-pink-400" },
  { id: "numbers", title: "123 Count", color: "bg-blue-400" },
  { id: "alphabets", title: "ABC Zoo", color: "bg-green-400" },
  { id: "colors", title: "Color Match", color: "bg-yellow-400" },
  { id: "animals", title: "Animal Sounds", color: "bg-purple-400" },
  { id: "puzzles", title: "Mini Puzzles", color: "bg-orange-400" },
];

export default function App() {
  const [message, setMessage] = useState("");

  const startGame = (gameName) => {
    setMessage(`🚀 Starting ${gameName}!`);
    setTimeout(() => setMessage(""), 2000); // message disappears after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-2">Hi Superstar! 🦉</h1>
      <p className="text-center mb-8">Pick a game and let’s learn!</p>
      
      {message && (
        <div className="text-center bg-white text-purple-600 font-bold py-3 rounded-xl mb-4">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {games.map((game) => (
          <button 
            key={game.id} 
            onClick={() => startGame(game.title)}
            className={`${game.color} rounded-2xl p-6 text-center shadow-lg font-bold text-lg active:scale-95 transition`}
          >
            {game.title}
          </button>
        ))}
      </div>
    </div>
  );
        }

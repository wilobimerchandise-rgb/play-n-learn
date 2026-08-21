import React, { useState } from "react";

const games = [
  { id: "shapes", title: "Shapes Hunt", color: "bg-pink-400" },
  { id: "numbers", title: "123 Count", color: "bg-blue-400" },
  { id: "alphabets", title: "ABC Zoo", color: "bg-green-400" },
  { id: "colors", title: "Color Match", color: "bg-yellow-400" },
  { id: "animals", title: "Animal Sounds", color: "bg-purple-400" },
  { id: "puzzles", title: "Mini Puzzles", color: "bg-orange-400" },
];

const shapes = [
  { name: "Circle", emoji: "⭕", color: "bg-red-400" },
  { name: "Square", emoji: "⬜", color: "bg-blue-400" },
  { name: "Triangle", emoji: "🔺", color: "bg-green-400" },
];

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const startGame = (gameId) => {
    setCurrentGame(gameId);
    setScore(0);
    setFeedback("");
  };

  const handleShapeClick = (shapeName) => {
    setScore(score + 1);
    setFeedback(`Yay! You found the ${shapeName}! 🎉`);
    setTimeout(() => setFeedback(""), 1500);
  };

  // GAME SCREEN
  if (currentGame === "shapes") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 text-white p-6">
        <button onClick={() => setCurrentGame(null)} className="bg-white text-pink-500 font-bold px-4 py-2 rounded-xl mb-4">
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-2">Shapes Hunt</h1>
        <p className="text-center mb-4">Score: {score}</p>
        
        {feedback && (
          <div className="text-center bg-white text-pink-600 font-bold py-3 rounded-xl mb-4">
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {shapes.map((shape) => (
            <button
              key={shape.name}
              onClick={() => handleShapeClick(shape.name)}
              className={`${shape.color} rounded-2xl p-8 text-5xl shadow-lg active:scale-90 transition`}
            >
              {shape.emoji}
            </button>
          ))}
        </div>
        <p className="text-center mt-6">Tap a shape!</p>
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-2">Hi Superstar! 🦉</h1>
      <p className="text-center mb-8">Pick a game and let’s learn!</p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {games.map((game) => (
          <button 
            key={game.id} 
            onClick={() => startGame(game.id)}
            className={`${game.color} rounded-2xl p-6 text-center shadow-lg font-bold text-lg active:scale-95 transition`}
          >
            {game.title}
          </button>
        ))}
      </div>
    </div>
  );
         }

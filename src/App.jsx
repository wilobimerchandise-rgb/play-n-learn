import React, { useState, useEffect } from "react";

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
  { name: "Star", emoji: "⭐", color: "bg-yellow-400" },
];

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Pick a new random shape to find
  const newTarget = () => {
    const random = shapes[Math.floor(Math.random() * shapes.length)];
    setTarget(random);
    setFeedback(`Find the ${random.name}!`);
  };

  useEffect(() => {
    if (currentGame === "shapes") newTarget();
  }, [currentGame, score]);

  const handleShapeClick = (shape) => {
    if (shape.name === target.name) {
      setScore(score + 10);
      setFeedback(`CORRECT! 🎉 +10 points`);
    } else {
      setFeedback(`Nope! That was a ${shape.name}. Try again!`);
    }
    setTimeout(() => setFeedback(`Find the ${target.name}!`), 1200);
  };

  // GAME SCREEN
  if (currentGame === "shapes") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-500 text-white p-6">
        <button onClick={() => setCurrentGame(null)} className="bg-white text-pink-500 font-bold px-4 py-2 rounded-xl mb-4">
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-1">Shapes Hunt</h1>
        <p className="text-center mb-2">Score: {score}</p>
        
        <div className="text-center bg-white text-pink-600 font-bold py-4 rounded-xl mb-6 text-xl">
          {feedback}
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {shapes.map((shape) => (
            <button
              key={shape.name}
              onClick={() => handleShapeClick(shape)}
              className={`${shape.color} rounded-2xl p-10 text-6xl shadow-lg active:scale-90 transition transform hover:rotate-6`}
            >
              {shape.emoji}
            </button>
          ))}
        </div>
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
            onClick={() => setCurrentGame(game.id)}
            className={`${game.color} rounded-2xl p-6 text-center shadow-lg font-bold text-lg active:scale-95 transition`}
          >
            {game.title}
          </button>
        ))}
      </div>
    </div>
  );
    }

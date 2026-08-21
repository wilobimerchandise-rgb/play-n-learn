import React from "react";

const games = [
  { id: "shapes", title: "Shapes Hunt", color: "bg-pink-400" },
  { id: "numbers", title: "123 Count", color: "bg-blue-400" },
  { id: "alphabets", title: "ABC Zoo", color: "bg-green-400" },
  { id: "colors", title: "Color Match", color: "bg-yellow-400" },
  { id: "animals", title: "Animal Sounds", color: "bg-purple-400" },
  { id: "puzzles", title: "Mini Puzzles", color: "bg-orange-400" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-2">Hi Superstar! 🦉</h1>
      <p className="text-center mb-8">Pick a game and let’s learn!</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {games.map((game) => (
          <div key={game.id} className={`${game.color} rounded-2xl p-6 text-center shadow-lg`}>
            <h2 className="text-xl font-bold">{game.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
                   }

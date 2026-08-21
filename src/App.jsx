import React, { useState } from "react";
import AlchemyLab from "./games/AlchemyLab";
import BodyQuest from "./games/BodyQuest";
import CodingDash from "./games/CodingDash";
import MathArena from "./games/MathArena";
import NaijaTrivia from "./games/NaijaTrivia";
import StoryQuest from "./games/StoryQuest";

const gameList = [
  { id: "alchemy", title: "Alchemy Lab", color: "bg-purple-400", component: AlchemyLab },
  { id: "body", title: "Body Quest", color: "bg-red-400", component: BodyQuest },
  { id: "coding", title: "Coding Dash", color: "bg-blue-400", component: CodingDash },
  { id: "math", title: "Math Arena", color: "bg-green-400", component: MathArena },
  { id: "naija", title: "Naija Trivia", color: "bg-yellow-400", component: NaijaTrivia },
  { id: "story", title: "Story Quest", color: "bg-pink-400", component: StoryQuest },
];

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);

  // If a game is selected, show it
  if (currentGame) {
    const GameComponent = gameList.find(g => g.id === currentGame).component;
    return (
      <div>
        <button 
          onClick={() => setCurrentGame(null)} 
          className="fixed top-4 left-4 bg-white text-black font-bold px-4 py-2 rounded-xl z-50"
        >
          ← Home
        </button>
        <GameComponent />
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-2">Play N Learn 🦉</h1>
      <p className="text-center mb-8">Pick a game and let’s learn!</p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {gameList.map((game) => (
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

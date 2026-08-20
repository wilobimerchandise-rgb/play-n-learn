import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import MathArena from './games/MathArena';
import AlchemyLab from './games/AlchemyLab';
import StoryQuest from './games/StoryQuest';
import BodyQuest from './games/BodyQuest';
import CodingDash from './games/CodingDash';
import NaijaTrivia from './games/NaijaTrivia';

export default function App() {
  const [activeGame, setActiveGame] = useState('home');
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (xp >= level * 200) {
      setLevel(l => l + 1);
      addCoins(100);
      showToast(`Level Up! You are now Lv.${level + 1} 🎉`);
    }
  }, [xp, level]);

  const addCoins = (amount) => {
    setCoins(c => c + amount);
    showToast(`+${amount} Coins! 🪙`);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  }

  const addXp = (amount) => setXp(x => x + amount);
  const addStreak = () => setStreak(s => s + 1);
  const resetStreak = () => setStreak(0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }

  const games = [
    { id: 'math', title: "Wilo's Math Arena", emoji: "⚔️", color: "bg-purple-500", desc: "Battle monsters with Math!" },
    { id: 'alchemy', title: "Wilo's Lab", emoji: "🧪", color: "bg-green-500", desc: "Mix elements to discover!" },
    { id: 'story', title: "Choice Quest", emoji: "📖", color: "bg-blue-500", desc: "Choose your adventure!" },
    { id: 'body', title: "Build-a-Body", emoji: "🫀", color: "bg-red-500", desc: "Learn human anatomy!" },
    { id: 'coding', title: "Wilo Codes", emoji: "💻", color: "bg-yellow-500", desc: "Drag blocks to code!" },
    { id: 'naija', title: "Naija Superstar", emoji: "🇳🇬", color: "bg-emerald-500", desc: "Test your Naija knowledge!" },
  ];

  const GameComponent = {
    math: MathArena, alchemy: AlchemyLab, story: StoryQuest,
    body: BodyQuest, coding: CodingDash, naija: NaijaTrivia
  }[activeGame];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 p-4 text-white">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{y: -100}} animate={{y: 0}} exit={{y: -100}} className="fixed top-4 left-1/2 -translate-x-1/2 bg-white text-purple-900 px-6 py-3 rounded-full font-bold shadow-xl z-50">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {activeGame === 'home'? (
        <>
          <motion.div initial={{y: -50}} animate={{y: 0}} className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold">Hi Superstar! 🦉</h1>
            <div className="flex gap-3 text-sm md:text-lg bg-white/20 p-3 rounded-2xl">
              <span>🪙 {coins}</span>
              <span>⭐ Lv.{level}</span>
              <span>🔥 {streak}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {games.map(game => (
              <motion.button
                key={game.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGame(game.id)}
                className={`${game.color} p-4 md:p-6 rounded-2xl shadow-2xl text-center`}
              >
                <div className="text-5xl md:text-7xl mb-2">{game.emoji}</div>
                <div className="font-bold text-lg md:text-xl">{game.title}</div>
                <div className="text-xs md:text-sm mt-1 opacity-80">{game.desc}</div>
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <GameComponent
          onBack={() => setActiveGame('home')}
          addCoins={addCoins}
          addXp={addXp}
          addStreak={addStreak}
          resetStreak={resetStreak}
          showToast={showToast}
        />
      )}
    </div>
  );
    }

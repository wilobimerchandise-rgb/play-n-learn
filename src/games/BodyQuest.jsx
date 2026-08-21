import { useState } from 'react';

const organs = [
  { name: 'Heart', fact: 'Heart pumps blood! ❤️' },
  { name: 'Brain', fact: 'Brain controls your body! 🧠' },
  { name: 'Lungs', fact: 'Lungs help you breathe! 🫁' },
  { name: 'Stomach', fact: 'Stomach digests food! 🍎' }
];

export default function BodyQuest({ onBack, addCoins, addXp, showToast }) {
  const [placed, setPlaced] = useState([]);

  const placeOrgan = (organ) => {
    if(!placed.includes(organ.name)) {
      setPlaced([...placed, organ.name]);
      addCoins(25); addXp(30);
      showToast(organ.fact);
      if(placed.length + 1 === organs.length) {
        addCoins(100); addXp(100);
        showToast("Doctor Badge Unlocked! 🏆");
      }
    }
  }

  return (
    <div className="min-h-screen bg-red-900 p-4 text-white">
      <button onClick={onBack} className="mb-4 bg-white text-red-900 px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">Build-a-Body with Wilo 🫀</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <h2 className="text-xl mb-4">Tap organs to learn:</h2>
          {organs.map(o => (
            <motion.button key={o.name} whileHover={{scale: 1.05}} onClick={() => placeOrgan(o)} className="w-full bg-white text-red-900 p-3 rounded-xl mb-2 font-bold">
              {placed.includes(o.name)? '✓' : '+'} {o.name}
            </motion.button>
          ))}
        </div>
        <div className="w-full md:w-2/3 bg-white/10 h-96 rounded-2xl flex items-center justify-center text-8xl">🧍</div>
      </div>
    </div>
  );
    }

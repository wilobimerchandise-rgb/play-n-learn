import { useState } from 'react';

const recipes = {
  'Water+Fire': 'Steam', 'Water+Earth': 'Mud', 'Water+Air': 'Rain',
  'Fire+Earth': 'Lava', 'Fire+Air': 'Energy', 'Earth+Air': 'Dust',
  'Water+Plant': 'Algae', 'Fire+Plant': 'Ash', 'Earth+Plant': 'Grass',
  'Air+Animal': 'Bird', 'Water+Animal': 'Fish'
};

export default function AlchemyLab({ onBack, addCoins, addXp, showToast }) {
  const [inventory, setInventory] = useState(['Water', 'Fire', 'Earth', 'Air']);
  const [discoveries, setDiscoveries] = useState([]);
  const [dragging, setDragging] = useState(null);

  const combine = (el1, el2) => {
    const key1 = `${el1}+${el2}`; const key2 = `${el2}+${el1}`;
    const result = recipes[key1] || recipes[key2];
    if(result &&!discoveries.includes(result)) {
      setDiscoveries([...discoveries, result]);
      if(!inventory.includes(result)) setInventory([...inventory, result]);
      addCoins(20); addXp(30);
      showToast(`Discovery Unlocked: ${result}! ✨`);
    } else { showToast("Hmm that didn't work, try again scientist! 🧪"); }
  }

  return (
    <div className="min-h-screen bg-green-900 p-4 text-white">
      <button onClick={onBack} className="mb-4 bg-white text-green-900 px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">Wilo's Lab 🧪</h1>
      <p className="text-center mb-6">Drag 2 elements together!</p>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {inventory.map(el => (
          <motion.div key={el} draggable onDragStart={() => setDragging(el)} onDrop={() => dragging && combine(dragging, el)} onDragOver={e => e.preventDefault()} whileHover={{ scale: 1.1 }} className="bg-white text-green-900 px-6 py-3 rounded-xl font-bold cursor-grab">
            {el}
          </motion.div>
        ))}
      </div>
      <div className="bg-white/10 p-4 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">Discoveries: {discoveries.length}</h2>
        <div className="flex flex-wrap gap-2">{discoveries.map(d => <span key={d} className="bg-yellow-400 text-black px-3 py-1 rounded-full">{d}</span>)}</div>
      </div>
    </div>
  );
  }

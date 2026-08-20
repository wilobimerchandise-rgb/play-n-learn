import { useState } from 'react';
import { motion } from 'framer-motion';

const stories = {
  kingdom: {
    title: "The Lost Kingdom",
    pages: [
      { text: "You find a magic door. What do you do?", choices: ["Open it", "Knock first", "Run away"], next: [1,1,0], reward: [10,5,0] },
      { text: "A friendly dragon greets you! It offers you a ride.", choices: ["Ride the dragon", "Ask questions", "Give it food"], next: [2,2,2], reward: [20,10,15] },
      { text: "You found the lost treasure! You are a hero!", choices: ["Play Again"], next: [0], reward: [50] }
    ]
  }
};

export default function StoryQuest({ onBack, addCoins, showToast }) {
  const [story] = useState('kingdom');
  const [page, setPage] = useState(0);
  const current = stories[story].pages[page];

  const choose = (i) => {
    addCoins(current.reward[i]);
    showToast("Great choice! 📖");
    setPage(current.next[i]);
  }

  return (
    <div className="min-h-screen bg-blue-900 p-4 text-white">
      <button onClick={onBack} className="mb-4 bg-white text-blue-900 px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">{stories[story].title} 📖</h1>
      <motion.div key={page} initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}} className="bg-white text-blue-900 p-6 rounded-2xl max-w-2xl mx-auto">
        <div className="text-2xl mb-6">{current.text}</div>
        {current.choices.map((c, i) => (
          <button key={i} onClick={() => choose(i)} className="w-full bg-blue-100 p-4 rounded-xl mb-3 hover:bg-blue-200 font-bold">{c}</button>
        ))}
      </motion.div>
    </div>
  );
}

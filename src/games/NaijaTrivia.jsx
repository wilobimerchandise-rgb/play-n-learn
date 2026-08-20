import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  { q: "Who was the first President of Nigeria?", a: ["Nnamdi Azikiwe", "Obafemi Awolowo", "Ahmadu Bello"], correct: 0 },
  { q: "What state is Suya most famous from?", a: ["Lagos", "Kano", "Abuja"], correct: 1 },
  { q: "What are the colors of Nigeria flag?", a: ["Red White Blue", "Green White Green", "Yellow Green"], correct: 1 },
  { q: "Which city is called 'Centre of Excellence'?", a: ["Abuja", "Port Harcourt", "Lagos"], correct: 2 },
];

export default function NaijaTrivia({ onBack, addCoins, addXp, addStreak, resetStreak, showToast }) {
  const [qIndex, setQIndex] = useState(0);
  const [streak, setLocalStreak] = useState(0);
  const currentQ = questions[qIndex];

  const handleAnswer = (index) => {
    if(index === currentQ.correct) {
      setLocalStreak(s => s + 1); addStreak();
      addCoins(15); addXp(25);
      showToast("Correct! Naija to the world! 🇳🇬");
      if(streak + 1 === 10) showToast("NAIJA CHAMPION! 🏆");
    } else {
      setLocalStreak(0); resetStreak();
      showToast("Try again champ!");
    }
    setQIndex((qIndex + 1) % questions.length);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-white p-4 text-black">
      <button onClick={onBack} className="mb-4 bg-green-800 text-white px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">Naija Superstar 🇳🇬</h1>
      <div className="text-center mb-4 font-bold">Streak: 🔥{streak}</div>
      <motion.div key={qIndex} initial={{x: 300}} animate={{x: 0}} className="bg-white p-6 rounded-2xl max-w-lg mx-auto shadow-2xl">
        <div className="text-2xl font-bold mb-6">{currentQ.q}</div>
        {currentQ.a.map((option, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className="w-full bg-green-100 p-4 rounded-xl mb-3 hover:bg-green-200 font-bold">{option}</button>
        ))}
      </motion.div>
    </div>
  );
  }

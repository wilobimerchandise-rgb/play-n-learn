import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MathArena({ onBack, addCoins, addXp, showToast }) {
  const [playerHp, setPlayerHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [question, setQuestion] = useState({ text: "2 + 2 =?", answer: 4 });
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(10);

  const newQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    let ans = eval(`${a}${op}${b}`);
    setQuestion({ text: `${a} ${op} ${b} =?`, answer: ans });
    setTimer(10);
  };

  useEffect(() => { newQuestion(); }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if(timer > 0) setTimer(timer - 1);
      else { setPlayerHp(h => Math.max(0, h - 10)); showToast("Too slow! Monster hit you!"); newQuestion(); }
    }, 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleAttack = () => {
    if(answer === '') return;
    if(parseInt(answer) === question.answer) {
      setMonsterHp(h => Math.max(0, h - 25));
      addCoins(10); addXp(20);
      showToast("Direct Hit! 🎯");
      if(monsterHp <= 25) {
        addCoins(50); addXp(50); showToast("You Won! 🏆");
        setMonsterHp(100); setPlayerHp(100);
      }
    } else {
      setPlayerHp(h => Math.max(0, h - 15));
      showToast("Try again champ! 💪");
      if(playerHp <= 15) { showToast("You Lost! Try again!"); setMonsterHp(100); setPlayerHp(100); }
    }
    setAnswer(''); newQuestion();
  }

  return (
    <div className="min-h-screen bg-purple-900 p-4 text-white">
      <button onClick={onBack} className="mb-4 bg-white text-purple-900 px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">Wilo's Math Arena ⚔️</h1>
      <div className="flex justify-between mb-8">
        <div>You <div className="w-40 h-4 bg-gray-700 rounded-full mt-1"><motion.div animate={{width: `${playerHp}%`}} className="h-4 bg-green-500 rounded-full"/></div></div>
        <div>Monster <div className="w-40 h-4 bg-gray-700 rounded-full mt-1"><motion.div animate={{width: `${monsterHp}%`}} className="h-4 bg-red-500 rounded-full"/></div></div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold mb-4">{question.text}</div>
        <div className="text-2xl mb-4">Time: {timer}s</div>
        <input type="number" value={answer} onChange={e => setAnswer(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAttack()} className="text-black p-3 rounded-xl text-2xl w-40 text-center"/>
        <button onClick={handleAttack} className="ml-4 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">ATTACK!</button>
      </div>
    </div>
  );
                }

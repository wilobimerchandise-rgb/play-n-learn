import { useState, useEffect } from 'react';

export default function MathArena({ onBack, addCoins, addXp, showToast }) {
  const [playerHp, setPlayerHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [question, setQuestion] = useState({ text: "2 + 2 = ?", answer: 4 });
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(10);

  const newQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    
    let ans = 0;
    if (op === '+') ans = a + b;
    if (op === '-') ans = a - b;
    if (op === '*') ans = a * b;
    
    setQuestion({ text: `${a} ${op} ${b} = ?`, answer: ans });
    setTimer(10);
  };

  useEffect(() => { 
    newQuestion(); 
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setPlayerHp(h => Math.max(0, h - 10));
      if(showToast) showToast("Too slow! Monster hit you!");
      newQuestion();
    }
  }, [timer]);

  const handleAttack = () => {
    if(answer === '') return;
    const numAnswer = parseInt(answer);
    
    if(numAnswer === question.answer) {
      const newMonsterHp = Math.max(0, monsterHp - 25);
      setMonsterHp(newMonsterHp);
      if(addCoins) addCoins(10); 
      if(addXp) addXp(20);
      if(showToast) showToast("Direct Hit! 🎯");
      
      if(newMonsterHp <= 0) {
        if(addCoins) addCoins(50); 
        if(addXp) addXp(50); 
        if(showToast) showToast("You Won! 🏆");
        setMonsterHp(100); 
        setPlayerHp(100);
      }
    } else {
      const newPlayerHp = Math.max(0, playerHp - 15);
      setPlayerHp(newPlayerHp);
      if(showToast) showToast("Wrong! Try again champ! 💪");
      
      if(newPlayerHp <= 0) { 
        if(showToast) showToast("You Lost! Try again!"); 
        setMonsterHp(100); 
        setPlayerHp(100); 
      }
    }
    setAnswer(''); 
    newQuestion();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAttack();
  }

  return (
    <div style={{minHeight: '100vh', background: '#581c87', padding: 16, color: 'white'}}>
      <button 
        onClick={onBack} 
        style={{marginBottom: 16, background: 'white', color: '#581c87', padding: '8px 16px', borderRadius: 12, fontWeight: 'bold', border: 'none'}}
      >
        ← Back Home
      </button>
      
      <h1 style={{fontSize: 28, textAlign: 'center', marginBottom: 16}}>Wilo's Math Arena ⚔️</h1>
      
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 32}}>
        <div>
          <div>You</div>
          <div style={{width: 160, height: 16, background: '#374151', borderRadius: 8, marginTop: 4}}>
            <div style={{width: `${playerHp}%`, height: 16, background: '#22c55e', borderRadius: 8, transition: 'width 0.3s'}}/>
          </div>
        </div>
        <div>
          <div>Monster</div>
          <div style={{width: 160, height: 16, background: '#374151', borderRadius: 8, marginTop: 4}}>
            <div style={{width: `${monsterHp}%`, height: 16, background: '#ef4444', borderRadius: 8, transition: 'width 0.3s'}}/>
          </div>
        </div>
      </div>
      
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: 40, fontWeight: 'bold', marginBottom: 16}}>{question.text}</div>
        <div style={{fontSize: 24, marginBottom: 16}}>Time: {timer}s</div>
        <input 
          type="number" 
          value={answer} 
          onChange={e => setAnswer(e.target.value)} 
          onKeyDown={handleKeyDown}
          style={{color: 'black', padding: 12, borderRadius: 12, fontSize: 24, width: 160, textAlign: 'center', border: 'none'}}
        />
        <button 
          onClick={handleAttack} 
          style={{marginLeft: 16, background: '#facc15', color: 'black', padding: '12px 24px', borderRadius: 12, fontWeight: 'bold', border: 'none'}}
        >
          ATTACK!
        </button>
      </div>
    </div>
  );
  }

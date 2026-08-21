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
    
    let ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
    
    setQuestion({ text: `${a} ${op} ${b} = ?`, answer: ans });
    setTimer(10);
  };

  useEffect(() => { newQuestion(); }, []);

  useEffect(() => {
    if (timer <= 0) {
      setPlayerHp(h => Math.max(0, h - 10));
      showToast && showToast("Too slow! Monster hit you!");
      newQuestion();
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleAttack = () => {
    if(answer === '') return;
    const numAnswer = parseInt(answer);
    
    if(numAnswer === question.answer) {
      const newMonsterHp = monsterHp - 25;
      setMonsterHp(Math.max(0, newMonsterHp));
      addCoins && addCoins(10); 
      addXp && addXp(20);
      showToast && showToast("Direct Hit! 🎯");
      
      if(newMonsterHp <= 0) {
        addCoins && addCoins(50); 
        addXp && addXp(50); 
        showToast && showToast("You Won! 🏆");
        setMonsterHp(100); 
        setPlayerHp(100);
      }
    } else {
      const newPlayerHp = playerHp - 15;
      setPlayerHp(Math.max(0, newPlayerHp));
      showToast && showToast("Wrong! Try again champ! 💪");
      
      if(newPlayerHp <= 0) { 
        showToast && showToast("You Lost! Try again!"); 
        setMonsterHp(100); 
        setPlayerHp(100); 
      }
    }
    setAnswer(''); 
    newQuestion();
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #581c87, #a21caf)', padding: 16, color: 'white', fontFamily: 'sans-serif'}}>
      <button onClick={onBack} style={{marginBottom: 16, background: 'white', color: '#581c87', padding: '10px 20px', borderRadius: 12, fontWeight: 'bold', border: 'none', fontSize: 16}}>
        ← Back Home
      </button>
      
      <h1 style={{fontSize: 28, textAlign: 'center', marginBottom: 16}}>Wilo's Math Arena ⚔️</h1>
      
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px'}}>
        <div>
          <div style={{fontWeight: 'bold'}}>You</div>
          <div style={{width: 160, height: 16, background: '#374151', borderRadius: 8, marginTop: 4}}>
            <div style={{width: `${playerHp}%`, height: 16, background: '#22c55e', borderRadius: 8, transition: 'width 0.3s'}}/>
          </div>
        </div>
        <div>
          <div style={{fontWeight: 'bold'}}>Monster</div>
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
          onKeyDown={e => e.key === 'Enter' && handleAttack()}
          style={{color: 'black', padding: 12, borderRadius: 12, fontSize: 24, width: 160, textAlign: 'center', border: 'none'}}
          autoFocus
        />
        <button onClick={handleAttack} style={{marginLeft: 16, background: '#facc15', color: 'black', padding: '12px 24px', borderRadius: 12, fontWeight: 'bold', border: 'none', fontSize: 18}}>
          ATTACK!
        </button>
      </div>
    </div>
  );
  }

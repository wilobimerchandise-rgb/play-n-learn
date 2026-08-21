import { useState } from "react";
import MathArena from "./games/MathArena";

export default function App() {
  const [game, setGame] = useState(null);
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);

  if (game === "math") {
    return <MathArena 
      onBack={() => setGame(null)} 
      addCoins={(n) => setCoins(c => c + n)} 
      addXp={(n) => setXp(x => x + n)} 
      showToast={(msg) => alert(msg)} 
    />
  }

  return (
    <div style={{padding: 20, background: 'linear-gradient(to bottom, #7c3aed, #ec4899)', minHeight: '100vh', color: 'white', textAlign: 'center', fontFamily: 'sans-serif'}}>
      <h1 style={{fontSize: 32, fontWeight: 'bold'}}>Play N Learn 🦉</h1>
      <p style={{fontSize: 18}}>Coins: {coins} | XP: {xp}</p>
      <button 
        onClick={() => setGame("math")} 
        style={{marginTop: 20, background: '#22c55e', padding: 20, borderRadius: 12, fontSize: 18, fontWeight: 'bold', color: 'white', border: 'none', cursor: 'pointer'}}
      >
        Math Arena ⚔️
      </button>
    </div>
  );
}

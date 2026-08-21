import { useState } from "react";
import MathArena from "./games/MathArena";

export default function App() {
  const [game, setGame] = useState(null);
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);

  if (game === "math") {
    return <MathArena 
      onBack={() => setGame(null)} 
      addCoins={(n) => setCoins(coins + n)} 
      addXp={(n) => setXp(xp + n)} 
      showToast={(msg) => alert(msg)} 
    />
  }

  return (
    <div style={{padding: 20, background: 'linear-gradient(to bottom, purple, pink)', minHeight: '100vh', color: 'white', textAlign: 'center'}}>
      <h1 style={{fontSize: 32, fontWeight: 'bold'}}>Play N Learn 🦉</h1>
      <p>Coins: {coins} | XP: {xp}</p>
      <button onClick={() => setGame("math")} style={{marginTop: 20, background: 'green', padding: 20, borderRadius: 12, fontSize: 18, fontWeight: 'bold', color: 'white'}}>
        Math Arena ⚔️
      </button>
    </div>
  );
}

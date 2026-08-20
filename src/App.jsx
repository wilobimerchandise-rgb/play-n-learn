import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

// SOUND EFFECTS
const playSound = (type) => {
  const sounds = {
    pop: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'),
    correct: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
    wrong: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
    win: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3')
  };
  sounds[type]?.play().catch(()=>{});
}

function Badges({ coins, lastScore, game }) {
  const badges = [];
  if(coins >= 200) badges.push({icon: "💰", name: "Coin Collector"});
  if(lastScore === 10) badges.push({icon: "🧠", name: `${game} Master`});
  if(lastScore >= 8) badges.push({icon: "⭐", name: "Superstar"});

  return (
    <div className="bg-white/10 p-4 rounded-2xl mt-4">
      <h3 className="font-bold text-lg mb-2">Your Badges</h3>
      <div className="flex gap-3 justify-center flex-wrap">
        {badges.length > 0? badges.map(b => (
          <div key={b.name} className="bg-yellow-400/20 p-2 rounded-xl text-center min-w-[80px]">
            <div className="text-3xl">{b.icon}</div>
            <div className="text-xs">{b.name}</div>
          </div>
        )) : <p className="text-sm text-slate-400">Play games to earn badges!</p>}
      </div>
    </div>
  )
}

function Home({ setScreen }) {
  return (
    <div className="text-center space-y-6 max-w-2xl mx-auto pt-8">
      <div className="text-4xl sm:text-5xl font-bold">
        <span className="text-yellow-300">Hi There,</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400"> Superstar!</span>
      </div>
      <div className="text-8xl animate-bounce">🦉</div>
      <p className="text-cyan-300 font-bold text-lg -mt-2">"Wilo: Let's train your brain!"</p>
      <p className="text-slate-300">Math, Science, Words & Memory!</p>

      <button onClick={() => setScreen('games')} className="w-full p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-2xl rounded-3xl shadow-2xl hover:scale-105 transition">
        🎮 Enter Arcade 🎮
      </button>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <button onClick={() => setScreen('math')} className="p-5 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl font-bold hover:scale-105 transition">🎈 Math</button>
        <button onClick={() => setScreen('science')} className="p-5 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl font-bold hover:scale-105 transition">🧪 Science</button>
        <button onClick={() => setScreen('word')} className="p-5 bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl font-bold hover:scale-105 transition">🔤 Words</button>
        <button onClick={() => setScreen('memory')} className="p-5 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl font-bold hover:scale-105 transition">🧠 Memory</button>
      </div>
    </div>
  );
}

function Games({ setScreen }) {
  return (
    <div className="text-center space-y-4 max-w-xl mx-auto pt-6">
      <button onClick={() => setScreen('home')} className="flex items-center gap-2 hover:text-yellow-300"><ArrowLeft/> Back</button>
      <h2 className="text-3xl font-bold">Choose a Game</h2>
      <button onClick={() => setScreen('math')} className="w-full p-6 bg-purple-600 rounded-2xl text-xl font-bold">🎈 Math Balloon</button>
      <button onClick={() => setScreen('science')} className="w-full p-6 bg-cyan-600 rounded-2xl text-xl font-bold">🧪 Science Lab</button>
      <button onClick={() => setScreen('word')} className="w-full p-6 bg-pink-600 rounded-2xl text-xl font-bold">🔤 Word Builder</button>
      <button onClick={() => setScreen('memory')} className="w-full p-6 bg-green-600 rounded-2xl text-xl font-bold">🧠 Memory Match</button>
    </div>
  );
}

function MathGame({ setScreen, addCoins }) {
  const [score, setScore] = useState(0);
  const [qNum, setQNum] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 15) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 15) + 1);
  const answer = num1 + num2;

  const newQuestion = () => {
    setNum1(Math.floor(Math.random() * 15) + 1);
    setNum2(Math.floor(Math.random() * 15) + 1);
  }

  const check = (guess) => {
    playSound('pop');
    if(guess === answer){
      playSound('correct');
      setScore(s => s+1);
      addCoins(10);
    } else {
      playSound('wrong');
    }
    if(qNum === 10) { setGameOver(true); if(score+1 >= 8) playSound('win'); }
    else { setQNum(qNum+1); newQuestion(); }
  }

  if(gameOver) return (
    <div className="text-center space-y-4 pt-10 max-w-xl mx-auto">
      <div className="text-6xl">🏆</div><div className="text-6xl -mt-4 animate-bounce">🦉</div>
      <h2 className="text-4xl font-bold text-yellow-300">Math Mission Complete!</h2>
      <p className="text-2xl">Score: {score}/10</p>
      {score >= 8 && <p className="text-yellow-300 font-bold">Wilo: "You're a Math Genius!"</p>}
      <Badges coins={240 + score*10} lastScore={score} game="Math" />
      <button onClick={() => {setQNum(1); setScore(0); setGameOver(false); newQuestion()}} className="p-4 bg-green-500 rounded-2xl font-bold w-full">Play Again</button>
      <button onClick={() => setScreen('games')} className="p-4 bg-slate-600 rounded-2xl font-bold w-full">Back to Games</button>
    </div>
  );

  return (
    <div className="text-center space-y-6 pt-6 max-w-xl mx-auto">
      <button onClick={() => setScreen('games')} className="flex items-center gap-2 hover:text-yellow-300"><ArrowLeft/> Back</button>
      <p className="font-bold">Question {qNum}/10</p>
      <div className="bg-white/10 p-8 rounded-2xl text-5xl font-bold">{num1} + {num2} =?</div>
      <div className="grid grid-cols-3 gap-4">
        {[answer, answer+2, answer-1].sort(() => Math.random() - 0.5).map(n => (
          <button key={n} onClick={() => check(n)} className="p-4 bg-indigo-600 rounded-2xl text-2xl font-bold hover:scale-110 transition">{n}</button>
        ))}
      </div>
    </div>
  );
}

function ScienceGame({ setScreen, addCoins }) {
  const questions = [
    { q: "What do plants need to grow?", options: ["Water", "Rocks", "Plastic"], a: "Water" },
    { q: "Which planet is called the Red Planet?", options: ["Earth", "Mars", "Jupiter"], a: "Mars" },
    { q: "How many legs does a spider have?", options: ["6", "8", "4"], a: "8" },
    { q: "What gas do we breathe in?", options: ["Oxygen", "Carbon", "Nitrogen"], a: "Oxygen" },
    { q: "What do bees make?", options: ["Milk", "Honey", "Water"], a: "Honey" },
    { q: "Which animal lives in water?", options: ["Dog", "Fish", "Cat"], a: "Fish" },
    { q: "What is the sun?", options: ["A planet", "A star", "A moon"], a: "A star" },
    { q: "How many days in a week?", options: ["5", "6", "7"], a: "7" },
    { q: "What color is the sky?", options: ["Green", "Blue", "Red"], a: "Blue" },
    { q: "Ice is made of?", options: ["Water", "Air", "Fire"], a: "Water" },
  ];

  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const current = questions[qNum];

  const answer = (choice) => {
    playSound('pop');
    if(choice === current.a){
      playSound('correct');
      setScore(s => s+1);
      addCoins(10);
    } else {
      playSound('wrong');
    }
    if(qNum + 1 === questions.length) { setGameOver(true); if(score+1 >= 8) playSound('win'); }
    else setQNum(qNum + 1);
  }

  if(gameOver) return (
    <div className="text-center space-y-4 pt-10 max-w-xl mx-auto">
      <div className="text-6xl">🏆</div><div className="text-6xl -mt-4 animate-bounce">🦉</div>
      <h2 className="text-4xl font-bold text-cyan-300">Science Lab Complete!</h2>
      <p className="text-2xl">You scored {score}/10</p>
      {score >= 8 && <p className="text-yellow-300 font-bold">Wilo: "Science Pro Badge Earned!"</p>}
      <Badges coins={240 + score*10} lastScore={score} game="Science" />
      <button onClick={() => {setQNum(0); setScore(0); setGameOver(false)}} className="p-4 bg-cyan-500 rounded-2xl font-bold w-full">Play Again</button>
      <button onClick={() => setScreen('games')} className="p-4 bg-slate-600 rounded-2xl font-bold w-full">Back to Games</button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 pt-6">
      <button onClick={() => setScreen('games')} className="flex items-center gap-2 hover:text-yellow-300"><ArrowLeft/> Back</button>
      <p className="font-bold">Question {qNum + 1} / 10</p>
      <div className="bg-white/10 p-2 rounded-full"><div className="bg-cyan-400 h-2 rounded-full" style={{width: `${((qNum+1)/10)*100}%`}}></div></div>
      <div className="bg-white/10 p-8 rounded-2xl"><p className="text-2xl font-bold">🧪 {current.q}</p></div>
      <div className="grid gap-4">{current.options.map(opt => (<button key={opt} onClick={() => answer(opt)} className="p-5 bg-cyan-600 rounded-2xl text-xl font-bold hover:scale-105 transition">{opt}</button>))}</div>
    </div>
  );
}

function WordGame({ setScreen, addCoins }) {
  const wordData = [
    { word: "PLANET", tip: "We live on Earth, it's a big ____ in space" },
    { word: "GARDEN", tip: "Flowers and vegetables grow here" },
    { word: "PUZZLE", tip: "A brain game with pieces you fit together" },
    { word: "ROCKET", tip: "Flies to space and goes WHOOSH!" },
    { word: "JUNGLE", tip: "Lions and monkeys live here, lots of trees" },
    { word: "BRIDGE", tip: "Cars drive over water on a ____" },
    { word: "CANDLE", tip: "Gives light and has a flame on top" },
    { word: "MARKET", tip: "Where you buy fruits, food and things" },
    { word: "WHISTLE", tip: "You blow it to make a loud sound" },
    { word: "TUNNEL", tip: "A road that goes through a mountain" },
  ];

  const [wordIdx, setWordIdx] = useState(0);
  const [data, setData] = useState(wordData[0]);
  const [scrambled, setScrambled] = useState([]);
  const [built, setBuilt] = useState("");
  const [qNum, setQNum] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setData(wordData[wordIdx]);
    setScrambled(wordData[wordIdx].word.split('').sort(() => Math.random()-0.5));
    setBuilt("");
    setShowTip(false);
  }, [wordIdx]);

  const addLetter = (letter) => {
    playSound('pop');
    const newBuilt = built + letter;
    setBuilt(newBuilt);
    if(newBuilt === data.word){
      playSound('correct');
      setScore(s => s+1);
      addCoins(15);
      if(qNum === 10) { setGameOver(true); if(score+1 >= 8) playSound('win'); }
      else setTimeout(() => { setWordIdx(wordIdx+1); setQNum(qNum+1) }, 1200);
    }
    if(newBuilt.length >= data.word.length && newBuilt!== data.word){
      playSound('wrong');
      setTimeout(() => setBuilt(""), 500);
    }
  }

  const useHint = () => {
    setShowTip(true);
    addCoins(-5);
  }

  if(gameOver) return (
    <div className="text-center space-y-4 pt-10 max-w-xl mx-auto">
      <div className="text-6xl">🏆</div><div className="text-6xl -mt-4 animate-bounce">🦉</div>
      <h2 className="text-4xl font-bold text-pink-300">Word Master Complete!</h2>
      <p className="text-2xl">Score: {score}/10</p>
      {score >= 8 && <p className="text-yellow-300 font-bold">Wilo: "You're a Spelling Wizard!"</p>}
      <Badges coins={240 + score*15} lastScore={score} game="Word" />
      <button onClick={() => {setWordIdx(0); setScore(0); setQNum(1); setGameOver(false)}} className="p-4 bg-pink-500 rounded-2xl font-bold w-full">Play Again</button>
      <button onClick={() => setScreen('games')} className="p-4 bg-slate-600 rounded-2xl font-bold w-full">Back to Games</button>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto text-center space-y-6 pt-6">
      <button onClick={() => setScreen('games')} className="flex items-center gap-2 hover:text-yellow-300"><ArrowLeft/> Back</button>
      <p className="font-bold">Word {qNum}/10</p>

      <div className="bg-white/10 p-6 rounded-2xl text-3xl font-bold tracking-[0.5rem] min-h-[80px] flex items-center justify-center">
        {built || "____"}
      </div>

      {showTip && (
        <div className="bg-yellow-400/20 border border-yellow-400 p-3 rounded-xl text-yellow-200">
          💡 Hint: {data.tip}
        </div>
      )}

      <button onClick={useHint} disabled={showTip}
        className="text-sm bg-yellow-500/30 px-4 py-2 rounded-full disabled:opacity-50">
        {showTip? "Hint Used -5 coins" : "Need a Hint? -5 coins"}
      </button>

      <div className="grid grid-cols-4 gap-4">
        {scrambled.map((l, i) => (
          <button key={i} onClick={() => addLetter(l)}
            className="p-6 text-4xl font-bold bg-pink-500 rounded-2xl hover:scale-110 transition">
            {l}
          </button>
        ))}
      </div>
      <button onClick={() => setBuilt("")} className="text-sm underline">Clear</button>
    </div>
  )
}

function MemoryGame({ setScreen, addCoins }) {
  const emojis = ["🐶", "🐱", "🦊", "🐻", "🐼", "🦁", "🐯", "🐨", "🐸", "🐵"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const deck = [...emojis,...emojis].sort(() => Math.random() - 0.5).map((e, i) => ({id: i, emoji: e}));
    setCards(deck);
  }, []);

  useEffect(() => {
    if(flipped.length === 2){
      if(cards[flipped[0]].emoji === cards[flipped[1]].emoji){
        playSound('correct');
        setMatched([...matched,...flipped]);
        setScore(s => s+1);
        addCoins(10);
        if(matched.length + 2 === cards.length) { setGameOver(true); playSound('win'); }
      } else {
        playSound('wrong');
      }
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped]);

  const flipCard = (id) => {
    if(flipped.length < 2 &&!flipped.includes(id) &&!matched.includes(id)){
      playSound('pop');
      setFlipped([...flipped, id]);
    }
  }

  if(gameOver) return (
    <div className="text-center space-y-4 pt-10 max-w-xl mx-auto">
      <div className="text-6xl">🏆</div><div className="text-6xl -mt-4 animate-bounce">🦉</div>
      <h2 className="text-4xl font-bold text-green-300">Memory Master!</h2>
      <p className="text-2xl">Pairs Found: {score}/10</p>
      {score === 10 && <p className="text-yellow-300 font-bold">Wilo: "Perfect Memory!"</p>}
      <Badges coins={240 + score*10} lastScore={score} game="Memory" />
      <button onClick={() => window.location.reload()} className="p-4 bg-green-500 rounded-2xl font-bold w-full">Play Again</button>
      <button onClick={() => setScreen('games')} className="p-4 bg-slate-600 rounded-2xl font-bold w-full">Back to Games</button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 pt-6">
      <button onClick={() => setScreen('games')} className="flex items-center gap-2 hover:text-yellow-300"><ArrowLeft/> Back</button>
      <p className="font-bold">Pairs Found: {score}/10</p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button key={card.id} onClick={() => flipCard(card.id)}
            className="aspect-square text-4xl bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center hover:scale-105 transition">
            {flipped.includes(card.id) || matched.includes(card.id)? card.emoji : "❓"}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [coins, setCoins] = useState(240);
  const addCoins = (amount) => setCoins(c => c + amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 font-sans">
      <header className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Play N Learn</h1>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-lg">💰 {coins}</div>
      </header>

      {screen === 'home' && <Home setScreen={setScreen} />}
      {screen === 'games' && <Games setScreen={setScreen} />}
      {screen === 'math' && <MathGame setScreen={setScreen} addCoins={addCoins} />}
      {screen === 'science' && <ScienceGame setScreen={setScreen} addCoins={addCoins} />}
      {screen === 'word' && <WordGame setScreen={setScreen} addCoins={addCoins} />}
      {screen === 'memory' && <MemoryGame setScreen={setScreen} addCoins={addCoins} />}
    </div>
  );
                                    }

import { useState } from 'react';

const blocks = ['Move Forward', 'Turn Left', 'Jump', 'Repeat 2x'];

export default function CodingDash({ onBack, addCoins, addXp, showToast }) {
  const [workspace, setWorkspace] = useState([]);
  const [position, setPosition] = useState(0);

  const runCode = () => {
    let pos = 0;
    workspace.forEach(block => {
      if(block === 'Move Forward') pos += 1;
      if(block === 'Jump') pos += 2;
      if(block === 'Repeat 2x') pos += 2;
    });
    setPosition(pos);
    if(pos >= 5) { addCoins(30); addXp(40); showToast("You debugged it! 🎉"); }
    else { showToast("Try again! Get to the coin!"); }
    setTimeout(() => setPosition(0), 2000);
  }

  return (
    <div className="min-h-screen bg-yellow-900 p-4 text-white">
      <button onClick={onBack} className="mb-4 bg-white text-yellow-900 px-4 py-2 rounded-xl font-bold">← Back Home</button>
      <h1 className="text-3xl text-center mb-4">Wilo Codes 💻</h1>
      <p className="text-center mb-4">Get Wilo to the coin in 5 moves!</p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <h2 className="text-xl mb-2">Toolbox</h2>
          {blocks.map(b => (<button key={b} onClick={() => setWorkspace([...workspace, b])} className="w-full bg-white text-yellow-900 p-3 rounded-xl mb-2 font-bold">{b}</button>))}
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-xl mb-2">Workspace</h2>
          <div className="bg-white/10 p-4 rounded-xl min-h-40 mb-4">
            {workspace.map((b,i) => <div key={i} className="bg-yellow-400 text-black p-2 rounded mb-1">{b}</div>)}
          </div>
          <button onClick={runCode} className="w-full bg-green-500 p-3 rounded-xl font-bold">RUN CODE ▶️</button>
          <div className="mt-4 text-4xl">Wilo: {'📍'.repeat(position+1)} 🪙</div>
        </div>
      </div>
    </div>
  );
      }

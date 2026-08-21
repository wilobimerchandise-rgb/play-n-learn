export default function MathArena({ onBack }) {
  return (
    <div style={{minHeight: '100vh', background: 'purple', color: 'white', padding: 20}}>
      <button 
        onClick={onBack} 
        style={{background: 'white', color: 'purple', padding: 10, borderRadius: 8, fontWeight: 'bold'}}
      >
        ← Back Home
      </button>
      <h1 style={{textAlign: 'center', marginTop: 50}}>MATH ARENA WORKS! 🎉</h1>
      <p style={{textAlign: 'center'}}>If you see this, the file is fine. The logic was breaking it.</p>
    </div>
  );
}

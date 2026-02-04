import React, { useState, useEffect } from 'react';

function App() {
  const [pos, setPos] = useState({ x: 50, y: 50 }); // Karakterin başlangıç konumu

  useEffect(() => {
    const handleKeyDown = (e) => {
      const step = 5;
      if (e.key === 'ArrowUp') setPos(prev => ({ ...prev, y: prev.y - step }));
      if (e.key === 'ArrowDown') setPos(prev => ({ ...prev, y: prev.y + step }));
      if (e.key === 'ArrowLeft') setPos(prev => ({ ...prev, x: prev.x - step }));
      if (e.key === 'ArrowRight') setPos(prev => ({ ...prev, x: prev.x + step }));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Komşunun Evi (Temsili) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-800 border-4 border-yellow-600 rounded-lg">
        <p className="text-white text-center mt-2">Komşunun Evi</p>
      </div>

      {/* Senin Karakterin */}
      <div 
        className="absolute w-10 h-10 bg-blue-500 rounded-full transition-all duration-75 border-2 border-white shadow-lg"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        <span className="text-[10px] text-white flex justify-center mt-10">Efe</span>
      </div>

      <div className="absolute bottom-5 left-5 text-white bg-black/50 p-2 rounded">
        Şarj Durumu: %19+ (Hızlı Şarj Aktif) | Kasko: Bitti
      </div>
    </div>
  );
}

export default App;


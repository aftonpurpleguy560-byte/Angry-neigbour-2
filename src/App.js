import React, { useState } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async () => {
    if (userName.trim().length < 3) {
      setError("İsim çok kısa!");
      return;
    }
    try {
      const userRef = doc(db, "users", userName.trim());
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setError("Bu isim kapılmış!");
      } else {
        await setDoc(userRef, { username: userName.trim(), date: new Date() });
        setIsLoggedIn(true);
      }
    } catch (e) {
      setError("Bağlantı hatası!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-5">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-red-600 w-full max-w-sm text-center">
          <h1 className="text-xl font-bold mb-4 text-red-500 underline">ANGRY NEIGHBOR 2</h1>
          <input 
            type="text" placeholder="İsim Gir..." value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-black p-3 rounded mb-2 border border-zinc-700 outline-none"
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button onClick={handleStart} className="w-full bg-red-600 p-3 rounded font-bold">BAŞLA</button>
          <p className="mt-5 text-[10px] opacity-30">Purpleguy © 2026 - tablet power</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl">Hoş geldin, {userName}!</h2>
      <p className="text-green-500 mt-2">Komşu şu an seni izliyor... 👁️</p>
    </div>
  );
}

export default App;

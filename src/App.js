import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // Sayfa açıldığında daha önce giriş yapılmış mı kontrol et
  useEffect(() => {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
      setUserName(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    // Büyük/Küçük harf duyarlılığı için trim() kullanıyoruz ama metne dokunmuyoruz
    const inputName = userName.trim();
    if (inputName.length < 3) {
      setError("İsim çok kısa!");
      return;
    }

    try {
      const userRef = doc(db, "users", inputName);
      const userSnap = await getDoc(userRef);

      // Sadece "Admin" yazarsa (admin veya Admİn değil) ve döküman yoksa oluştur
      if (!userSnap.exists()) {
        await setDoc(userRef, { username: inputName, role: inputName === "Admin" ? "admin" : "player" });
      }
      
      localStorage.setItem('activeUser', inputName); // Hesabı tarayıcıya kilitle (Puff olmasın)
      setIsLoggedIn(true);
    } catch (e) {
      setError("Firebase hatası! Kuralları kontrol et.");
    }
  };

  // 1. GİRİŞ EKRANI
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-5">
        <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-red-600 w-full max-w-sm shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h1 className="text-2xl font-black mb-6 text-red-500 text-center tracking-tighter">ANGRY NEIGHBOR 2</h1>
          <input 
            type="text" placeholder="İsim (Örn: Admin)" value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-black p-4 rounded-xl mb-4 border border-zinc-700 focus:border-red-500 outline-none transition-all"
          />
          {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}
          <button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all">GİRİŞ YAP</button>
        </div>
      </div>
    );
  }

  // 2. 3D OYUN VE ADMIN EKRANI
  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* 3D SAHNE */}
      <div className="relative w-full h-80 flex items-end justify-center perspective-1000">
        {/* ZEMİN (3D Derinlik) */}
        <div className="absolute w-[200%] h-full bg-zinc-900 border-t-2 border-red-900/50 transform rotateX-60 origin-bottom shadow-[inset_0_50px_100px_rgba(0,0,0,0.8)]">
           <div className="w-full h-full opacity-20" style={{backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>

        {/* KOMŞU (Karakter) */}
        <div className="relative mb-10 text-9xl animate-bounce drop-shadow-[0_20px_20px_rgba(0,0,0,1)]">
          🎅
        </div>
      </div>

      {/* PANEL */}
      <div className="mt-10 text-center z-10 px-6">
        <h2 className="text-2xl font-black text-red-600 uppercase tracking-widest">
          {userName === "Admin" ? "⚡ GİZLİ ADMIN PANELİ ⚡" : "KOMŞUNUN EVİNDESİN"}
        </h2>
        <p className="text-zinc-500 text-xs mt-1 uppercase">OTURUM: {userName} | BATTERY: 40%</p>

        {/* Sadece tam olarak "Admin" ise bu butonlar gelir */}
        {userName === "Admin" && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="bg-red-600 p-3 rounded-lg text-[10px] font-black uppercase shadow-lg">Komşuyu Dondur</button>
            <button className="bg-zinc-800 p-3 rounded-lg text-[10px] font-black uppercase border border-zinc-700">Hız Hilesi</button>
            <button onClick={() => {localStorage.clear(); window.location.reload();}} className="col-span-2 bg-white text-black p-2 rounded-lg text-[10px] font-bold">ÇIKIŞ YAP (RESET)</button>
          </div>
        )}
      </div>

      <p className="absolute bottom-5 text-[10px] opacity-20 font-mono tracking-[10px]">Purpleguy © 2026</p>
    </div>
  );
}

export default App;


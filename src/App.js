import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Firebase yapılandırman buradan geliyor
import { doc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. İsim Kontrolü ve Kayıt Fonksiyonu
  const handleStart = async () => {
    if (userName.trim().length < 3) {
      setError("İsim çok kısa! En az 3 karakter yazmalısın.");
      return;
    }

    setLoading(true);
    try {
      // users koleksiyonunda bu isimde bir döküman var mı bak
      const userRef = doc(db, "users", userName.trim());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setError("Maalesef bu isim kapılmış! Başka bir isim dene.");
      } else {
        // İsim boşsa rezerve et ve oyuna al
        await setDoc(userRef, {
          username: userName.trim(),
          loginTime: new Date(),
          device: "Tablet Power"
        });
        setIsLoggedIn(true);
        setError("");
      }
    } catch (e) {
      setError("Bağlantı hatası! Kuralları (Rules) yayınladığından emin ol.");
    }
    setLoading(false);
  };

  // Giriş Ekranı (Tailwind CSS ile Tablet Uyumlu)
  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-zinc-900 p-8 rounded-3xl border-2 border-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.5)] w-full max-w-sm">
          <h1 className="text-2xl font-black text-center mb-6 tracking-tighter text-purple-400">
            ANGRY NEIGHBOR 2 <br/> <span className="text-sm font-normal text-white/50">WEB EDITION</span>
          </h1>
          
          <input 
            type="text" 
            placeholder="Kullanıcı Adı Seç..." 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-4 rounded-xl mb-2 focus:border-purple-500 outline-none transition-all"
          />
          
          {error && <p className="text-red-500 text-xs mb-4 ml-1">{error}</p>}

          <button 
            onClick={handleStart}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "KONTROL EDİLİYOR..." : "İSMİ KAP VE BAŞLA"}
          </button>
        </div>
        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">Purpleguy © 2026 - tablet power</p>
      </div>
    );
  }

  // Oyun Ekranı (Şimdilik Taslak)
  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-5 left-5 text-xs text-purple-400 font-mono">
        OYUNCU: {userName} | ŞARJ: %27+
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">🏠 EVDEYİZ!</h2>
        <p className="text-zinc-400">Komşu şu an seni duyamaz ama yakında gelecek...</p>
        <div className="mt-10 animate-bounce text-6xl">🏃‍♂️</div>
      </div>

      {/* PWA Butonu Alt Bilgi */}
      <div className="absolute bottom-10 px-4 py-2 bg-zinc-800 rounded-full text-[10px] text-zinc-400 border border-zinc-700">
        PWA MODU AKTİF - ANA EKRANA EKLEYEBİLİRSİN
      </div>
    </div>
  );
}

export default App;

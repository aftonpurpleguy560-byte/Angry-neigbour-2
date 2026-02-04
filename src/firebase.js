import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx...", // Senin kendi apiKey'in kalsın
  authDomain: "angry-neigbour-2.firebaseapp.com",
  projectId: "angry-neigbour-2",
  storageBucket: "angry-neigbour-2.firebasestorage.app",
  messagingSenderId: "1086259024095",
  appId: "1:1086259024095:web:8e309..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

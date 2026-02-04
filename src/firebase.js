import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Veritabanı için bunu ekledik

const firebaseConfig = {
  apiKey: "AIzaSyBr4wfYpRSdeR1JBDzmFwWq_dBmfy5rvnM",
  authDomain: "angry-neigbour-2.firebaseapp.com",
  projectId: "angry-neigbour-2",
  storageBucket: "angry-neigbour-2.firebasestorage.app",
  messagingSenderId: "218919463759",
  appId: "1:218919463759:web:f509cfbaa87fccd1afb33a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Veritabanını dışa aktar ki App.js içinde kullanabilelim
export const db = getFirestore(app);


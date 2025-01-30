import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm4ttSrJ62e9Wp8dgOjtfLGGuXCeJKAL8",
  authDomain: "chat-system-71c01.firebaseapp.com",
  projectId: "chat-system-71c01",
  storageBucket: "chat-system-71c01.firebasestorage.app",
  messagingSenderId: "74484635059",
  appId: "1:74484635059:web:1dcbe9b6a9320de86327c6",
  measurementId: "G-WSGMZTQNHY",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Инициализируем Firestore

export { auth, db };

// Функции для регистрации и входа
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Возвращает пользователя
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Возвращает пользователя
  } catch (error) {
    console.error(error);
    return null;
  }
};

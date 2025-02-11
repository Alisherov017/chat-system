import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm4ttSrJ62e9Wp8dgOjtfLGGuXCeJKAL8",
  authDomain: "chat-system-71c01.firebaseapp.com",
  projectId: "chat-system-71c01",
  storageBucket: "chat-system-71c01.firebasestorage.app",
  messagingSenderId: "74484635059",
  appId: "1:74484635059:web:1dcbe9b6a9320de86327c6",
  measurementId: "G-WSGMZTQNHY",
};

// Firebase initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// Functions for registration and login
export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    // Saving user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: user.email,
      createdAt: new Date(),
    });

    return { uid: user.uid, name, email: user.email };
  } catch (error) {
    console.error("Error registering user:", error);
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
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

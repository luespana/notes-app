import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTYnm1G32soOrSva8XojA0gZKbuv6J8Vw",
  authDomain: "notes-app-3aa5e.firebaseapp.com",
  projectId: "notes-app-3aa5e",
  storageBucket: "notes-app-3aa5e.appspot.com",
  messagingSenderId: "873513540738",
  appId: "1:873513540738:web:14285e137a041985bd689b",
  measurementId: "G-H49Q4HJW01",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const login = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res.user);
  } catch (error) {
    alert("error");
  }
};

export const authState = (callback: (arg0: any) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

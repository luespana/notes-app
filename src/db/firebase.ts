import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

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
const db = getFirestore(app);

export const login = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res.user);
  } catch (error) {
    throw new Error("Error");
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Error");
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

export const addData = async (col: string, data: any) => {
  const docRef = await addDoc(collection(db, col), data);
  return docRef.id;
};

export const updateByColAndId = async (col: string, id: string, data: any) => {
  try {
    const docRef = doc(db, col, id);
    await updateDoc(docRef, data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAll = async (col: string) => {
  const ref = collection(db, col);
  const snapshot = await getDocs(ref);
  const list = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return list;
};

export const getById = async (col: string, id: string) => {
  const docRef = doc(db, col, id);
  const data = await getDoc(docRef);
  return data.data();
};

export const deleteById = async (col: string, id: string) => {
  await deleteDoc(doc(db, col, id));
};

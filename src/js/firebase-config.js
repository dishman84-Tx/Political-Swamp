/**
 * Firebase Configuration & Initialization
 * Project: mission-political-swamp
 */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, onSnapshot, addDoc, query, orderBy, limit, where, serverTimestamp } from 'firebase/firestore';

// Firebase config for mission-political-swamp
const firebaseConfig = {
  apiKey: "AIzaSyBrCja2euNptyn_vquFL-8XW6J_ytIMfIM",
  authDomain: "mission-political-swamp.firebaseapp.com",
  projectId: "mission-political-swamp",
  storageBucket: "mission-political-swamp.firebasestorage.app",
  messagingSenderId: "639107633361",
  appId: "1:639107633361:web:e3467d720001a5ecdef5f0",
  measurementId: "G-8NE4F2TLB7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  app, auth, db, googleProvider,
  signInWithPopup, signOut, onAuthStateChanged,
  setPersistence, browserLocalPersistence,
  collection, doc, getDoc, getDocs, onSnapshot,
  addDoc, query, orderBy, limit, where, serverTimestamp
};

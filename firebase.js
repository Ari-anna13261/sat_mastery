import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqSytECatxNyfrNYq660vEEd9Av-bglRA",
  authDomain: "sat-mastery-b3d56.firebaseapp.com",
  projectId: "sat-mastery-b3d56",
  storageBucket: "sat-mastery-b3d56.firebasestorage.app",
  messagingSenderId: "1046169227010",
  appId: "1:1046169227010:web:717fd349dee5febbddbc1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase functions
export {
  auth,
  db,

  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,

  signOut,
  onAuthStateChanged,
  updateProfile
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL3vqBsLg8yV8iJ0NLTq2RLtB4KeRliN8",
  authDomain: "fitness-web-app-8e09e.firebaseapp.com",
  projectId: "fitness-web-app-8e09e",
  storageBucket: "fitness-web-app-8e09e.firebasestorage.app",
  messagingSenderId: "482367782304",
  appId: "1:482367782304:web:b91b8d8d548893251138c5",
  measurementId: "G-ZVGYEB3EXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export default app;

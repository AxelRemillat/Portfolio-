import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP_bDTSWsxPOfZ456zdCvVJSDW-9_YATI",
  authDomain: "bdd-portfolio-v1-axel.firebaseapp.com",
  projectId: "bdd-portfolio-v1-axel",
  storageBucket: "bdd-portfolio-v1-axel.firebasestorage.app",
  messagingSenderId: "866827431783",
  appId: "1:866827431783:web:1aceb2087f2e97fdbcc9c2",
  measurementId: "G-CES62W284J",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

console.log("[firebase] projectId =", app.options.projectId);

// ✅ important: databaseId = "default" (vu dans l’URL de la console)
export const db = getFirestore(app, "default");

export default app;

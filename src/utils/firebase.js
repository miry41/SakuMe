import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsKaQCN2havndr1lM2-4bNvTqAjojLfcc",
  authDomain: "sakume-e29ed.firebaseapp.com",
  projectId: "sakume-e29ed",
  storageBucket: "sakume-e29ed.firebasestorage.app",
  messagingSenderId: "285824559264",
  appId: "1:285824559264:web:c14b814c22217935dd81c5",
  measurementId: "G-PJR4V17891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
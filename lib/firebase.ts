import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQiXLdMx56V0aOSVIPOOAxRQzcn0_fCP8",
  authDomain: "sunwardfarms.firebaseapp.com",
  projectId: "sunwardfarms",
  storageBucket: "sunwardfarms.firebasestorage.app",
  messagingSenderId: "624270090065",
  appId: "1:624270090065:web:b7b8e696742b860164fd70"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);


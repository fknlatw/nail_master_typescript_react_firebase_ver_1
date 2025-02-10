import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: import.meta.env.VITE_NAIL_MASTER_APP_API_KEY,
  authDomain: "nail-master-ts-react-firebase.firebaseapp.com",
  projectId: "nail-master-ts-react-firebase",
  storageBucket: "nail-master-ts-react-firebase.firebasestorage.app",
  messagingSenderId: "241677701618",
  appId: "1:241677701618:web:84a0a3daee3683d8611b6b",
  measurementId: "G-H5D2BPP9X5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

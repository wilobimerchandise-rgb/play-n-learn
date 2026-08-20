import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy3Sa-tylCABjSYHcjuAL",
  authDomain: "play-n-learn-children.firebaseapp.com",
  projectId: "play-n-learn-children",
  storageBucket: "play-n-learn-children.appspot.com",
  messagingSenderId: "1068690248417",
  appId: "1:1068690248417:web:4b4da5b4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

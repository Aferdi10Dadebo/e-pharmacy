import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7lOr0w8xoCNfn2WXBlsh4v2UO3OmeERg",
  authDomain: "e-pharmacy-2475f.firebaseapp.com",
  projectId: "e-pharmacy-2475f",
  storageBucket: "e-pharmacy-2475f.appspot.com",
  messagingSenderId: "358241539069",
  appId: "1:358241539069:web:d03d1b53946b7aa04f7f94",
  measurementId: "G-4HGPZD0VSK",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

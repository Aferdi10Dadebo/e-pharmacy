import { initializeApp } from "firebase/app";
import { collection } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { initializeFirestore } from 'firebase/firestore';


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

// firebase services
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const auth = getAuth(app);
const storage = getStorage(app);



// collections 
const DEVICES = "devices";
const VENDORS = 'vendors';


// collection references
const devicesRef = collection(db, DEVICES);
const vendorsRef = collection(db, VENDORS);


export {
  storage,
  db,
  DEVICES,
  devicesRef,
  VENDORS,
  vendorsRef,
}

import { initializeApp } from "firebase/app";
import { collection } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { initializeFirestore } from "firebase/firestore";

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
const USERS = "users";
const VENDOR_ORDERS = "vendorOrders";
const VENDOR_PRODUCTS = "vendorProduct";
const VENDOR_MESSAGES = "vendorMessages";
const VENDOR_PROMOTIONS = "vendorPromotions";
const USER_MESSAGES = "userMessages";
const PRODUCTS = "products";

// collection references
const devicesRef = collection(db, DEVICES);
const usersRef = collection(db, USERS);
const vendorOrdersRef = collection(db, VENDOR_ORDERS);
const vendorProductsRef = collection(db, VENDOR_PRODUCTS);
const vendorMessagesRef = collection(db, VENDOR_MESSAGES);
const vendorPromotionsRef = collection(db, VENDOR_PROMOTIONS);
const userMessagesRef = collection(db, USER_MESSAGES);
const productsRef = collection(db, PRODUCTS);

export {
  storage,
  db,
  auth,
  DEVICES,
  devicesRef,
  USERS,
  usersRef,
  VENDOR_ORDERS,
  vendorOrdersRef,
  VENDOR_PRODUCTS,
  vendorProductsRef,
  VENDOR_MESSAGES,
  vendorMessagesRef,
  VENDOR_PROMOTIONS,
  vendorPromotionsRef,
  USER_MESSAGES,
  userMessagesRef,
  PRODUCTS,
  productsRef,
};

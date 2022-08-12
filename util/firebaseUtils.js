import { db } from "../config/firebase-config";

import { doc, updateDoc, setDoc, collection, addDoc } from "firebase/firestore";

export const createFirebaseCollection = async (collectionName, data) => {
  console.log(collectionName, data);

  try {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
  } catch (error) {
    throw error.message;
  }
};

export const createFirebaseCollectionWithId = async (
  collectionName,
  data,
  id
) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
  } catch (error) {
    throw error;
  }
};

export const updateFirebaseCollection = async (collectionName, data, id) => {
  try {
    const docRef = doc(db, collectionName, id);

    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};

import { db } from "../config/firebase-config";

import { doc, updateDoc, setDoc, collection, addDoc } from "firebase/firestore";

export const createFirebaseCollection = async (collectionName, dataObject) => {

    console.log(collectionName, dataObject)

  try {

    const collectionRef = collection(db, collectionName)

    await setDoc(doc(db, collectionName, collectionName), dataObject);
  } catch (error) {
    throw error.message;
  }
};

export const createFirebaseCollectionWithId = async (
  collectionName,
  dataObject,
  id
) => {
  try {
    await setDoc(doc(db, collectionName, id), dataObject);
  } catch (error) {
    throw error;
  }
};

export const updateFirebaseCollection = async (collectionName, dataObject) => {
  try {
    const docRef = doc(db, collectionName, dataObject);

    await updateDoc(docRef, dataObject);
  } catch (error) {
    throw error;
  }
};

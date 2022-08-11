import { createFirebaseCollectionWithId } from "../../util/firebaseUtils";

import { DEVICES, db, devicesRef } from "../../config/firebase-config";

import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

export const RegisterDevice = async (deviceInformation) => {
  try {
    createFirebaseCollectionWithId(
      DEVICES,
      deviceInformation,
      deviceInformation.deviceName
    );
  } catch (error) {
    console.log(error.message)
  }

};

export const TestFirebase = async (data) => {


  try {
    const getAttendants = async () => {
      const data = getDocs(devicesRef);
      const attendantsData = (await data).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(attendantsData);
    };
    getAttendants();
  } catch (error) {}
};

import {
  getAllDecives,
  getAllVendors,
  getAllPromotionRequests,
} from "../slices/AdminReducer";

import {
  DEVICES,
  db,
  devicesRef,
  VENDORS,
  vendorsRef,
} from "../../config/firebase-config";

import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const GetAllDevices = () => {
  return async (dispatch) => {
    try {
      const getDevices = async () => {
        const data = getDocs(devicesRef);
        const devicesData = (await data).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(getAllDecives(devicesData));
      };
      getDevices();
    } catch (error) {}
  };
};

export const GetAllVendors = (data) => {
  return async (dispatch) => {
    try {
      const getVendors = async () => {
        const data = getDocs(vendorsRef);
        const vendorsData = (await data).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(getAllVendors(vendorsData));
      };
      getVendors();
    } catch (error) {}
  };
};

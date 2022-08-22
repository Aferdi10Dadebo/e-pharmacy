import {
  getAllVendorProducts,
  getAllVendorOrders,
  getAllVendorMessages,
  getAllVendorPromotions,
} from "../slices/VendorReducer";

import {
  db,
  VENDOR_PRODUCTS,
  VENDOR_ORDERS,
  VENDOR_MESSAGES,
  VENDOR_PROMOTIONS,
} from "../../config/firebase-config";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export const GetVendorProducts = (id) => {
  return async (dispatch) => {
    try {
      docRef = doc(db, VENDOR_PRODUCTS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorProducts = docSnap.data();
        dispatch(getAllVendorProducts(vendorProducts.products));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      throw error;
    }
  };
};

export const GetVendorOrders = (id) => {
  return async (dispatch) => {
    try {
      docRef = doc(db, VENDOR_ORDERS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorOrders = docSnap.data();
        dispatch(getAllVendorOrders(vendorOrders.orders));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      throw error;
    }
  };
};

export const GetVendorMessages = (id) => {
  return async (dispatch) => {
    try {
      docRef = doc(db, VENDOR_MESSAGES, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorMessages = docSnap.data();
        dispatch(getAllVendorMessages(vendorMessages.messages));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      throw error;
    }
  };
};

export const GetVendorPromotions = (id) => {
  return async (dispatch) => {
    try {
      docRef = doc(db, VENDOR_PROMOTIONS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorPromotions = docSnap.data();
        dispatch(getAllVendorPromotions(vendorPromotions.promotions));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      throw error;
    }
  };
};

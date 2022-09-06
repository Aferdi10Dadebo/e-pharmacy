import {
  getAllVendorProducts,
  getAllVendorOrders,
  getAllVendorMessages,
  getAllVendorPromotions,
  createProductStart,
  createProductSuccess,
  createProductError,
  approveOrderStart,
  approveOrderSuccess,
  approveOrderError,
  declineOrderStart,
  declineOrderSuccess,
  declineOrderError,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductError,
} from "../slices/VendorReducer";

import {
  db,
  VENDOR_PRODUCTS,
  VENDOR_ORDERS,
  VENDOR_MESSAGES,
  VENDOR_PROMOTIONS,
  USER_MESSAGES,
  PRODUCTS,
  USER_NOTIFICATIONS,
} from "../../config/firebase-config";

import { doc, getDoc, arrayUnion, writeBatch } from "firebase/firestore";
import { async } from "@firebase/util";

export const GetVendorProducts = (id) => {
  return async (dispatch) => {
    try {
      docRef = doc(db, VENDOR_PRODUCTS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorProducts = docSnap.data();
        dispatch(getAllVendorProducts(vendorProducts));
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
        dispatch(getAllVendorOrders(vendorOrders));
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
        dispatch(getAllVendorMessages(vendorMessages));
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

// UpdateIsRead -> sets chat isRead for each chat object to true
export const SendMessage = (
  v_id,
  c_id,
  vendor_key,
  user_key,
  vendor_name,
  vendor_image,
  chat
) => {
  return async (dispatch) => {
    // console.log(
    //   v_id,
    //   c_id,
    //   vendor_key,
    //   user_key,
    //   vendor_name,
    //   vendor_image,
    //   chat
    // );
    try {
      // Get a new write batch
      const batch = writeBatch(db);
      // update vendor messages
      const vendorRef = doc(db, VENDOR_MESSAGES, v_id);
      batch.update(vendorRef, {
        [`${user_key}.chat`]: arrayUnion(chat),
      });
      // update user messages
      const userRef = doc(db, USER_MESSAGES, c_id);
      batch.set(
        userRef,
        {
          [`${vendor_key}`]: {
            chat: arrayUnion(chat),
            name: vendor_name,
            image: vendor_image,
            sender_id: v_id,
            unread: 1,
          },
        },
        {
          merge: true,
        }
      );
      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.log(error.message);
    }
  };
};

// CreateVendorProduct -> using merge on setDoc works as a create and update if the document already exist
export const CreateProduct = (id, product, productStore) => {
  return async (dispatch) => {
    dispatch(createProductStart());

    try {
      // Get a new write batch
      const batch = writeBatch(db);

      // store to vendorProducts
      const productsRef = doc(db, VENDOR_PRODUCTS, id);
      batch.set(
        productsRef,
        {
          [`${product.id}`]: product,
        },
        {
          merge: true,
        }
      );

      // store to all products for user to be able to get the various products
      const productStoreRef = doc(db, PRODUCTS, product.id);
      batch.set(
        productStoreRef,
        {
          ...product,
          ...productStore,
        },
        {
          merge: true,
        }
      );

      batch
        .commit()
        .then(() => dispatch(createProductSuccess({ message: "Success" })))
        .catch((error) =>
          dispatch(createProductError({ message: error.code }))
        );
    } catch (error) {
      console.log(error.message);
      dispatch(createProductError({ message: error.message }));
    }
  };
};

export const ApproveOrder = (id, order_key, notification_key, order) => {
  return async (dispatch) => {
    dispatch(approveOrderStart());

    try {
      // Get a new write batch
      const batch = writeBatch(db);

      // store to vendorProducts
      const orderRef = doc(db, VENDOR_ORDERS, id);

      batch.update(orderRef, {
        [`${order_key}.order_status`]: "Approved",
      });

      // notifcation
      const notificationRef = doc(db, USER_NOTIFICATIONS, order.by_id);
      batch.set(
        notificationRef,
        {
          [`${notification_key}`]: {
            order_on: order.order_on,
            order_status: "Approved",
            order_name: order.item_name,
            order_price: order.item_price,
            order_id: order.id,
            date: new Date(),
          },
        },
        {
          merge: true,
        }
      );

      // Commit the batch
      await batch
        .commit()
        .then(() => {
          dispatch(approveOrderSuccess({ message: "Order Approved" }));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(approveOrderError({ message: err.message }));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(approveOrderError({ message: error.message }));
    }
  };
};

export const DeclineOrder = (id, order_key, notification_key, order) => {
  return async (dispatch) => {
    dispatch(declineOrderStart());

    try {
      // Get a new write batch
      const batch = writeBatch(db);

      // store to vendorProducts
      const orderRef = doc(db, VENDOR_ORDERS, id);

      batch.update(orderRef, {
        [`${order_key}.order_status`]: "Rejected",
      });

      // notifcation
      const notificationRef = doc(db, USER_NOTIFICATIONS, order.by_id);
      batch.set(
        notificationRef,
        {
          [`${notification_key}`]: {
            order_on: order.order_on,
            order_status: "Rejected",
            order_name: order.item_name,
            order_price: order.item_price,
            order_id: order.id,
            date: new Date(),
          },
        },
        {
          merge: true,
        }
      );

      // Commit the batch
      await batch
        .commit()
        .then(() => {
          dispatch(declineOrderSuccess({ message: "Order Rejected" }));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(declineOrderError({ message: err.message }));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(declineOrderError({ message: error.message }));
    }
  };
};

export const DeleteProduct = (id) => {
  return async (dispatch) => {
    try {
      


    } catch (error) {
      console.log(error.message);
    }
  };
};

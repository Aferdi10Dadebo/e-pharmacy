import {
  db,
  usersRef,
  productsRef,
  VENDOR_PRODUCTS,
  VENDOR_MESSAGES,
  USER_MESSAGES,
  VENDOR_ORDERS,
  USER_NOTIFICATIONS,
} from "../../config/firebase-config";

import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  writeBatch,
} from "firebase/firestore";

import {
  addToCartStart,
  addToCartSuccess,
  addToCartError,
  addNotifcations,
  checkOutStart,
  checkOutError,
  checkOutSuccess,
} from "../slices/MainReducer";

export const GetVendors = async () => {
  const q = query(usersRef, where("role", "==", "vendor"));
  const data = getDocs(q);
  const vendorsData = (await data).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vendorsData;
};

export const GetProducts = async () => {
  const q = query(productsRef);
  const data = getDocs(q);
  const vendorProducts = (await data).docs.map((doc) => ({
    ...doc.data(),
  }));

  return vendorProducts;
};

export const GetVendorProducts = async (id) => {
  var docRef = doc(db, VENDOR_PRODUCTS, id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else return [];
};

// UpdateIsRead -> sets chat isRead for each chat object to true
export const SendMessage = (
  u_id,
  v_id,
  vendor_key,
  user_key,
  vendor_name,
  vendor_image,
  user_name,
  user_image,
  chat
) => {
  return async (dispatch) => {
    try {
      // Get a new write batch
      const batch = writeBatch(db);
      // update user messages
      const userRef = doc(db, USER_MESSAGES, u_id);
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

      // update vendor messages
      const vendorRef = doc(db, VENDOR_MESSAGES, v_id);
      batch.set(
        vendorRef,
        {
          [`${user_key}`]: {
            chat: arrayUnion(chat),
            name: user_name,
            image: user_image,
            sender_id: u_id,
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

export const AddToCart = (item) => {
  return async (dispatch) => {
    dispatch(addToCartStart());

    dispatch(addToCartSuccess(item));
  };
};

export const CheckOut = (v_id, u_id, order_key, notification_key, order) => {
  return async (dispatch) => {

    console.log(v_id, order_key, notification_key, order);

    dispatch(checkOutStart());

    try {
      // Get a new write batch
      const batch = writeBatch(db);

      // update vendor orders
      const userRef = doc(db, VENDOR_ORDERS, v_id);
      batch.set(
        userRef,
        {
          [`${order_key}`]: {
            ...order,
          },
        },
        {
          merge: true,
        }
      );

      // set user notifications
      const notificationRef = doc(db, USER_NOTIFICATIONS, u_id);
      batch.set(
        notificationRef,
        {
          [`${notification_key}`]: {
            order_on: order.order_on,
            order_status: order.order_status,
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
      await batch.commit().then(() => {
        dispatch(checkOutSuccess({ message: "Order placed" }));
      }).catch((err) => {
        console.log(err.message);
        dispatch(checkOutError({ message: err.message }));
      });
    } catch (error) {
      console.log(error.message);
      dispatch(checkOutError({ message: error.message }));
    }
  };
};

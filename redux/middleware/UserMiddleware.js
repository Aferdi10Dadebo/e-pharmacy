import {
  DEVICES,
  db,
  auth,
  devicesRef,
  USERS,
  usersRef,
  vendorProductsRef,
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
  query,
  where,
} from "firebase/firestore";

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
  const q = query(vendorProductsRef);
  const data = getDocs(q);
  const vendorProducts = (await data).docs.map((doc) => ({
    ...doc.data(),
  }));

 console.log(JSON.stringify(vendorProducts, null, 2))

  return vendorProducts;
};

// export const GetPromotions = () => {
//   return async (dispatch) => {
//     try {
//       const getVendors = async () => {
//         const q = query(usersRef, where("role", "==", "vendor"));
//         const data = getDocs(q);
//         const vendorsData = (await data).docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));

//         return vendorsData;
//       };
//       getVendors();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

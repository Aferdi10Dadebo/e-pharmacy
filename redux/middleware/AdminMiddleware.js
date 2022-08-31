import {
  getAllDecives,
  getAllVendors,
  getAllPromotionRequests,
  createVendorStart,
  createVendorSuccess,
  createVendorError,
  deactivateVendorStart,
  deactivateVendorSuccess,
  deactivateVendorError,
} from "../slices/AdminReducer";

import {
  DEVICES,
  db,
  devicesRef,
  USERS,
  usersRef,
  auth,
} from "../../config/firebase-config";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
        const q = query(usersRef, where("role", "==", "vendor"));
        const data = getDocs(q);
        const vendorsData = (await data).docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(getAllVendors(vendorsData));
      };
      getVendors();
    } catch (error) {
      console.log(error);
    }
  };
};

export const CreateVendor = (data) => {
  return async (dispatch) => {
    console.log(JSON.stringify(data, null, 2));

    dispatch(createVendorStart());

    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.confirmPassword
      )
        .then((u) => {
          // create firebase doc for user
          const userReference = doc(db, USERS, data.email);
          setDoc(userReference, {
            ...data,
            created_at: new Date(),
            updated_at: new Date(),
            image: "",
            uid: u.user.uid,
            status: "active",
            role: "vendor",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0ig-MMf6uNZl4J7EZMFIyggEH3C-YVHAiw&usqp=CAU",
          })
            .then(() => {
              dispatch(createVendorSuccess({ message: "success" }));
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(createVendorError({ message: error.code }));
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(createVendorError({ message: error.code }));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(createVendorError({ message: error.message }));
    }
  };
};

export const DeactivateVendor = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deactivateVendorStart());
      const docRef = doc(db, USERS, id);

      await updateDoc(docRef, { status: "disabled" })
        .then(() => {
          dispatch(
            deactivateVendorSuccess({
              message: "deactivated vendor successfully",
            })
          );
        })
        .catch((error) => {
          dispatch(deactivateVendorError({ message: error.code }));
        });
    } catch (error) {
      dispatch(deactivateVendorError({ message: error.message }));
    }
  };
};

export const ActivateVendor = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deactivateVendorStart());
      const docRef = doc(db, USERS, id);

      await updateDoc(docRef, { status: "active" })
        .then(() => {
          dispatch(
            deactivateVendorSuccess({
              message: "activated vendor successfully",
            })
          );
        })
        .catch((error) => {
          dispatch(deactivateVendorError({ message: error.code }));
        });
    } catch (error) {
      dispatch(deactivateVendorError({ message: error.message }));
    }
  };
};

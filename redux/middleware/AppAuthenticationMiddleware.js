import { Roles } from "../../constants/Roles";
import {
  goToAdmin,
  goToLoading,
  goToAuth,
  goToMainApp,
  goToVendor,
} from "../slices/NavigationReducer";

import {
  loginStart,
  loginSuccess,
  loginError,
  signupStart,
  signupSuccess,
  signupError,
  logoutStart,
  logoutSuccess,
  logoutError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordError,
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsError,
  resetActionType,
} from "../slices/AuthenticationReducer";

import {
  DEVICES,
  db,
  auth,
  devicesRef,
  USERS,
  usersRef,
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

import {
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  getAuth,
  signOut,
} from "@firebase/auth";

import { async } from "@firebase/util";

export const LoginMiddleware = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        checkUser(email).then((userData) => {
          if (userData === "error") {
            dispatch(loginError({ message: "User does not exist" }));
            return;
          }
          dispatch(loginSuccess(userData));
          dispatch(RouteToAppropraiteStack(userData.role));
        });
      })
      .catch((error) => {
        dispatch(loginError({ message: error.code }));
      });
  };
};

/*
 *  This checks user  and returns the user data if the user exists and error if the user does not exist
 */
const checkUser = async (id) => {
  try {
    docRef = doc(db, USERS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
    } else {
      console.log("No such document!");
      return "error";
    }
  } catch (error) {
    throw error;
  }
};

export const LogoutMiddleware = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    signOut(auth)
      .then(() => {
        dispatch(logoutSuccess());
        dispatch(goToAuth());
      })
      .catch((error) => {
        dispatch(logoutError({ message: error.code }));
      });
  };
};

export const RouteToAppropraiteStack = (role) => {
  return function (dispatch) {
    switch (role) {
      case Roles.ADMIN:
        console.log("goToAdmin");
        dispatch(goToAdmin());
        break;

      case Roles.VENDOR:
        console.log("goToVendor");
        dispatch(goToVendor());
        break;

      case Roles.USER:
      case Roles.GUEST:
        console.log("goToMainApp");
        dispatch(goToMainApp());
        break;

      default:
        dispatch(goToAuth());
        break;
    }
  };
};

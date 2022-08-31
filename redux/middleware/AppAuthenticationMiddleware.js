import { Roles } from "../../constants/Roles";
import {
  goToAdmin,
  goToLoading,
  goToAuth,
  goToMainApp,
  goToVendor,
} from "../slices/NavigationReducer";

import { clearVendor } from "../slices/VendorReducer";

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
  updateUserStart,
  updateUserSuccess,
  updatePasswordSuccess,
  updateUserError,
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
  createUserWithEmailAndPassword,
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
        dispatch(clearVendor());
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

// update user profile
export const UpdateUser = (data) => {
  return async (dispatch) => {
    dispatch(updateUserStart());

    try {
      const ref = doc(db, USERS, data.email);
      await updateDoc(ref, { ...data, update_at: new Date() }).then(() => {
        checkUser(data.email).then((userData) => {
          dispatch(
            updateUserSuccess({
              message: "Updated Profile Successfully",
              user: userData,
            })
          );
        });
      });
    } catch (error) {
      /* Dispatching an action to the reducer. */
      dispatch(updateUserError({ message: error.message }));
    }
  };
};

// change user password
export const ChangePassword = (oldPassword, newPassword) => {
  console.log(oldPassword, newPassword);

  return async (dispatch) => {
    dispatch(updateUserStart());
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    try {
      await reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              dispatch(updatePasswordSuccess({ message: "Password updated successfully" }));
            })
            .catch((error) => {
              console.log(error.message);
              dispatch(updateUserError({ message: error.message }));
            });
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(updateUserError({ message: error.code }));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(updateUserError({ message: error.message }));
    }
  };
};



// sign up 
export const SignupMiddleware = (data) => {
  return async (dispatch) => {
    console.log(JSON.stringify(data, null, 2));

    dispatch(signupStart());

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
            uid: u.user.uid,
            status: "active",
            role: "user",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0ig-MMf6uNZl4J7EZMFIyggEH3C-YVHAiw&usqp=CAU",
          })
            .then(() => {
              dispatch(signupSuccess({ message: "success" }));
            })
            .catch((error) => {
              const errorMessage = error.message;
              dispatch(signupError({ message: error.code }));
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(signupError({ message: error.code }));
        });
    } catch (error) {
      console.log(error.message);
      dispatch(signupError({ message: error.message }));
    }
  };
}
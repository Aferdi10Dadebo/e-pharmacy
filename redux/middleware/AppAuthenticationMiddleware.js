import { Roles } from "../../constants/Roles";
import {
  goToAdmin,
  goToLoading,
  goToAuth,
  goToMainApp,
  goToVendor,
} from "../slices/NavigationReducer";

export const AuthenticateMiddleware = (as) => {
  return (dispatch) => {
    dispatch(RouteToAppropraiteStack(as));
  };
};

export const LoginMiddleware = () => {
  return (dispatch) => {};
};

export const LogoutMiddleware = () => {
  return (dispatch) => {
    dispatch(goToAuth());
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

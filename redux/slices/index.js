import { combineReducers } from "redux";

import NavigationReducer from "./NavigationReducer";
import AdminReducer from "./AdminReducer";
import AuthenticationReducer from "./AuthenticationReducer";
import VendorReducer from "./VendorReducer";

export default combineReducers({
  navigation: NavigationReducer,
  admin: AdminReducer,
  auth: AuthenticationReducer,
  vendor: VendorReducer,
});

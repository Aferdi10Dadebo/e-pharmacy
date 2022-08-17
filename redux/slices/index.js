import { combineReducers } from "redux";

import NavigationReducer from "./NavigationReducer";
import AdminReducer from "./AdminReducer";

export default combineReducers({
  navigation: NavigationReducer,
  admin: AdminReducer
});

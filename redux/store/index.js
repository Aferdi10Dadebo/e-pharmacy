import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootReducer from "../slices";

//redux persist imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = getDefaultMiddleware({
  // https://github.com/reduxjs/redux-toolkit/issues/415
  immutableCheck: false,
  serializableCheck: false,
});

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
export default store;

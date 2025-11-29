/*
  This files deals with stores for redux
*/

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "./features/auth/authSlice";
import plantReducer from "./features/plants/plantSlice";
import assetGroupReducer from "./features/assetGroup/assetGroup";
import assetsReducer from "./features/assets/assetSlice";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  plantReducer,
  assetGroupReducer,
  assetsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

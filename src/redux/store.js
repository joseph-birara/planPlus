import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from '../featurs/user/userSlice'
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    User: persistedReducer,
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
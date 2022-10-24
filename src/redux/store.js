import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "../featurs/user/userSlice";
import TaskReducer from "../featurs/tasks/TaskSlice";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};
const rootReducer = combineReducers({ 
  User: userReducer,
  Task: TaskReducer
})
const persisteduser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisteduser
    
});

export const persistor = persistStore(store);
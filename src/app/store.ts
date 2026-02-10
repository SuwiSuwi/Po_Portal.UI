// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ใช้ localStorage เป็น storage
import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";

// กำหนด persistConfig สำหรับแต่ละ reducer ที่เราต้องการ persisting
const persistConfig = {
  key: "auth", // ชื่อ key ใน localStorage
  storage, // ใช้ localStorage ในการเก็บข้อมูล
  whitelist: ["isAuthenticated", "token", "expiryDate", "user", "menuactive"], // กำหนดว่าเฉพาะ auth ที่จะถูก persisting
};

// ผสม reducer โดยใช้ combineReducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer), // ใช้ persistReducer สำหรับ auth
});

// สร้าง store พร้อม middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ปิด serializableCheck
    }),
  //.concat(middlewares),
});

// สร้าง persistor
export const persistor = persistStore(store);

// Export RootState และ AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store
export default store;

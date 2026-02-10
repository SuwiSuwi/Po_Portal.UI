// src/slices/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// กำหนดค่าเริ่มต้นของ state
const initialState: Auth = {
  token: null,
  isAuthenticated: false,
  expiryDate: null,
  user: null,
  menuactive: 0,
};

// สร้าง slice สำหรับการจัดการ authentication
const authSlice = createSlice({
  name: "auth", // ชื่อ slice
  initialState,
  reducers: {
    // ตั้งค่าข้อมูลการล็อกอิน (เช่น token และ user)
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        expiryDate: number;
        user: {
          userid: number;
          username: string;
          group: string;
          groupid: number;
          email: string;
          company: string;
        };
      }>
    ) => {
      state.token = btoa(action.payload.token);
      state.isAuthenticated = true;
      state.expiryDate = action.payload.expiryDate; // บันทึกวันหมดอายุ
      state.user = action.payload.user;
    },
    // การออกจากระบบ (logout)
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.expiryDate = null;
      state.user = null;
      state.menuactive = 10;
    },
    // ตั้งค่าหน้าเมนูที่กำลังใช้งานอยู่
    setMenuactive: (state, action: PayloadAction<number>) => {
      state.menuactive = action.payload; // กำหนดค่าให้ menu active
    },
    // อัปเดต email โดยไม่กระทบ token
    updateUserEmail: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    // อัปเดต company โดยไม่กระทบ token
    updateUserCompany: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.company = action.payload;
      }
    },
  },
});

// ส่งออก actions สำหรับใช้ใน components
export const {
  setCredentials,
  setMenuactive,
  logout,
  updateUserEmail,
  updateUserCompany,
} = authSlice.actions;

// ส่งออก reducer สำหรับใช้ใน store
export default authSlice.reducer;

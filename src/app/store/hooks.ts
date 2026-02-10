// src/store/hooks.ts

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../store";

// Custom hook สำหรับการใช้ dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// สร้าง custom hook เพื่อเข้าถึง state จาก Redux store พร้อมกับการใช้ type-checking
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

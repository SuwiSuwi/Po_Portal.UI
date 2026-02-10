// hooks/useTokenExpiry.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";

// Custom Hook ตรวจสอบ Token หมดอายุ
const useTokenExpiry = (auth: Auth) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    checkTokenExpiry();
  }, [auth, navigate]);

  const checkTokenExpiry = () => {
    if (auth.token) {
      const isExpired = Date.now() >= auth.expiryDate!;

      if (isExpired) {
        dispatch(logout());
        navigate("/login"); // นำทางไปหน้า Login
      }
    } else {
      // ไม่มี Token ก็นำทางไป Login เช่นกัน
      navigate("/login");
    }
  };
};

export default useTokenExpiry;

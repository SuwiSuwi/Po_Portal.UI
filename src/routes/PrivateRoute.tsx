import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store/hooks"; // ดึง State จาก Redux Store
import DefaultLayout from "../components/layouts/DefaultLayout";

interface PrivateRouteProps {
  redirectTo?: string; // URL ที่จะ redirect หากไม่มีสิทธิ์
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/login",
}) => {
  return useAppSelector((state) => state.auth.isAuthenticated) ? (
    <DefaultLayout />
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;

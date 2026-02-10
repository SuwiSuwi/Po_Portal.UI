// src/components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/store/hooks";
import BlankLayout from "../components/layouts/BlankLayout";

interface PublicRouteProps {
  //children: React.ReactNode;
  redirectTo?: string; // เส้นทางที่ต้องการเปลี่ยนเมื่อผู้ใช้ล็อกอิน
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  //children,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  // หากล็อกอินอยู่ ให้เปลี่ยนไปยังเส้นทางที่กำหนด
  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  // หากยังไม่ล็อกอิน ให้แสดง children (เช่น หน้า login/register)
  return <BlankLayout />;
};

export default PublicRoute;

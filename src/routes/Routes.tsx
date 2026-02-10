// src/routes/Routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../pages/common/NotFoundPage";
import Dashboard from "../pages/dashboard/dashboard";
import Customer from "../pages/master/customer/Customer";
import Recipient from "../pages/master/recipient/Recipient";
import Status from "../pages/master/status/Status";
import Confirmpo from "../pages/confirmpo/Confirmpo";
import Notification from "../pages/notification/Notification";
import Poconfirm from "../pages/poconfirm/Poconfirm";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      {/* ใช้ PublicRoute สำหรับหน้า Login (BlankLayout) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<h1>Login Page</h1>} />
      </Route>

      {/* ใช้ PrivateRoute สำหรับหน้าที่ต้อง Authentication (DefaultLayout with Sidebar & Navbar) */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/administration/user-management"
          element={<h1>User Management</h1>}
        />
        <Route path="/confirmpo" element={<Confirmpo />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/recipient" element={<Recipient />} />
        <Route path="/poconfirm" element={<Poconfirm />} />
        <Route path="/status" element={<Status />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;

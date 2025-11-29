import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AuthProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state?.auth);
  return isAuthenticated ? (
    <div className="bg">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoutes;

import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

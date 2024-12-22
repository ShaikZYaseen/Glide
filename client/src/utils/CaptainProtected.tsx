import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const CaptainProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return children ? <>{children}</> : <Outlet />;
};

export default CaptainProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem("authToken");
    return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;

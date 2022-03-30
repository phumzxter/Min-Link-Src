import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../Context";

function PrivateRoute({ children }) {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { isAuth } = state;

  if (
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/register"
  ) {
    if (isAuth) {
      return <Navigate to="/user" />;
    }
    return children;
  } else {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  }
}

export default PrivateRoute;

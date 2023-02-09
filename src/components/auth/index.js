import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Auth({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin && (isLogin === true || isLogin === "true")) {
      navigate("/");
    } else {
      pathname.includes("signup") ? navigate("/signup") : navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
}

export default Auth;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "../../jwtservice/jwtService";

function Auth({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (jwt.isLogin()) {
      navigate("/dashboard");
    } else {
      pathname.includes("signup") ? navigate("/signup") : navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
}

export default Auth;

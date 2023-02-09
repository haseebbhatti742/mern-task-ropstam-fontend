import React from "react";
import { useNavigate } from "react-router-dom";
import jwt from "../jwtservice/jwtService";
import { AppContextProvider } from "./AppContext";

function AppContextContainer({ children }) {
  const navigate = useNavigate();

  //signup function
  const signup = (payload) => {
    jwt
      .singup(payload)
      .then((response) => {})
      .catch((error) => {});
  };

  //login function
  const login = (payload) => {
    localStorage.setItem("isLogin", true);
    navigate("/");
    // jwt
    //   .login(payload)
    //   .then((response) => {})
    //   .catch((error) => {});
  };

  //login function
  const logout = (payload) => {
    localStorage.setItem("isLogin", false);
    navigate("/login");
  };

  const contextValues = {
    login,
    signup,
    logout,
  };

  return (
    <AppContextProvider value={contextValues}>{children}</AppContextProvider>
  );
}

export default AppContextContainer;

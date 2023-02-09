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
    navigate("/dashboard");
    // jwt
    //   .login(payload)
    //   .then((response) => {})
    //   .catch((error) => {});
  };

  //logout function
  const logout = (payload) => {
    localStorage.setItem("isLogin", false);
    navigate("/");
  };

  //add new category function
  const addCategory = (payload) => {
    alert("Category Added: " + payload);
  };

  const contextValues = {
    login,
    signup,
    logout,
    addCategory,
  };

  return (
    <AppContextProvider value={contextValues}>{children}</AppContextProvider>
  );
}

export default AppContextContainer;

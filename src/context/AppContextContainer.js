import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "../jwtservice/jwtService";
import { AppContextProvider } from "./AppContext";

function AppContextContainer({ children }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  //signup function
  const signup = (payload) => {
    jwt
      .signup(payload)
      .then((response) => {
        setModalTitle("Success");
        setModalMessage(response.data.user);
        setOpenModal(true);
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //login function
  const login = (payload) => {
    jwt
      .login(payload)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("isLogin", true);
          localStorage.setItem(
            "accessToken",
            response.data.tokens.access.token
          );
          localStorage.setItem("user", response.data.user);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //logout function
  const logout = () => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("accessToken", null);
    localStorage.setItem("user", null);
    navigate("/");
  };

  //add new category function
  const addCategory = (payload) => {
    jwt
      .addNewCategory({ name: payload })
      .then((response) => {
        if (response.status === 201) {
          getAllCategories();
          alert("Category added successfully");
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //get All caetgrories function
  const getAllCategories = () => {
    jwt
      .getAllCategories()
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data);
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //delete caetgrory function
  const updateCategory = (id, name) => {
    jwt
      .updateCategory(id, { name })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getAllCategories();
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //delete caetgrory function
  const deleteCategory = (id) => {
    jwt
      .deleteCategory(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getAllCategories();
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  const handleErrorResponse = (error) => {
    setModalTitle("Error");
    setModalMessage(error.response.data.message);
    setOpenModal(true);
    if (error.response.status === 401) {
      navigate("/");
    }
  };

  const contextValues = {
    login,
    signup,
    logout,
    addCategory,
    openModal,
    setOpenModal,
    modalTitle,
    modalMessage,
    getAllCategories,
    categories,
    deleteCategory,
    updateCategory,
  };

  return (
    <AppContextProvider value={contextValues}>{children}</AppContextProvider>
  );
}

export default AppContextContainer;

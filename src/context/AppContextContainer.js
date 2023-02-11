import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "../jwtservice/jwtService";
import { AppContextProvider } from "./AppContext";

function AppContextContainer({ children }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);

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
          jwt.setLogin()
          jwt.setUser(response.data.user)
          jwt.setToken(response.data.tokens.access.token)
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //logout function
  const logout = () => {
    jwt.logout()
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

  //update caetgrory function
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

  //add car function
  const addCar = (payload) => {
    jwt
      .addNewCar(payload)
      .then((response) => {
        if(response.status === 201) {
          alert("Car Registered Successfully")
          navigate("/dashboard")
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      })
  }

  //get All cars function
  const getAllCars = () => {
    jwt
      .getAllCars()
      .then((response) => {
        if (response.status === 200) {
          setCars(response.data);
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //update caetgrory function
  const updateCar = (id, payload) => {
    jwt
      .updateCar(id, payload)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          navigate("/dashboard")
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
      });
  };

  //delete car function
  const deleteCar = (id) => {
    jwt
      .deleteCar(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getAllCars();
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
    setModalTitle,
    modalMessage,
    setModalMessage,
    getAllCategories,
    categories,
    deleteCategory,
    updateCategory,
    addCar,
    cars,
    getAllCars,
    updateCar,
    deleteCar
  };

  return (
    <AppContextProvider value={contextValues}>{children}</AppContextProvider>
  );
}

export default AppContextContainer;

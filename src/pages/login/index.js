import React from "react";
import "./styles.scss";
import { Button, FormHelperText, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginSchema } from "../../validation";
import { Formik } from "formik";
import useAppcContext from "../../context/useAppContext";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const { login } = useAppcContext();

  const onSubmit = (values) => {
    console.log(values);
    login(values);
  };

  return (
    <div className="main-page">
      <h2>Login Here</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="email"
              type="text"
              placeholder="Enter email"
              variant="outlined"
              className="input"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              variant="outlined"
              className="input"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
            <Button
              type="submit"
              variant="outlined"
              className="button"
              disabled={!isValid}
            >
              Login
            </Button>
            <FormHelperText className="helper-text">
              Don't have account ?{" "}
              <Link to="/signup" className="span">
                Signup Now
              </Link>
            </FormHelperText>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;

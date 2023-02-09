import { Button, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SignupSchema } from "../../validation";
import { Formik } from "formik";

import "./styles.scss";

const initialValues = {
  name: "",
  email: "",
};

function Signup() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="main-page">
      <h2>Signup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              placeholder="Enter Name"
              variant="outlined"
              className="input"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter Email"
              variant="outlined"
              className="input"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
            <Button
              type="submit"
              variant="outlined"
              className="button"
              disabled={!isValid}
            >
              Signup
            </Button>
            <FormHelperText className="helper-text">
              Already have an account ?{" "}
              <Link to="/login" className="span">
                Login Here
              </Link>
            </FormHelperText>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

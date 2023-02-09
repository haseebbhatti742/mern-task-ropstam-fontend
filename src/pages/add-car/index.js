import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import {CarSchema} from "../../validation"
import { Formik } from "formik";

const initialValues = {
  categoryId: "",
  registrationNumber: "",
  make: "",
  model: 0,
  color: ""
}

const spanStyle = {color:"red"}

function AddCar() {

  const onSubmit = (values) => {}

  return (
    <React.Fragment>
      <Formik initialValues={initialValues} validationSchema={CarSchema} onSubmit={onSubmit}>
        {({values, errors, handleChange, handleSubmit, isValid}) => (
          <form onSubmit={handleSubmit}>
            <Grid container pt={5}>
              <Grid item xs={3} sm={3} mr={3}>
                <TextField
                  id="registrationNumber"
                  label="Registration Number"
                  placeholder="Enter Registration Number"
                  sx={{ width: "100%" }}
                  value={values.registrationNumber}
                  onChange={handleChange}
                />
                {errors.registrationNumber && <span style={spanStyle}>{errors.registrationNumber}</span>}
              </Grid>
              <Grid item xs={3} sm={3} mr={3}>
                <TextField
                  id="make"
                  label="Make"
                  placeholder="Enter Make"
                  sx={{ width: "100%" }}
                  value={values.make}
                  onChange={handleChange}
                />
                {errors.make && <span style={spanStyle}>{errors.make}</span>}
              </Grid>
              <Grid item xs={3} sm={3} mr={3}>
                <TextField
                  id="model"
                  label="Model"
                  placeholder="Enter model"
                  sx={{ width: "100%" }}
                  value={values.model}
                  onChange={handleChange}
                />
                {errors.model && <span style={spanStyle}>{errors.model}</span>}
              </Grid>
              <Grid item xs={1} sm={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ width: "100%", height: "100%" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
}

export default AddCar;

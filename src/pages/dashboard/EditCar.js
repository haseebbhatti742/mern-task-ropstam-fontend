import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../context/useAppContext";
import { CarSchema } from "../../validation";

function EditCar (){
    const navigate = useNavigate();
    const {state} = useLocation();
    const {categories, updateCar} = useAppContext();
    const [initialValues] = useState({
        ...state,
        category: state.category.id
    })

    const onSubmit = (values) => {
        updateCar(state.id, values)
    };

    return (
        <>
            <Button 
                variant="outlined" 
                color="success" 
                onClick={() => navigate("/dashboard")}
            >Go Back</Button>
            <Formik
                initialValues={initialValues}
                validationSchema={CarSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, handleChange, handleSubmit, isValid }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container pt={1}>
                    <Grid item xs={5} sm={5} mr={3}>
                        <Select 
                        id="category" 
                        labelId="categoryLabel" 
                        name="category"
                        label="Category"
                        className="input-select"
                        value={values.category}
                        onChange={handleChange}
                        >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((item) => (
                            <MenuItem 
                            key={item.id} 
                            value={item.id}
                            >
                            {item.name}
                            </MenuItem>
                        ))}
                        </Select>
                        {errors.category && (
                        <span className="span">{errors.category}</span>
                        )}
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <TextField
                        id="registrationNumber"
                        name="registrationNumber"
                        label="Registration Number"
                        placeholder="Enter Registration Number"
                        className="input-select"
                        value={values.registrationNumber}
                        onChange={handleChange}
                        />
                        {errors.registrationNumber && (
                        <span className="span">{errors.registrationNumber}</span>
                        )}
                    </Grid>
                    <Grid item xs={3} sm={3} mr={3.7}>
                        <TextField
                        id="make"
                        name="make"
                        label="Make"
                        placeholder="Enter Make"
                        className="input-select"
                        value={values.make}
                        onChange={handleChange}
                        />
                        {errors.make && <span className="span">{errors.make}</span>}
                    </Grid>
                    <Grid item xs={3.6} sm={3.6} mr={3.7}>
                        <TextField
                        id="model"
                        label="Model"
                        placeholder="Enter model"
                        className="input-select"
                        value={values.model}
                        onChange={handleChange}
                        />
                        {errors.model && <span className="span">{errors.model}</span>}
                    </Grid>
                    <Grid item xs={3} sm={3} mr={3}>
                        <Select 
                        id="color" 
                        labelId="colorLabel" 
                        name="color"
                        label="color"
                        className="input-select"
                        value={values.color}
                        onChange={handleChange}
                        >
                        <MenuItem value="" selected disabled>Select Color</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Blue">Blue</MenuItem>
                        <MenuItem value="Gray">Gray</MenuItem>
                        <MenuItem value="Red">Red</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        </Select>
                        {errors.color && (
                        <span className="span">{errors.color}</span>
                        )}
                    </Grid>
                    <Grid item xs={10.3} sm={10.3}>
                        <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        className="button"
                        disabled={!isValid}
                        >
                        Update
                        </Button>
                    </Grid>
                    </Grid>
                </form>
                )}
            </Formik>
        </>
    );
}

export default EditCar;
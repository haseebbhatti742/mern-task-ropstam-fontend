import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import useAppContext from "../../context/useAppContext";

function AddCategory() {
  const { addCategory } = useAppContext();
  const [category, setCategory] = useState("");

  return (
    <React.Fragment>
      <Grid container pt={1}>
        <Grid item xs={3} sm={3} mr={3}>
          <TextField
            id="category"
            label="Category Name"
            placeholder="Enter Category Name"
            sx={{ width: "100%" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "100%", height: "100%" }}
            disabled={category === ""}
            onClick={() => addCategory(category)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddCategory;

import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableCell } from "@mui/material";
import useAppContext from "../../context/useAppContext";
import { useNavigate } from "react-router-dom";

function CarRow ({ columns, row }) {
  const { deleteCar } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <TableCell align={columns[0].align}>
        {row.category.name}
      </TableCell>
      <TableCell align={columns[1].align}>
        {row.registrationNumber}
      </TableCell>
      <TableCell align={columns[2].align}>
        {row.make}
      </TableCell>
      <TableCell align={columns[3].align}>
        {row.model}
      </TableCell>
      <TableCell align={columns[4].align}>
        {row.color}
      </TableCell>
      <TableCell align={columns[5].align}>
        <div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => navigate("/edit-car", {state:row})}
            >
              <EditIcon fontSize="inherit" color="secondary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => deleteCar(row.id)}
            >
              <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
        </div>
      </TableCell>
    </>
  );
}

export default CarRow;
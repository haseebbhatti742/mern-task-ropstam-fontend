import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { IconButton, TableCell, TextField } from "@mui/material";
import useAppContext from "../../context/useAppContext";

function CategoryRow({ columns, row }) {
  const { deleteCategory, updateCategory } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(row.name);

  const cancelEdit = () => {
    setIsEditing(false);
    setName(row.name);
  };

  return (
    <>
      <TableCell align={columns[0].align}>
        {isEditing ? (
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          name
        )}
      </TableCell>
      <TableCell align={columns[1].align}>
        {isEditing ? (
          <div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                setIsEditing(false);
                updateCategory(row.id, name);
              }}
            >
              <CheckIcon fontSize="inherit" color="success" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => cancelEdit()}
            >
              <CancelIcon fontSize="inherit" color="error" />
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon fontSize="inherit" color="secondary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => deleteCategory(row.id)}
            >
              <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
          </div>
        )}
      </TableCell>
    </>
  );
}

export default CategoryRow;

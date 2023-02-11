import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { IconButton, TableCell, TextField } from "@mui/material";
import useAppContext from "../../context/useAppContext";
import BasicModal from "../../components/modal";

function CategoryRow({ columns, row }) {
  const { 
    deleteCategory, 
    updateCategory, 
    setModalTitle, 
    setModalMessage,
    modalTitle,
    modalMessage
  } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(row.name);
  const [id] = useState(row.id);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

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
          <>
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
          </>
        ) : (
          <>
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
              onClick={() => {
                setModalTitle("Warning");
                setModalMessage("By deleting this category, All cars related to this will be deleted. Do You want to continue ?");
                setOpenDeleteModal(true)
              }}
            >
              <DeleteIcon fontSize="inherit" color="error" />
            </IconButton>
          </>
        )}
      </TableCell>

      <BasicModal 
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        openModal={openDeleteModal}
        setOpenModal= {setOpenDeleteModal}
        modalAction={() => deleteCategory(id)} />
    </>
  );
}

export default CategoryRow;

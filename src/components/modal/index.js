import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({modalTitle, modalMessage, openModal, modalAction, setOpenModal}) {

  const handleClose = () => setOpenModal(false);
  const handleOk = () => {
    modalAction();
    handleClose();
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Grid container mt={2} columns={12}>
            <Grid item xs={12} sm={5.6} md={5.6} lg={5.6} mr={3}>
              <Button
                variant="outlined"
                color="primary"
                style={{width: "100%"}}
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
            <Grid item xs={12} sm={5.6} md={5.6} lg={5.6}>
            <Button
                variant="contained"
                color="success"
                style={{width: "100%"}}
                onClick={handleOk}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

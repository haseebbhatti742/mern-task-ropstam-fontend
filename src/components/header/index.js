import { Button } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo.jpg";
import useAppContext from "../../context/useAppContext";
import "./styles.scss";

function Header() {
  const { logout } = useAppContext();
  return (
    <div className="main">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <Button
        variant="contained"
        className="button"
        color="error"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Header;

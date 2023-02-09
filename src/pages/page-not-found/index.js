import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function PageNotFound() {
  return (
    <div className="main-error">
      404 Page Not Found
      <Link to="/" className="span">
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;

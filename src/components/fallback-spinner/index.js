import React from "react";

function FallBackSpinner() {
  return (
    <div className="fallback-spinner app-loader">
      {/* <img className="fallback-logo" width={55} height={55} src={logo} alt="logo" /> */}
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
}

export default FallBackSpinner;

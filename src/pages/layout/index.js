import React from "react";
import Header from "../../components/header";
import SideBar from "../../components/sidebar";
import "./styles.scss";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="body">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="pages-section">{children}</div>
      </div>
    </>
  );
}

export default Layout;

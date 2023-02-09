import React from "react";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../router/ROUTES";
import "./styles.scss";

function SideBar() {
  const { pathname } = useLocation();
  return (
    <div className="sidebar-menu">
      {ROUTES.map(
        (route) =>
          route.isProtected &&
          route.isSideBar && (
            <Link
              key={route.key}
              to={route.path}
              className={
                pathname.includes(route.path)
                  ? "route-active"
                  : "route-inactive"
              }
            >
              {route.title}
            </Link>
          )
      )}
    </div>
  );
}

export default SideBar;

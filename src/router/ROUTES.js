import { lazy } from "react";

const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const Dashboard = lazy(() => import("../pages/dashboard"));

const ROUTES = [
  {
    key: 1,
    path: "/login",
    title: "Login",
    element: <Login />,
    isProtected: false,
  },
  {
    key: 2,
    path: "/signup",
    title: "Signup",
    element: <Signup />,
    isProtected: false,
  },
  {
    key: 3,
    path: "/",
    title: "Dashboard",
    element: <Dashboard />,
    isProtected: true,
    isSideBar: true,
  },
  {
    key: 4,
    path: "/cars",
    title: "Cars",
    element: <>Yet To Build</>,
    isProtected: true,
    isSideBar: true,
  },
  {
    key: 5,
    path: "/categories",
    title: "Categories",
    element: <>Yet To Build</>,
    isProtected: true,
    isSideBar: true,
  },
];

export default ROUTES;

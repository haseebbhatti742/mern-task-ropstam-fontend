import { lazy } from "react";
import AddCar from "../pages/add-car";

const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Categories = lazy(() => import("../pages/categories"));
const EditCar = lazy(() => import("../pages/dashboard/EditCar"))

const ROUTES = [
  {
    key: 1,
    path: "/",
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
    path: "/dashboard",
    title: "Dashboard",
    element: <Dashboard />,
    isProtected: true,
    isSideBar: true,
  },
  {
    key: 4,
    path: "/register-car",
    title: "Register Car",
    element: <AddCar/>,
    isProtected: true,
    isSideBar: true,
  },
  {
    key: 5,
    path: "/edit-car",
    title: "Edit Car",
    element: <EditCar/>,
    isProtected: true,
    isSideBar: false,
  },
  {
    key: 6,
    path: "/categories",
    title: "Categories",
    element: <Categories />,
    isProtected: true,
    isSideBar: true,
  },
];

export default ROUTES;

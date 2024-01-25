import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";

export const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

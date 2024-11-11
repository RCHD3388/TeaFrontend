import React from "react";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "../pages/public_pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/private_pages/Dashboard";

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    // Public Route
    { path: "/", element: <Navigate to={"/login"}/>},
    { path: "/login", element: <LoginPage/>},
    // Private Route 
    {
      path: "appuser",
      element: <PrivateRoute/>,
      children: [
        { index: true, element: <Navigate to={"/appuser/dashboard"}/> },
        { path: "dashboard", element: <Dashboard/>},
        { path: "project", element: <Dashboard/> },
        { path: "inventory", element: <Dashboard/>},
        { path: "purchasing", element: <Dashboard/> },
        { path: "supplier", element: <Dashboard/>},
        { path: "employee", element: <Dashboard/>},
        { path: "user", element: <Dashboard/>},
        { path: "process/request", element: <Dashboard/>},
        { path: "process/approval", element: <Dashboard/>},
        { path: "category", element: <Dashboard/>},
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes
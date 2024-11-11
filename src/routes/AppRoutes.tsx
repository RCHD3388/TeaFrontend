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
        {
          index: true,
          element: <Dashboard/> 
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes
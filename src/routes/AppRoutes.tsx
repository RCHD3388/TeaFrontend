import React from "react";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginPage from "../pages/public_pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

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
          element: <h1>Hello world</h1>  
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default AppRoutes
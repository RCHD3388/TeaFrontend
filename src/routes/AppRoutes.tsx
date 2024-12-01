import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/public_pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/private_pages/Dashboard";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    // Public Route
    {
      element: <PublicRoute />,
      children: [
        { path: "/", element: <Navigate to={"/login"} /> },
        { path: "/login", element: <LoginPage /> },
      ]
    },
    // Private Route 
    {
      path: "appuser",
      element: <PrivateRoute />,
      children: [
        { index: true, element: <Navigate to={"/appuser/dashboard"} /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "project", element: <Dashboard /> },
        { path: "inventory", element: <Dashboard /> },
        { path: "purchasing", element: <Dashboard /> },
        { path: "supplier", element: <Dashboard /> },
        { path: "employee", element: <Dashboard /> },
        { path: "user", element: <Dashboard /> },
        { path: "request", element: <Dashboard /> },
        { path: "approval", element: <Dashboard /> },
        { path: "category", element: <Dashboard /> },
      ]
    },
    {
      path: "*",
      element: <NotFoundPage/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
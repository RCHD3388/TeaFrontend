import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/public_pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/private_pages/DashboardPage";
import CategoryPage from "../pages/private_pages/CategoryRelated/CategoryPage";
import EmployeePage from "../pages/private_pages/EmployeeRelated/EmployeePage";

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
        { path: "dashboard", element: <DashboardPage /> },
        { path: "project", element: <DashboardPage /> },
        { path: "inventory", element: <DashboardPage /> },
        { path: "purchasing", element: <DashboardPage /> },
        { path: "supplier", element: <DashboardPage /> },
        { path: "employee", element: <EmployeePage /> },
        { path: "user", element: <DashboardPage /> },
        { path: "request", element: <DashboardPage /> },
        { path: "approval", element: <DashboardPage /> },
        { path: "category", element: <CategoryPage /> },
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
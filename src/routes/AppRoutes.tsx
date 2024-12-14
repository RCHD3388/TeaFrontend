import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/public_pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/private_pages/DashboardPage";
import CategoryPage from "../pages/private_pages/CategoryRelated/CategoryPage";
import EmployeePage from "../pages/private_pages/EmployeeRelated/EmployeePage";
import EmployeeDetail from "../pages/private_pages/EmployeeRelated/EmployeeDetail";
import ErrorPage from "../pages/ErrorPage";
import SupplierPage from "../pages/private_pages/SupplierRelated/SupplierPage";
import SupplierDetail from "../pages/private_pages/SupplierRelated/SupplierDetail";
import UserPage from "../pages/private_pages/UserRelated/UserPage";
import ProjectPage from "../pages/private_pages/ProjectRelated/ProjectPage";
import DetailProject from "../pages/private_pages/ProjectRelated/DetailProject";
import InventoryPage from "../pages/private_pages/InventoryRelated/InventoryPage";
import InventoryDetail from "../pages/private_pages/InventoryRelated/InventoryDetail";
import DetailSku from "../pages/private_pages/InventoryRelated/ToolRelated/DetailSku";

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
      errorElement: <ErrorPage/>,
      children: [
        { index: true, element: <Navigate to={"/appuser/dashboard"} /> },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "project", children: [
          { index: true, element: <ProjectPage/>},
          { path: ":projectId", element: <DetailProject/>}
        ] },
        { path: "inventory", children: [
          { index: true, element: <InventoryPage />},
          { path: ":warehouseId", element: <InventoryDetail />},
          { path: "sku/:skuId", element: <DetailSku />}
        ] },
        { path: "purchasing", element: <DashboardPage /> },
        { path: "supplier", children: [
          { index: true, element: <SupplierPage />},
          { path: ":supplierId", element: <SupplierDetail/>}
        ] },
        { path: "employee", children: [
          { index: true, element: <EmployeePage />},
          { path: ":employeeId", element: <EmployeeDetail/>}
        ]},
        { path: "user", element: <UserPage /> },
        { path: "request", element: <DashboardPage /> },
        { path: "approval", element: <DashboardPage /> },
        { path: "category", element: <CategoryPage /> },
        { path: "*", element: <NotFoundPage/>}
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
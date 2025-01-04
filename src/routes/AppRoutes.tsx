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
import RequestPage from "../pages/private_pages/RequestRelated/RequestPage";
import ApprovalPage from "../pages/private_pages/ApprovalRelated/ApprovalPage";
import DetailRequestCost from "../components/request_related/request_cost_related/DetailRequestCost";
import CreateRequestItemTransaction from "../components/request_related/request_item_related/CreateRequestItemTransaction";
import DetailRequestItem from "../components/request_related/request_item_related/DetailRequestItem";
import CreatePurchaseOrder from "../components/request_related/request_purchase_related/CreatePurchaseOrder";
import DetailPurchaseOrder from "../components/request_related/request_purchase_related/DetailPurchaseOrder";
import PurchasingPage from "../pages/private_pages/PurchasingRelated/PurchasingPage";
import DetailPurchasing from "../pages/private_pages/PurchasingRelated/DetailPurchasing";
import DetailRequestClosing from "../components/request_related/request_closing_related/DetailRequestClosing";

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
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to={"/appuser/dashboard"} /> },
        { path: "dashboard", element: <DashboardPage /> },
        {
          path: "project", children: [
            { index: true, element: <ProjectPage /> },
            { path: ":projectId", element: <DetailProject /> }
          ]
        },
        {
          path: "inventory", children: [
            { index: true, element: <InventoryPage /> },
            { path: ":warehouseId", element: <InventoryDetail /> },
            { path: "sku/:skuId", element: <DetailSku /> }
          ]
        },
        {
          path: "purchasing", children: [
            { index: true, element: <PurchasingPage />},
            { path: ":purchaseingId", element: <DetailPurchasing />}
          ]
        },
        {
          path: "supplier", children: [
            { index: true, element: <SupplierPage /> },
            { path: ":supplierId", element: <SupplierDetail /> }
          ]
        },
        {
          path: "employee", children: [
            { index: true, element: <EmployeePage /> },
            { path: ":employeeId", element: <EmployeeDetail /> }
          ]
        },
        { path: "user", element: <UserPage /> },
        {
          path: "request", children: [
            { index: true, element: <RequestPage /> },
            { path: "cost/:requestCostId", element: <DetailRequestCost /> },
            { path: "item/:requestItemId", element: <DetailRequestItem /> },
            { path: "po/:requestPoId", element: <DetailPurchaseOrder /> },
            { path: "closing/:requestClosingId", element: <DetailRequestClosing /> },
            { path: "add_request_item", element: <CreateRequestItemTransaction /> },
            { path: "add_request_po", element: <CreatePurchaseOrder /> },
          ]
        },
        { path: "approval", element: <ApprovalPage /> },
        { path: "category", element: <CategoryPage /> },
        { path: "*", element: <NotFoundPage /> }
      ]
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
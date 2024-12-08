import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import LoginPage from '../pages/public_pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardPage from '../pages/private_pages/DashboardPage';
import CategoryPage from '../pages/private_pages/CategoryPage';
import Projectpage from '../pages/private_pages/ProjectRelated/ProjectPage';
import Projectdetail from '../pages/private_pages/ProjectRelated/Projectdetail';
import PurchaseOrderPage from '../pages/private_pages/PurchaseOrderRelated/PembelianPage';
import PembelianPage from '../pages/private_pages/PurchaseOrderRelated/PembelianPage';
import Inventorypage from '../pages/private_pages/InventoryRelated/InventoryPage';

const AppRoutes: React.FC = () => {
  const router = createBrowserRouter([
    // Public Route
    {
      element: <PublicRoute />,
      children: [
        { path: '/', element: <Navigate to={'/login'} /> },
        { path: '/login', element: <LoginPage /> },
      ],
    },
    // Private Route
    {
      path: 'appuser',
      element: <PrivateRoute />,
      children: [
        { index: true, element: <Navigate to={'/appuser/dashboard'} /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'project', element: <Projectpage /> },
        {
          path: 'project/detail/:id',
          element: <Projectdetail></Projectdetail>,
        },
        { path: 'inventory', element: <Inventorypage></Inventorypage> },
        {
          path: 'purchasing',
          element: <PembelianPage />,
        },
        { path: 'supplier', element: <DashboardPage /> },
        { path: 'employee', element: <DashboardPage /> },
        { path: 'user', element: <DashboardPage /> },
        { path: 'request', element: <DashboardPage /> },
        { path: 'approval', element: <DashboardPage /> },
        { path: 'category', element: <CategoryPage /> },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

import { IRouteConfig } from "../types/RouteTypes";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/private_pages/MainPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

export const routes: IRouteConfig[] = [
  {
    path: "/",
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: "/auth",
    component: AuthPage,
    layout: MainLayout,
  },
  {
    path: "/private",
    component: MainPage,
    private: true,
    layout: AuthLayout,
  },
]
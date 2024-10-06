import GuestLayout from "../layouts/GuestLayout";
import GuestPage from "../pages/public_pages/GuestPage";
import GuestPage2 from "../pages/public_pages/GuestPage2";
import GuestPage3 from "../pages/public_pages/GuestPage3";
import { IRouteConfig } from "../types/RouteTypes";

export const routes: IRouteConfig[] = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "",
        component: GuestPage,
      },
      {
        path: "g2",
        component: GuestPage2,
      },
      {
        path: "g3",
        component: GuestPage3,
      }
    ]
  }
]
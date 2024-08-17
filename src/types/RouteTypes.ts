import React from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

type AllowedLayouts = typeof MainLayout | typeof AuthLayout;

export interface IRouteConfig {
  path: string;
  component: React.FC;
  layout: AllowedLayouts;
  private?: boolean;
  children?: IRouteConfig[];
}
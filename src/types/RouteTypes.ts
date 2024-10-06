import React from "react";

export interface IRouteConfig {
  path: string;
  component: React.FC<any>;
  private?: boolean;
  children?: IRouteConfig[];
}
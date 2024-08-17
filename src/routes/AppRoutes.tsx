import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IRouteConfig } from "../types/RouteTypes";
import PrivateRoute from "./PrivateRoute";
import { routes } from "./routeConfig";

const renderRoutes = (routes: IRouteConfig[]) => {
  return routes.map(({ path, component: Component, layout: Layout, private: isPrivate, children }, index) => {
    const element = isPrivate ? (
      <PrivateRoute>
        <Component />
      </PrivateRoute>
    ) : (
      <Component />
    );

    return (
      <Route key={index} path={path} element={<Layout>{element}</Layout>}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
}

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {renderRoutes(routes)}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
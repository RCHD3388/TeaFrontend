import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  return(
    <>
      User Layout
      <Outlet></Outlet>
    </>
  )
}
export default UserLayout;
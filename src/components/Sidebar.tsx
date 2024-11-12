import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SidebarLink from "./global_features/SidebarLink";
import { SIDEBAR_ITEMS } from "../constants/SidebarConstant";


const Sidebar: React.FC = () => {

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side border-t-2 border-gray-400  shadow-lg">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-light text-primary-content min-h-full w-60 p-4">
            {/* Sidebar content here */}
            {SIDEBAR_ITEMS.map((item) => {
              return (
                <li><SidebarLink link_to={item.link_to} link_name={item.link_name} icon={item.icon}></SidebarLink></li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SidebarLink from "./global_features/SidebarLink";
import { SIDEBAR_ITEMS } from "../constants/sidebarConstant";

interface SidebarProps {
  sidebarID: string
}

const Sidebar: React.FC<SidebarProps> = ({sidebarID}) => {

  return (
    <>
      <div className="drawer lg:drawer-open h-full">
        <input id={sidebarID} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-full max-h-full" style={{ overflowY: "auto" }}>
          <Outlet>

          </Outlet>
        </div>
        <div className="drawer-side border-t-2 border-gray-400 shadow-lg h-full max-h-full" style={{ overflowY: "auto" }}>
          <label htmlFor={sidebarID} aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-light text-primary-content min-h-full w-60 p-4">
            <div className="flex items-center justify-between mb-2 lg:hidden">
              <label htmlFor={sidebarID} className="btn btn-sm btn-outline">Back</label>
            </div>
            {/* Sidebar content here */}
            {SIDEBAR_ITEMS.map((item, index) => {
              return (
                <li key={index}><SidebarLink key={index} link_to={item.link_to} link_name={item.link_name} icon={item.icon}></SidebarLink></li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
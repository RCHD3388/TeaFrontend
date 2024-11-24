import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SidebarLink from "./global_features/SidebarLink";
import dashboard_svg from "./../assets/sidebar_icon/dashboard.svg";
import project_svg from "./../assets/sidebar_icon/project.svg";
import inventory_svg from "./../assets/sidebar_icon/inventory.svg";
import purchasing_svg from "./../assets/sidebar_icon/purchasing.svg";
import supplier_svg from "./../assets/sidebar_icon/supplier.svg";
import employee_svg from "./../assets/sidebar_icon/employee.svg";
import user_svg from "./../assets/sidebar_icon/user.svg";
import request_svg from "./../assets/sidebar_icon/request.svg";
import category_svg from "./../assets/sidebar_icon/category.svg";

const Sidebar: React.FC = () => {

  return (
    <>
      <div className="drawer lg:drawer-open h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center h-full max-h-full" style={{ overflowY: "auto" }}>
          <Outlet>

          </Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side border-t-2 border-gray-400 shadow-lg h-full max-h-full" style={{ overflowY: "auto" }}>
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-light text-primary-content min-h-full w-60 p-4">
            {/* Sidebar content here */}
            <li><SidebarLink link_to="/appuser/dashboard" link_name="Dashboard" icon={dashboard_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/project" link_name="Proyek" icon={project_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/inventory" link_name="Inventori" icon={inventory_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/purchasing" link_name="Pembelian" icon={purchasing_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/supplier" link_name="Supplier" icon={supplier_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/employee" link_name="Pegawai" icon={employee_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/user" link_name="User" icon={user_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/category" link_name="Kategori Data" icon={category_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/process/request" link_name="Request" icon={request_svg}></SidebarLink></li>
            <li><SidebarLink link_to="/appuser/process/approval" link_name="Approval" icon={request_svg}></SidebarLink></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
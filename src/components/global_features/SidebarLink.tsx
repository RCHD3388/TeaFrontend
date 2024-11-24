import React, { Children } from "react";
import { NavLink } from "react-router-dom";

interface props { 
  link_to: string,
  link_name: string,
  icon: string,
  index?: number
}

const SidebarLink: React.FC<props> = ({link_to, link_name, icon, index = 0}) => {
  let base_width = 52;
  let activeSidebarLink = `bg-primary text-primary-content font-bold py-2 px-4 block w-${base_width - index*4} rounded-lg`;
  return (
    <NavLink to={link_to} className={
      ({ isActive }) => {
        return isActive ? "bg-transparent m-0 p-0" : ""
      }
    }>
      {({ isActive }) => (
        <span className={`${isActive ? `${activeSidebarLink}` : ""} flex items-center`}>
          <img src={icon} alt="" className="mr-2 w-5 h-5" />
          <p className="m-0 p-0 text-base">{link_name}</p>
        </span>        
      )}
    </NavLink>
  )
}

export default SidebarLink;
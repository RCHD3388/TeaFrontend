import React from "react";
import logout_logo from '../assets/logout.svg';
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout: React.FC = () => {
  return (
    <>
      <Navbar/>
      <Sidebar/>
    </>
  )
}
export default UserLayout;
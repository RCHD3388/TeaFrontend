import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CustomSnackBar from "../components/CustomSnackBar";

const UserLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Navbar sidebarID={"sidebar_drawer"}/>
        <div className="h-full max-h-full" style={{ overflowY: "auto" }}>
          <Sidebar sidebarID={"sidebar_drawer"}/>
        </div>
        <CustomSnackBar/>
      </div>
    </>
  )
}
export default UserLayout;
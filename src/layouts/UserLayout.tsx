import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Navbar />
        <div className="h-full max-h-full" style={{overflowY: "auto"}}>
          <Sidebar />
        </div>
      </div>
    </>
  )
}
export default UserLayout;
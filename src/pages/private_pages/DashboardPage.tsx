import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/reducers/userSlice";
import { RootState } from "../../app/store";
import { EmployeeRoleType } from "../../types/staticData.types";
import ProjectDashboard from "./dashboardRelated/ProjectDashboard";
import PurchasingDashboard from "./dashboardRelated/PurchasingDashboard";
import { Container } from "@mui/material";
import MandorDashboard from "./dashboardRelated/MandorDashboard";

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => selectUser(state));
  return (
    <div>
      {(user.role === EmployeeRoleType.ADMIN || user.role === EmployeeRoleType.OWNER) && <>
        <ProjectDashboard />
        <PurchasingDashboard />
      </>}
      {(user.role === EmployeeRoleType.MANDOR) && <>
        <ProjectDashboard />
        <MandorDashboard />
      </>}
      {(user.role === EmployeeRoleType.STAFF_PEMBELIAN) && <>
        <div className="p-5" style={{ height: "100%" }}>
          <div className="flex flex-col pt-3" style={{ maxHeight: "100%" }}>
            {/* page header title */}
            <div className="text-4xl font-bold mb-1">Dashboard Anda</div>
            <PurchasingDashboard />
          </div>
        </div>
      </>}
    </div>
  )
}
export default DashboardPage;
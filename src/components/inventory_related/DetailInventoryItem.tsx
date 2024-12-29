import { useSelector } from "react-redux";
import { selectUser } from "../../app/reducers/userSlice";
import { RootState } from "../../app/store";
import { EmployeeRoleType } from "../../types/staticData.types";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { a11yProps, CustomTabPanel } from "../CustomTabPanel";
import AddInventoryMaterial from "./AddInventoryMaterial";
import AddInventoryTool from "./AddInventoryTool";
import MaterialTable from "./inventory_detail_related/MaterialTable";
import ToolTable from "./inventory_detail_related/ToolTable";

interface DetailInventoryItemProps {
  warehouseId: string | undefined
}

const DetailInventoryItem: React.FC<DetailInventoryItemProps> = ({ warehouseId }) => {
  const user = useSelector((state: RootState) => selectUser(state))
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const checkUserValid = () => {
    return user.role === EmployeeRoleType.ADMIN || user.role === EmployeeRoleType.OWNER || user.role === EmployeeRoleType.STAFF_PEMBELIAN
  }

  return (
    <div className="flex flex-column" style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <div className="text-2xl font-bold">Data barang gudang</div>

        {/* TAB MATERIAL DAN TOOLS */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
            <Tab label="Data Material" {...a11yProps(0)} sx={{
              color: value === 0 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }} />
            <Tab label="Data Peralatan" {...a11yProps(1)} sx={{
              color: value === 1 ? 'secondary.main' : 'inherit',
              '&.Mui-selected': { color: 'secondary.main' },
            }} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {/* ADD MATERIAL BUTTON & HANDLER */}
          {checkUserValid() &&
            <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
              <AddInventoryMaterial warehouseId={warehouseId ?? ""} />
            </Box>}
          <MaterialTable warehouseId={warehouseId}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* ADD TOOL BUTTON & HANDLER */}
          {checkUserValid() &&
            <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
              <AddInventoryTool warehouseId={warehouseId ?? ""} />
            </Box>}
          <ToolTable warehouseId={warehouseId}/>
        </CustomTabPanel>

      </div>
    </div>
  );
}

export default DetailInventoryItem
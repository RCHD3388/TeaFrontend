import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import InventoryMainPage from "./InventoryMainPage";
import { useNavigate } from "react-router-dom";
import MaterialPage from "./MaterialRelated/MaterialPage";
import InventoryCategoryPage from "./InventoryCategoryPage";
import ToolSkuPage from "./ToolRelated/ToolSkuPage";

export default function InventoryPage() {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Inventori Perusahaan</div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white"}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
              <Tab label="Data Warehouse" {...a11yProps(0)} sx={{ textDecoration: "none",textTransform: "none",
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Material" {...a11yProps(1)} sx={{ textDecoration: "none",textTransform: "none",
                color: value === 1 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Peralatan" {...a11yProps(1)} sx={{ textDecoration: "none",textTransform: "none",
                color: value === 2 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Tambahan Barang" {...a11yProps(1)} sx={{ textDecoration: "none",textTransform: "none",
                color: value === 3 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <InventoryMainPage/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MaterialPage/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ToolSkuPage/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <InventoryCategoryPage/>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
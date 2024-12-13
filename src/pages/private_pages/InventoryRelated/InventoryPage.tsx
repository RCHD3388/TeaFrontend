import { Autocomplete, Box, Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import InventoryMainPage from "./InventoryMainPage";
import { useNavigate } from "react-router-dom";

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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary'>
              <Tab label="Data Warehouse" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Material" {...a11yProps(1)} sx={{
                color: value === 1 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Peralatan" {...a11yProps(1)} sx={{
                color: value === 2 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <InventoryMainPage/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
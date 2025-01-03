import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { PageTabState, setPageValueByName } from "../../../app/reducers/pageTabSlice";
import RequestCost from "./RequestCost";

export default function RequestPage() {
  const value = useSelector((state: RootState) => state.pageTab.page.find(p => p.name === "request_page")?.value || 0);
  const dispatch = useDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    dispatch(setPageValueByName({ name: "request_page", value: newValue }))
  };

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Daftar Permintaan</div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
              <Tab label="Pembelian" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Perpindahan Barang" {...a11yProps(1)} sx={{
                color: value === 1 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Pengeluaran" {...a11yProps(1)} sx={{
                color: value === 2 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>

          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RequestCost/>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { PageTabState, setPageValueByName } from "../../../app/reducers/pageTabSlice";
import { selectUser } from "../../../app/reducers/userSlice";
import ApprovalPurchaseOrder from "../../../components/request_related/request_purchase_related/ApprovalPurchaseOrder";
import PurchasingMainPage from "./PurchasingMainPage";

export default function PurchasingPage() {
  const value = useSelector((state: RootState) => state.pageTab.page.find(p => p.name === "purchasing_page")?.value || 0);
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => selectUser(state));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setPageValueByName({ name: "purchasing_page", value: newValue }))
  };

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Data Pembelian</div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
              <Tab label="Data Pesanan" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Data Pembelian" {...a11yProps(1)} sx={{
                color: value === 1 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ApprovalPurchaseOrder />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PurchasingMainPage />
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
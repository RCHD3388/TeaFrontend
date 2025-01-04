import { Box, Tab, Tabs } from "@mui/material";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import { setPageValueByName } from "../../../app/reducers/pageTabSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import RequestCost from "../RequestRelated/RequestCost";
import RequestItemTransaction from "../../../components/request_related/request_item_related/RequestItemTransaction";
import { FindYourApprovalItemTransactionDocument } from "../../../graphql/request_item.generated";
import ApprovalPurchaseOrder from "../../../components/request_related/request_purchase_related/ApprovalPurchaseOrder";
import { selectUser } from "../../../app/reducers/userSlice";
import { useEffect } from "react";
import RequestClosing from "../../../components/request_related/request_closing_related/RequestClosing";

export default function ApprovalPage() {
  const value = useSelector((state: RootState) => state.pageTab.page.find(p => p.name === "approval_page")?.value || 0);
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => selectUser(state));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    dispatch(setPageValueByName({ name: "approval_page", value: newValue }))
  };

  const getIndexValue = () => {
    if (user.role === "mandor") {
      return 0
    }
    return 1
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Daftar Permintaan Persetujuan</div>


        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
              {user.role !== "mandor" && <Tab label="Pembelian" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />}
              <Tab label="Perpindahan Barang" {...a11yProps(1)} sx={{
                color: value === getIndexValue() ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              {user.role !== "mandor" && <Tab label="Pengeluaran" {...a11yProps(1)} sx={{
                color: value === 2 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />}
              {user.role !== "mandor" && <Tab label="Penutupan Proyek" {...a11yProps(1)} sx={{
                color: value === 3 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />}
            </Tabs>
          </Box>
          {user.role !== "mandor" && <CustomTabPanel value={value} index={0}>
            <ApprovalPurchaseOrder />
          </CustomTabPanel>}
          <CustomTabPanel value={value} index={getIndexValue()}>
            <RequestItemTransaction
              itemTransDocument={FindYourApprovalItemTransactionDocument}
              itemPropertyName="findYourApprovalItemTransaction"
              request_page={false}
            />
          </CustomTabPanel>
          {user.role !== "mandor" && <CustomTabPanel value={value} index={2}>
            <RequestCost request_page={false} />
          </CustomTabPanel>}
          {user.role !== "mandor" && <CustomTabPanel value={value} index={3}>
            <RequestClosing />
          </CustomTabPanel>}
        </Box>
      </div>
    </div>
  );
}
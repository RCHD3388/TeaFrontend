import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { GetAllWarehousesDocument } from "../../../graphql/inventory.generated";

export default function InventoryPage() {
  let { data, loading, error, refetch } = useQuery(GetAllWarehousesDocument, { variables: { requiresAuth: true } })
  const navigate = useNavigate()

  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Inventori Perusahaan</div>
        <div className="flex justify-end">  </div>

        <Box display={"flex"} flexWrap={"wrap"} mb={2}>
          <TextField
            color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
            onChange={(e) => { setNameFilter(e.target.value) }}
            slotProps={{
              input: {
                startAdornment: <SearchIcon></SearchIcon>,
              },
            }}
          />
          <Autocomplete
            disablePortal
            options={["Active", "Inactive"]}
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setStatusFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Status Pegawai" />}
          />
        </Box>

        {!loading && !error && data.getAllWarehouses.map((item: any) => (
          <p>{item.name}</p>
        ))}
      </div>
    </div>
  );
}
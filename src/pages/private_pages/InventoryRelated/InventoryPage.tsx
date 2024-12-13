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
import CustomListComponent from "../../../components/inventory_related/ComponentCard";
import { WarehouseTypeValues } from "../../../types/staticData.types";

export default function InventoryPage() {
  let { data, loading, error, refetch } = useQuery(GetAllWarehousesDocument, { variables: { requiresAuth: true } })
  const navigate = useNavigate()

  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [warehouseFilter, setWarehouseFilter] = useState("")

  useEffect(() => { if (data) refetch() }, [data, refetch])

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Inventori Perusahaan</div>

        <Box display={"flex"} flexWrap={"wrap"}>
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
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setStatusFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Status Pegawai" />}
          />
          <Autocomplete
            disablePortal
            options={WarehouseTypeValues}
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setWarehouseFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Tipe Gudang" />}
          />
        </Box>

        {!loading && !error && data.getAllWarehouses.map((item: any, index: number) => {
          console.log(item)
          if (nameFilter != "" && !item.name.toLowerCase().includes(nameFilter.toLowerCase())) return null
          if (statusFilter != "" && item.status != statusFilter) return null
          if (warehouseFilter != "" && item.type != warehouseFilter) return null

          return <CustomListComponent key={index} title={item.name}
            type={item.type} status={item.status}
            description={item.description}
            onDetailClick={() => { navigate(`/appuser/inventory/${item._id}`) }}
          />
        })}
      </div>
    </div>
  );
}
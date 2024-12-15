import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface RowData {
  _id: string,
  name: string,
  person: {
    phone_number: string,
    address: string,
    email: string
  }
  status: string
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: "Supplier", minWidth: 50, align: "center" },
  {
    id: 'phone_number', label: 'Nomer Telepon', minWidth: 100, align: "center",
    renderComponent: (row) => { return (<>{row.person.phone_number}</>) }
  },
  {
    id: 'email', label: 'Email', minWidth: 50, align: "center",
    renderComponent: (row) => { return (<>{row.person.email}</>) }
  },
  {
    id: 'address', label: 'Alamat', minWidth: 100, align: "center",
    renderComponent: (row) => { return (<>{row.person.address}</>) }
  },
  {
    id: 'status', label: 'Status', minWidth: 50, align: "center",
    renderComponent: (row) => {
      return (<>
        {row.status == "Active" ?
          <div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div> :
          <div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div>}
      </>)
    }
  },
  {
    id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
  },
]

export default function SupplierPage() {
  let { data, loading, error, refetch } = useQuery(GetAllSuppliersDocument, { variables: { requiresAuth: true } })
  const navigate = useNavigate()

  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/supplier/${row._id}`)
    // refetch()
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Supplier Perusahaan</div>
        <div className="flex justify-end"> <AddSupplier refetchSupplier={refetch} /> </div>

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
            sx={{ width: 300 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setStatusFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Status Pegawai" />}
          />
        </Box>

        {!loading && !error &&
          data?.getAllSuppliers.length <= 0 ?
          <div className="flex justify-center items-center p-5 bg-accent shadow-md">
            PERUSAHAAN BELUM MEMILIKI SUPPLIER
          </div> 
          :
          <div>
            <StickyHeadTable
              columns={columns}
              rows={data?.getAllSuppliers.filter((sup: any) => {
                return sup.name.toLowerCase().includes(nameFilter.toLowerCase()) && sup.status.includes(statusFilter)
              }) ?? []}
              withIndex={true}
              onActionClick={handleActionTable}
            />
          </div>}
      </div>
    </div>
  );
}
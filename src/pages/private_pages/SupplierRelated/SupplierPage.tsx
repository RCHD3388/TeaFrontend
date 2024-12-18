import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { EmployeeRoleTypeValues } from "../../../types/staticData.types";

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

export default function SupplierPage() {
  let { data, loading, error, refetch } = useQuery(GetAllSuppliersDocument, { variables: { requiresAuth: true } })
  const navigate = useNavigate()

  const columns: GridColDef<RowData>[] = [
    { field: 'index', type: 'number', headerName: "No", minWidth: 50 },
    { field: 'name', type: 'string', headerName: "Supplier", flex: 1, minWidth: 150 },
    {
      field: 'phone_number', type: 'string', headerName: 'Nomer Telepon',
      renderCell: (params) => <>{params.row.person?.phone_number || '-'}</>,
      valueGetter: (value, row) => row.person?.phone_number, flex: 1, minWidth: 150
    },
    {
      field: 'email', type: 'string', headerName: 'Email',
      renderCell: (params) => <>{params.row.person?.email || '-'}</>,
      valueGetter: (value, row) => row.person?.email, flex: 1, minWidth: 150
    },
    {
      field: 'address', type: 'string', headerName: 'Alamat',
      renderCell: (params) => <>{params.row.person?.address || '-'}</>,
      valueGetter: (value, row) => row.person?.address, flex: 1, minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      type: "singleSelect", flex: 1, minWidth: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Active" ? (
              <div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div>
            ) : (
              <div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div>
            )}
          </>
        );
      },
      valueOptions: ["Active", "Inactive"],
      valueGetter: (value, row) => row.status
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      align: "center",
      flex: 1, minWidth: 150, sortable: false,
      renderCell: (params) => (
        <Button
          color="secondary"
          variant="contained" sx={{ textTransform: 'none' }}
          onClick={() => navigate(`/appuser/supplier/${params.row._id}`)}
        >
          Detail / Ubah
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Supplier Perusahaan</div>
        <div className="flex justify-end"> <AddSupplier refetchSupplier={refetch} /> </div>

        {!loading && !error &&
          data?.getAllSuppliers.length <= 0 ?
          <div className="flex justify-center items-center p-5 bg-accent shadow-md">
            PERUSAHAAN BELUM MEMILIKI SUPPLIER
          </div>
          :
          <div>
            <StickyHeadTable
              columns={columns}
              rows={data?.getAllSuppliers || []}
              csvname="supplier_data"
            />
          </div>}
      </div>
    </div>
  );
}
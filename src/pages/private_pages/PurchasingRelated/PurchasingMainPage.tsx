import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useQuery } from "@apollo/client";
import { formatCurrency, formatDateToLong } from "../../../utils/service/FormatService";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeRoleType } from "../../../types/staticData.types";
import { GetAllPurchaseTransactionsDocument, GetPurchaseTransactionByUserDocument } from "../../../graphql/purchasing.generated";
import AddIcon from '@mui/icons-material/Add';
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { GridColDef } from "@mui/x-data-grid";

interface RowData {
  _id: string;
  transaction_number: string;
  description: string;
  transaction_date: Date;
  total: number;
  supplier: {
    _id: string;
    name: string;
    status: string;
    person: {
      name: string;
      email: string;
      phone_number: string;
      address: string;
    };
  };
  purchasing_staff: {
    _id: string;
    person: {
      name: string;
      email: string;
      phone_number: string;
      address: string;
    };
  };
}

export default function PurchasingMainPage() {
  const user = useSelector((state: RootState) => state.user);
  let { data, loading, error, refetch } = useQuery(user?.role === EmployeeRoleType.STAFF_PEMBELIAN ? GetPurchaseTransactionByUserDocument : GetAllPurchaseTransactionsDocument,
    { variables: { requiresAuth: true } }
  )

  const getData = () => {
    let propertyName = user?.role === EmployeeRoleType.STAFF_PEMBELIAN ? "getPurchaseTransactionByUser" : "getAllPurchaseTransactions";
    return data?.[propertyName];
  }

  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")

  useEffect(() => {if(data) refetch()}, [data, refetch])

  const columns: GridColDef<RowData>[] = [
    { field: 'index', headerName: "No", width: 100, type: "string", align: "right", headerAlign: "right" },
    { field: 'transaction_number', headerName: 'No Transaksi', minWidth: 150, flex: 1, type: "string" },
    { field: 'transaction_date', headerName: 'Tanggal Transaksi', minWidth: 150, flex: 1, type: "string", renderCell: (params) => formatDateToLong(params.row.transaction_date.toString()) },
    {
      field: 'purchasing_staff', headerName: 'Penanggung Jawab', minWidth: 150, flex: 1, type: "string",
      renderCell: (params) => `${params.row.purchasing_staff.person.name} - ${params.row.purchasing_staff.person.email}`
    },
    {
      field: 'total', headerName: 'Harga Total', minWidth: 150, flex: 1, type: "number",
      renderCell: (params) => formatCurrency(params.row.total)
    },
    {
      field: 'action', headerName: 'Detail', minWidth: 150, flex: 1, align: "center", headerAlign: "center",
      renderCell: (params) => {
        return (
          <Button variant="contained" color="secondary" onClick={() => { navigate(`/appuser/purchasing/${params.row._id}`) }}>
            Detail
          </Button>
        )
      }
    },
  ]

  return (
    <div className="flex flex-col" style={{ maxHeight: "100%" }}>
      <>
        <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
          <Button variant="contained" color="secondary"
            onClick={() => { navigate("/appuser/purchasing/add") }}
            style={{ marginBottom: "1rem" }}
            endIcon={<AddIcon />}
          >
            Tambah Transaksi Pembelian
          </Button>
        </Box>
        <Box maxHeight={800} overflow={"auto"}>
          {!loading && data &&
            <StickyHeadTable
              columns={columns}
              rows={getData() ?? []}
              csvname="material_data"
            />
          }
        </Box>
      </>

    </div>
  );
}
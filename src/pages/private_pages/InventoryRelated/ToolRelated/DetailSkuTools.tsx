import { useQuery } from "@apollo/client";
import { GetAllToolsDocument } from "../../../../graphql/inventory.generated";
import { useEffect } from "react";
import StickyHeadTable from "../../../../components/global_features/StickyHeadTable";
import { GridColDef } from "@mui/x-data-grid";
import { formatCurrency, formatDateToLong } from "../../../../utils/service/FormatService";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DetailSkuToolsProps {
  id: string,
  name_sku: string
}

interface RowData {
  _id: string
  id: string
  description: string
  warranty_number: string
  warranty_expired_date: Date
  price: number
  status: {
    _id: string
    name: string
    description: string
  }
  sku: {
    _id: string
    name: string
  }
}

const DetailSkuTools: React.FC<DetailSkuToolsProps> = ({ id, name_sku }) => {
  const { data, loading, error } = useQuery(GetAllToolsDocument, {
    variables: { sku: id, requiresAuth: true },
  });
  const navigate = useNavigate();

  const getData = () => {
    return data?.getAllTools
  }

  const columns: GridColDef<RowData>[] = [
    { field: "index", headerName: "No", type: "number", maxWidth: 50 },
    { field: "id", headerName: "ID", minWidth: 200, type: "string", flex: 1 },
    {
      field: "warranty_number", headerName: "No Garansi", minWidth: 200, type: "string", flex: 1,
      renderCell: (params) => (<div>{
        params.row.warranty_number ? params.row.warranty_number : <span className="text-error">Tidak diberikan</span>
      }</div>)
    },
    {
      field: "warranty_expired_date", headerName: "Tgl Exp Garansi", minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (<div>{
        params.row.warranty_expired_date ? <>{formatDateToLong(params.row.warranty_expired_date.toString())}</> : <span className="text-error">Tidak diberikan</span>
      }</div>)
    },
    {
      field: "status", headerName: "Status", minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <div className="badge whitespace-nowrap p-3 gap-2">{params.row.status.name}</div>
      )
    },
    {
      field: "price", headerName: "Harga", minWidth: 150, type: "number", flex: 1,
      renderCell: (params) => (
        <>{formatCurrency(params.row.price)}</>
      )
    },
    {
      field: 'action', headerName: 'Hapus', minWidth: 100, flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="secondary"
          onClick={() => { navigate(`/appuser/inventory/tool/${params.row._id}`) }}>
          Detail
        </Button>
      ),
    },
  ]

  return (
    <div className="mt-3">
      <Typography variant="h6"><b>Daftar Alat dengan SKU {name_sku}</b></Typography>
      <StickyHeadTable
        columns={columns}
        rows={getData() ?? []}
        withtoolbar={false}
      />
    </div>
  )
}

export default DetailSkuTools

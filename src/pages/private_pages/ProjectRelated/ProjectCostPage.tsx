import { useQuery } from "@apollo/client"
import { FindAllProjectCostLogsDocument } from "../../../graphql/project.generated"
import { useEffect } from "react"
import { Box, Button, Container } from "@mui/material"
import StickyHeadTable from "../../../components/global_features/StickyHeadTable"
import { GridColDef } from "@mui/x-data-grid"
import { formatCurrency, formatDateToLong } from "../../../utils/service/FormatService"
import { useNavigate } from "react-router-dom"

interface ProjectCostPageProps {
  projectId: String
}

interface RowData {
  _id: string
  title: string
  description: string
  date: Date
  price: number
  category: string
  request_cost: String
}

const ProjectCostPage: React.FC<ProjectCostPageProps> = ({ projectId }) => {
  const { loading, error, data, refetch } = useQuery(FindAllProjectCostLogsDocument, {
    variables: {
      projectId: projectId,
      requiresAuth: true
    }
  })
  const getData = () => {
    return data?.findAllProjectCostLogs
  }
  const navigate = useNavigate();
  const columns: GridColDef<RowData>[] = [
    { field: "index", headerName: "No", type: "number", maxWidth: 50 },
    { field: "title", headerName: "Nama", minWidth: 150, type: "string", flex: 1 },
    {
      field: "description", headerName: "Deskripsi", minWidth: 350, type: "string", flex: 1,
      renderCell: (params) => (<div>{
        params.row.description ? params.row.description : <span className="text-error">Tanpa deskripsi</span>
      }</div>)
    },
    {
      field: "category", headerName: "Kategori", minWidth: 200, type: "string", flex: 1,
    },
    {
      field: "date", headerName: "Tanggal", minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{formatDateToLong(params.row.date.toString())}</>
      )
    },
    {
      field: "price", headerName: "Harga", minWidth: 150, type: "number", flex: 1,
      renderCell: (params) => (
        <>{formatCurrency(params.row.price)}</>
      )
    },
    {
      field: 'action', headerName: 'Detail Request', minWidth: 100, flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="error"
          disabled={params.row.request_cost ? false : true}
          onClick={() => { navigate(`/appuser/request/cost/${params.row.request_cost}`) }}>
          Lihat
        </Button>
      ),
    },
  ]

  return (
    <Box>
      <div className="my-2 flex justify-end">
        <Button variant="contained" color="warning" onClick={() => {  }}>cetak laporan</Button>
      </div>
      <StickyHeadTable
        columns={columns}
        rows={data ? getData() : []}
        withtoolbar={true}
      />
    </Box>
  )
}

export default ProjectCostPage

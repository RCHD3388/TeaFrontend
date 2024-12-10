import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FindAllProjectsDocument } from "../../../graphql/project.generated";
import { formatDateToLong } from "../../../utils/service/FormatService";
import AddProject from "../../../components/project_related/AddProject";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";

interface RowData {
  _id: string,
  name: string,
  createdAt: Date,
  priority: {
    _id: string,
    name: string
  },
  status: {
    _id: string,
    name: string
  }
  location: string
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: "Nama Proyek", minWidth: 50, align: "center" },
  { id: 'createdAt', label: "Tanggal Mulai", minWidth: 50, align: "center",
    renderComponent: (row) => {return (
      <>{formatDateToLong(row.createdAt.toString())}</>)}
  },
  { id: 'priority', label: 'Prioritas', minWidth: 100, align: "center",
    renderComponent: (row) => {return (
      <div className="badge badge-neutral p-3 gap-2">{row.priority.name}</div>)}
  },
  { id: 'status', label: 'Status', minWidth: 50, align: "center",
    renderComponent: (row) => {return (
      <div className="badge badge-neutral p-3 gap-2">{row.status.name}</div>)}
  },
  {
    id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
  },
]

export default function ProjectPage() {
  let { data, loading, refetch } = useQuery(FindAllProjectsDocument, { variables: { requiresAuth: true } })
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate()

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/project/${row._id}`)
    refetch()
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Proyek Anda</div>
        {user && (user.role == "admin" || user.role == "owner") && <div className="flex justify-end"> <AddProject refetchProject={refetch} /> </div>}

        {!loading && <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.findAllProjects ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>}
      </div>
    </div>
  );
}
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FindAllProjectsDocument } from "../../../graphql/project.generated";
import { formatDateToLong } from "../../../utils/service/FormatService";
import AddProject from "../../../components/project_related/AddProject";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import SearchIcon from '@mui/icons-material/Search';
import { GetCategoriesDocument } from "../../../graphql/category.generated";
import { Category } from "@mui/icons-material";
import { CategoryType, EmployeeRoleType } from "../../../types/staticData.types";

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
  {
    id: 'createdAt', label: "Tanggal Mulai", minWidth: 50, align: "center",
    renderComponent: (row) => {
      return (
        <>{formatDateToLong(row.createdAt.toString())}</>)
    }
  },
  {
    id: 'priority', label: 'Prioritas', minWidth: 100, align: "center",
    renderComponent: (row) => {
      return (
        <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{row.priority.name}</div>)
    }
  },
  {
    id: 'status', label: 'Status', minWidth: 50, align: "center",
    renderComponent: (row) => {
      return (
        <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{row.status.name}</div>)
    }
  },
  {
    id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
  },
]

export default function ProjectPage() {
  let { data, loading, error, refetch } = useQuery(FindAllProjectsDocument, { variables: { requiresAuth: true } })
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate()
  const { data: catData, loading: catLoading, error: catError, refetch: catRefetch } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.PRIORITY, CategoryType.COMPLETION_STATUS] },
      requiresAuth: true
    }
  })

  const [nameFilter, setNameFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/project/${row._id}`)
    refetch()
  }

  const getFilterDataCustom = (target: string) => {
    let data = catData.getCategories.filter((cat: any) => cat.type == target)
    data = data.map((d: any) => d.name)
    return data
  }

  useEffect(() => { if (catData) catRefetch() }, [catData, catRefetch]);

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Proyek Anda</div>
        {user && (user.role == EmployeeRoleType.ADMIN || user.role == EmployeeRoleType.OWNER) && <div className="flex justify-end"> <AddProject refetchProject={refetch} /> </div>}

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
            options={catLoading ? [] : getFilterDataCustom(CategoryType.PRIORITY)}
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setPriorityFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Prioritas" />}
          />
          <Autocomplete
            disablePortal
            options={catLoading ? [] : getFilterDataCustom(CategoryType.COMPLETION_STATUS)}
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setStatusFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Status" />}
          />
        </Box>

        {!loading && !error &&
          data?.findAllProjects.length <= 0 ?
          <div className="flex justify-center items-center p-5 bg-accent shadow-md">
            ANDA BELUM MEMILIKI PROYEK
          </div>
          :
          <div>
            <StickyHeadTable
              columns={columns}
              rows={data?.findAllProjects.filter((proj: any) => {
                let condition = proj.name.toLowerCase().includes(nameFilter.toLowerCase())
                  && proj.priority.name.includes(priorityFilter)
                  && proj.status.name.includes(statusFilter)
                return condition
              }) ?? []}
              withIndex={true}
              onActionClick={handleActionTable}
            />
          </div>}
      </div>
    </div>
  );
}
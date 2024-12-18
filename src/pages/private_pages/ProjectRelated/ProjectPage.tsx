import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
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
import { GridColDef } from "@mui/x-data-grid";
import { get } from "react-hook-form";

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

  const handleActionTable = (row: RowData) => {
    navigate(`/appuser/project/${row._id}`)
    refetch()
  }

  const getFilterDataCustom = (target: string) => {
    let data = catData?.getCategories.filter((cat: any) => cat.type == target) || []
    data = data.map((d: any) => d.name)
    return data
  }

  const columns: GridColDef[] = [
    { field: 'index', type: 'number', headerName: "No", minWidth: 50 },
    { field: 'name', headerName: 'Nama Proyek', minWidth: 150, type: "string", flex: 1 },
    { field: 'createdAt', headerName: 'Tanggal Mulai', minWidth: 150, type: "date", flex: 1,
      renderCell: (params) => <>{formatDateToLong(params.row.createdAt.toString())}</>,
      valueGetter: (value, row) => new Date(row.createdAt.toString())
    },
    { field: 'priority', headerName: 'Prioritas', minWidth: 150, type: "singleSelect", flex: 1, 
      align: 'center', headerAlign: 'center',
      valueOptions: getFilterDataCustom(CategoryType.PRIORITY),
      renderCell: (params) => (
        <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">
          {params.row.priority.name}
        </div>
      ),
      valueGetter: (value, row) => row.priority.name
    },
    {
      field: 'status', headerName: 'Status', minWidth: 150, type: "singleSelect", flex: 1, 
      align: 'center', headerAlign: 'center',
      valueOptions: getFilterDataCustom(CategoryType.COMPLETION_STATUS),
      renderCell: (params) => (
        <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">
          {params.row.status.name}
        </div>
      ),
      valueGetter: (value, row) => row.status.name
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 100,
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => {handleActionTable(params.row)}}>
          Detail
        </Button>
      ),
    }
  ]

  useEffect(() => { if (catData) catRefetch() }, [catData, catRefetch]);

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Proyek Anda</div>
        {user && (user.role == EmployeeRoleType.ADMIN || user.role == EmployeeRoleType.OWNER) && <div className="flex justify-end"> <AddProject refetchProject={refetch} /> </div>}

        {!loading && !error &&
          data?.findAllProjects.length <= 0 ?
          <div className="flex justify-center items-center p-5 bg-accent shadow-md">
            ANDA BELUM MEMILIKI PROYEK
          </div>
          :
          <div>
            <StickyHeadTable
              columns={columns}
              rows={data?.findAllProjects || []}
              csvname="project_data"
            />
          </div>}
      </div>
    </div>
  );
}
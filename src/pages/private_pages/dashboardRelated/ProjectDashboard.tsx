import { Autocomplete, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
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
import { GetCategoriesDocument } from "../../../graphql/category.generated";
import { CategoryType, EmployeeRoleType } from "../../../types/staticData.types";
import { GridColDef } from "@mui/x-data-grid";

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

export default function ProjectDashboard() {
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
    {
      field: 'createdAt', headerName: 'Tanggal Mulai', minWidth: 150, type: "date", flex: 1,
      renderCell: (params) => <>{formatDateToLong(params.row.createdAt.toString())}</>,
      valueGetter: (value, row) => new Date(row.createdAt.toString())
    },
    {
      field: 'priority', headerName: 'Prioritas', minWidth: 150, type: "singleSelect", flex: 1,
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
        <Button variant="contained" color="secondary" onClick={() => { handleActionTable(params.row) }}>
          Detail
        </Button>
      ),
    }
  ]

  useEffect(() => { if (catData) catRefetch() }, [catData, catRefetch]);

  const getAllProjectNumber = () => {
    return data?.findAllProjects.length
  }
  const getDoneProjectNumber = () => {
    return data?.findAllProjects.filter((proj: any) => proj.finished_at != null).length
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-1">Dashboard Anda</div>


        {!loading && data &&
          <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-center gap-4">
              {/* Card Total Project */}
              <div className="card flex-grow bg-blue-600 shadow-xl">
                <div className="card-body flex justify-between items-center p-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                    </svg>
                    <h2 className="card-title text-white text-lg">Total Project</h2>
                  </div>
                  <p className="text-3xl font-bold text-white">{getAllProjectNumber()}</p>
                </div>
              </div>
              {/* Card Proyek Dalam Proses */}
              <div className="card flex-grow bg-yellow-400 shadow-xl">
                <div className="card-body flex justify-between items-center p-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-9h2v4h-2V7zm0 6h2v2h-2v-2z" clipRule="evenodd" />
                    </svg>
                    <h2 className="card-title text-white text-lg">Proyek Dalam Proses</h2>
                  </div>
                  <p className="text-3xl font-bold text-white">{getAllProjectNumber() - getDoneProjectNumber()}</p>
                </div>
              </div>
              {/* Card Proyek Terselesaikan */}
              <div className="card flex-grow bg-green-500 shadow-xl">
                <div className="card-body flex justify-between items-center p-2">
                  <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h2 className="card-title text-white text-lg">Proyek Terselesaikan</h2>
                  </div>
                  <p className="text-3xl font-bold text-white">{getDoneProjectNumber()}</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              {!loading && !error &&
                data?.findAllProjects.length <= 0 ?
                <div className="flex justify-center items-center p-5 bg-accent shadow-md">
                  ANDA BELUM MEMILIKI PROYEK
                </div>
                :
                <div>
                  <StickyHeadTable
                    tableSx={{ height: 300 }}
                    columns={columns}
                    rows={data?.findAllProjects || []}
                    csvname="project_data"
                    withtoolbar={true}
                  />
                </div>}
            </div>
          </div>
        }


      </div>
    </div>
  );
}
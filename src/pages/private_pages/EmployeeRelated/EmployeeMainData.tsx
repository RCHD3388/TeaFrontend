import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddEmployee from "../../../components/emlpoyee_related/AddEmployee";
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { useQuery } from "@apollo/client";
import { GetAllEmployeesDocument, GetAllSkillDocument } from "../../../graphql/person.generated";
import { formatCurrency, formatDateToLong } from "../../../utils/service/FormatService";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { EmployeeRoleType, EmployeeRoleTypeValues } from "../../../types/staticData.types";
import { GridColDef } from "@mui/x-data-grid";

interface RowData {
  _id: string,
  person: { name: string },
  hire_date: string,
  salary: number,
  status: string,
  role: { _id: string, name: string },
  skill: [{ _id: string, name: string }]
}

const EmployeeMainData: React.FC = () => {
  let { data, loading, refetch } = useQuery(GetAllEmployeesDocument, { variables: { requiresAuth: true } })
  const { data: skillsData, loading: skillsLoading, refetch: refetchSkill } = useQuery(GetAllSkillDocument, { variables: { requiresAuth: true } })
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate();

  const handleActionTable = (row: RowData) => {
    navigate(`/appuser/employee/${row._id}`)
    refetch()
  }

  useEffect(() => {
    if (skillsData) {
      refetchSkill()
    }
  }, [skillsData, refetchSkill])

  const columns: GridColDef[] = [
    { field: 'index', type: 'number', headerName: "No", minWidth: 25 },
    {
      field: 'person', headerName: 'Nama', minWidth: 150, type: "string", flex: 1,
      valueFormatter: (value, row) => row.person.name,
      valueGetter: (value, row) => String(row.person.name),
    },
    {
      field: 'hire_date', headerName: 'Hire Date', minWidth: 150, type: "date", flex: 1,
      valueFormatter: (value, row) => formatDateToLong(row.hire_date),
    },
    {
      field: 'salary', headerName: 'Salary', minWidth: 150, type: "string", flex: 1,
      valueFormatter: (value, row) => formatCurrency(row.salary), // Format salary
    },
    {
      field: 'status', headerName: 'Status', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: ['Active', 'Inactive'],
      renderCell: (params) => (
        params.row.status === 'Active' ?
          <div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div> :
          <div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div>
      ),
    },
    {
      field: 'role', headerName: 'Role', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: EmployeeRoleTypeValues,
      renderCell: (params) => (<div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{params.row.role.name}</div>),
    },
    {
      field: 'skill', headerName: 'Skill', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: skillsLoading ? [] : skillsData?.getAllSkill.map((sk: any) => sk.name) || [],
      renderCell: (params) => (
        <div className="flex justify-center items-center" style={{ height: "100%" }}>
          <Box sx={{ maxWidth: 200, overflowX: 'auto', display: 'flex', gap: 1 }} >
            {params.row.skill.map((skill: any, index: number) => (
              <div key={index} className="badge whitespace-nowrap badge-neutral p-3 gap-2" > {skill.name} </div>
            ))}
          </Box>
        </div>
      ),
      valueGetter: (value, row) => row.skill.map((sk: any) => sk.name).join(", ")
    },
    {
      field: 'action', headerName: 'Action', minWidth: 100, sortable: false,
      renderCell: (params) => {
        const rowRole = params.row.role.name;
        const isDisabled =
          user.role === EmployeeRoleType.ADMIN &&
          (rowRole === EmployeeRoleType.OWNER || rowRole === EmployeeRoleType.ADMIN);

        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => { handleActionTable(params.row) }}
            disabled={isDisabled}
          >
            Detail
          </Button>
        );
      },
    }
  ]

  return (
    <div className="flex flex-col">
      <div className="flex justify-end"><AddEmployee refetchEmployee={refetch} /></div>

      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllEmployees || []}
          csvname="employee_data"
        />
      </div>}
    </div>
  )
}
export default EmployeeMainData;
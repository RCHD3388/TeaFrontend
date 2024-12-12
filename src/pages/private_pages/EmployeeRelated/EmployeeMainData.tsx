import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddEmployee from "../../../components/emlpoyee_related/AddEmployee";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useQuery } from "@apollo/client";
import { GetAllEmployeesDocument, GetAllSkillDocument } from "../../../graphql/person.generated";
import { formatCurrency, formatDateToLong } from "../../../utils/service/FormatService";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

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

  const [nameFilter, setNameFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'person', label: "Nama", minWidth: 50, align: "center", format: (value) => String(value.name) },
    { id: "hire_date", label: "Hire Date", minWidth: 50, align: "center", format: (value) => formatDateToLong(value) },
    { id: 'salary', label: 'Salary', minWidth: 50, align: "center", format: (value) => formatCurrency(value) },
    {
      id: 'status', label: 'Status', minWidth: 50, align: "center",
      renderComponent: (row) => {
        return (<>
          {row.status == "Active" ?
            <div className="badge badge-success p-3 text-white gap-2">Active</div> :
            <div className="badge badge-warning p-3 gap-2">Inactive</div>}
        </>)
      }
    },
    {
      id: 'role', label: 'Role', minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge badge-neutral p-3 gap-2">{row.role.name}</div>) }
    },
    {
      id: 'skill', label: 'Skill', minWidth: 50, align: "center",
      renderComponent: (row) => {
        return (<div className="flex justify-center items-center">
          <Box sx={{ maxWidth: 200, overflowX: 'auto', display: 'flex', gap: 1 }}>
            {row.skill.map((skillname, index) => <div key={index} className="badge badge-neutral p-3 whitespace-nowrap gap-2">{skillname.name}</div>)}
          </Box>
        </div>)
      },
    },
    {
      id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
      buttonDisabled: (row) => {
        let rowRole = row.role.name
        if (user.role == "admin" && (rowRole == "owner" || rowRole == "admin")) return true
        return false
      }
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/employee/${row._id}`)
    refetch()
  }

  useEffect(() => {
    if (skillsData) {
      refetchSkill()
    }
  }, [skillsData, refetchSkill])

  return (
    <div className="flex flex-col">
      <div className="flex justify-end"><AddEmployee refetchEmployee={refetch} /></div>

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
          options={["owner", "admin", "mandor", "staff_pembelian", "pegawai"]}
          sx={{ width: 300, mb: 1, mr: 1 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setRoleFilter(newValue || "")
          }}
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Role Pegawai" />}
        />
        <Autocomplete
          disablePortal
          options={skillsLoading ? [] : skillsData.getAllSkill.map((sk: any) => { return sk.name })}
          sx={{ width: 300, mb: 1, mr: 1 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setSkillFilter(newValue || "")
          }}
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Skill Pegawai" />}
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

      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllEmployees.filter((emp: any) => {
            let condition = emp.person.name.toLowerCase().includes(nameFilter.toLowerCase()) 
                    && emp.role.name.includes(roleFilter) && emp.status.includes(statusFilter)
                    && emp.skill.find((sk: any) => sk.name.includes(skillFilter))
            return condition
          }) ?? []}
          withIndex={true}
          onActionClick={handleActionTable}
        />
      </div>}
    </div>
  )
}
export default EmployeeMainData;
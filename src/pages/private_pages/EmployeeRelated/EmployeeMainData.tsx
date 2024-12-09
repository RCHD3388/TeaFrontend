import { Box, Button } from "@mui/material";
import React from "react";
import AddEmployee from "../../../components/emlpoyee_related/AddEmployee";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useQuery } from "@apollo/client";
import { GetAllEmployeesDocument } from "../../../graphql/person.generated";
import { formatCurrency, formatDateToLong } from "../../../utils/service/FormatService";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { useNavigate } from "react-router-dom";

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
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate();

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
        if(user.role == "admin" && (rowRole == "owner" || rowRole == "admin")) return true
        return false
      }
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/employee/${row._id}`)
    refetch()
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end"><AddEmployee refetchEmployee={refetch} /></div>

      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllEmployees ?? []}
          withIndex={true}
          onActionClick={handleActionTable}
        />
      </div>}
    </div>
  )
}
export default EmployeeMainData;
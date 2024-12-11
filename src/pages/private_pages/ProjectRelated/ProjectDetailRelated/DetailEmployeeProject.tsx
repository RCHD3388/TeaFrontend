import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FindAllProjectsQuery, FindProjectByIdQueryVariables, GetAllProjectEmployeesDocument, UpdateProjectDocument } from "../../../../graphql/project.generated";
import { Box, Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { selectUser } from "../../../../app/reducers/userSlice";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import AddProjectEmployee from "../../../../components/project_related/AddProjectEmployee";

interface RowData {
  _id: string,
  person: {
    name: string,
    email: string,
    address: string,
    phone_number: string
  },
  role: { _id: string, name: string },
  skill: [{ _id: string, name: string }]
}


interface DetailEmployeeProjectProps {
  dataProject: any,
  loadingProject: boolean,
  errorProject: ApolloError | undefined,
  refetchDetailProject: (variables?: FindProjectByIdQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>;
}

const DetailEmployeeProject: React.FC<DetailEmployeeProjectProps> = ({ dataProject, loadingProject, errorProject, refetchDetailProject }) => {
  const user = useSelector((state: RootState) => selectUser(state))
  const navigate = useNavigate()
  const { data: empData, loading: empLoading, error: empError, refetch: empRefetch } = useQuery(
    GetAllProjectEmployeesDocument,
    {
      variables: {
        id: dataProject.findProjectById._id,
        requiresAuth: true
      }
    }
  )

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'name', label: "Nama", align: "center", renderComponent: (row) => { return (<>{row.person.name}</>) } },
    { id: 'email', label: "Email", align: "center", renderComponent: (row) => { return (<>{row.person.email}</>) } },
    { id: 'address', label: "Alamat", align: "center", renderComponent: (row) => { return (<>{row.person.address}</>) } },
    { id: 'phone_number', label: "Nomer Telepon", align: "center", renderComponent: (row) => { return (<>{row.person.phone_number}</>) } },
    {
      id: 'role', label: 'Role', align: "center",
      renderComponent: (row) => { return (<div className="badge badge-neutral p-3 gap-2">{row.role.name}</div>) }
    },
    {
      id: 'skill', label: 'Skill', align: "center",
      renderComponent: (row) => {
        return (<div className="flex justify-center items-center">
          <Box sx={{ maxWidth: 200, overflowX: 'auto', display: 'flex', gap: 1 }}>
            {row.skill.map((skillname, index) => <div key={index} className="badge badge-neutral p-3 whitespace-nowrap gap-2">{skillname.name}</div>)}
          </Box>
        </div>)
      },
    },
    {
      id: 'detail_employee', label: 'Detail', actionLabel: 'Detail', align: "center",
      renderComponent: (row) => {
        return (<>
          <Button
            variant="contained" color={"secondary"}
            onClick={() => { navigate(`/appuser/employee/${row._id}`) }}
            disabled={user.role === "mandor"}
          >
            Detail
          </Button>
        </>)
      },
    },
    {
      id: 'action', label: 'Hapus', actionLabel: 'Hapus', align: "center", buttonColor: (row) => 'error',
      buttonDisabled: (row) => user.role === "mandor"
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {

  }

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Container sx={{ paddingTop: 4 }}>
          <div className="text-2xl font-bold mb-2">Detail Pegawai</div>
          {!empLoading && <div>
            {(user.role == "admin" || user.role == "owner") && <div className="flex justify-end">
              <AddProjectEmployee dataEmployee={empData} loadingEmployee={empLoading} errorEmployee={empError} refetchEmployee={empRefetch}/>
            </div>}

            <StickyHeadTable
              columns={columns}
              rows={empData?.getAllProjectEmployees.registered ?? []}
              withIndex={true}
              onActionClick={handleActionTable}
            />
          </div>}
        </Container>
      </div>
    </div>
  )
}
export default DetailEmployeeProject;
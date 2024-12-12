import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { FindAllProjectsQuery, FindProjectByIdQueryVariables, GetAllProjectEmployeesDocument, RemoveProjectEmployeeDocument, UpdateProjectDocument } from "../../../../graphql/project.generated";
import { Box, Button, CircularProgress, Container, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { selectUser } from "../../../../app/reducers/userSlice";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import AddProjectEmployee from "../../../../components/project_related/AddProjectEmployee";
import { modalStyle } from "../../../../theme";
import { Controller } from "react-hook-form";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";

interface RowData {
  _id: string,
  person: {
    name: string,
    email: string,
    address: string,
    phone_number: string
  },
  status: string,
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
  const [removeEmployee] = useMutation(RemoveProjectEmployeeDocument);

  const user = useSelector((state: RootState) => selectUser(state))
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const descriptionRef = useRef<HTMLInputElement>(null)
  const [descErr, setDescErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
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

  // delete button
  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    setSelectedRow(row);
    setOpenDeleteModal(true);
  }

  const handleDeleteEmployee = async () => {
    let description = descriptionRef.current?.value || "";
    // check if selected row exist and project exist
    if (selectedRow && dataProject?.findProjectById._id) {
      // check description empty
      if(description.trim() == ""){
        setDescErr("Desskripsi pengeluaran pegawai harus diisi")
        return;
      }

      setIsSubmitting(true)
      try {
        await removeEmployee({
          variables: {
            id: dataProject?.findProjectById._id,
            employee: selectedRow._id,
            description: description,
            requiresAuth: true
          }
        })
        dispatch(openSnackbar({ severity: "success", message: "Berhasil hapus pegawai pada proyek " }))
        if(descriptionRef.current) descriptionRef.current.value = ""
        setSelectedRow(null);
        empRefetch()
        setOpenDeleteModal(false)
      } catch (err: any) {
        let error = err.graphQLErrors[0];
        if (error.code == "BAD_REQUEST") {
          let curError = error.original?.message || error.message;
          let msg = ""
          if (typeof curError == "string") msg = curError;
          if (typeof curError == "object") msg = curError[0];
          dispatch(openSnackbar({ severity: "error", message: msg }))
        } else {
          dispatch(openSnackbar({ severity: "error", message: "Gagal hapus pegawai proyek, silakan coba lagi nanti" }))
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Container sx={{ paddingTop: 4 }}>
          <div className="text-2xl font-bold mb-2">Detail Pegawai</div>
          {!empLoading && !empError && <div>
            {(user.role == "admin" || user.role == "owner") && <div className="flex justify-end">
              <AddProjectEmployee projectId={dataProject.findProjectById._id} dataEmployee={empData} loadingEmployee={empLoading} errorEmployee={empError} refetchEmployee={empRefetch} />
            </div>}

            <StickyHeadTable
              columns={columns}
              rows={empData?.getAllProjectEmployees.registered ?? []}
              withIndex={true}
              onActionClick={handleActionTable}
            />
          </div>}
        </Container>

        <Modal
          open={openDeleteModal}
          onClose={() => { setOpenDeleteModal(false) }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}><b>Hapus pegawai</b></Typography>
            <Box padding={2}>
            <p className="font-bold">Pegawai yang ingin dihapus</p>
            <p><span className="font-bold">Nama :</span> {selectedRow?.person.name || ""}</p>
            <p><span className="font-bold">Email :</span> {selectedRow?.person.email || ""}</p>
            <p><span className="font-bold">Nomer Telepon :</span> {selectedRow?.person.phone_number || ""}</p>
            </Box>
            {/* FIELD START */}
            <TextField
              color="secondary" sx={{ width: "100%", mb: 1 }} label="description" size='small' variant="outlined" inputRef={descriptionRef}
              error={descErr != ""} helperText={descErr || ''}
            />
            {/* FIELD END */}

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                onClick={() => {
                  setSelectedRow(null)
                  setOpenDeleteModal(false)
                }
                }
                variant="contained"
                color="info"
                disabled={isSubmitting}
              >
                Kembali
              </Button>
              <Button
                onClick={() => {handleDeleteEmployee()}}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Konfirm")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
export default DetailEmployeeProject;
import { useMutation, useQuery } from "@apollo/client";
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { GetAllUsersDocument, UpdateUserDocument } from "../../../graphql/user.generated";
import AddUser from "../../../components/user_related/AddUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalStyle } from "../../../theme";
import { GetAllEmployeesDocument } from "../../../graphql/person.generated";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import SearchIcon from '@mui/icons-material/Search';
import { EmployeeRoleTypeValues } from "../../../types/staticData.types";
import { GridColDef } from "@mui/x-data-grid";

interface UpdateUserValues {
  username: string
  status: string
  employee: string
}

interface RowData {
  _id: string,
  username: string
  employee: {
    _id: string
    person: {
      name: string
      email: string
    }
    role: {
      name: string
    }
  }
  status: string
}

export default function UserPage() {
  let { data, loading, refetch } = useQuery(GetAllUsersDocument, { variables: { requiresAuth: true } })
  const [updateUser] = useMutation(UpdateUserDocument)
  const user = useSelector((state: RootState) => selectUser(state))
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const [selectedRow, setSelectedRow] = useState<RowData>();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => { if (data) refetch() }, [data, refetch])

  const { handleSubmit, control, setValue, formState: { errors }, reset } = useForm<UpdateUserValues>({
    defaultValues: {
      username: "",
      status: "",
      employee: "",
    },
  });

  const handleActionTable = (row: RowData) => {
    reset({
      username: row.username,
      status: row.status,
      employee: row.employee._id
    })
    setSelectedRow(row)
    handleOpenModal()
  }

  const handleEditUser: SubmitHandler<UpdateUserValues> = async (data) => {
    if (selectedRow) {
      setIsSubmitting(true)
      updateUser({
        variables: {
          id: selectedRow._id,
          updateUserInput: {
            username: data.username,
            status: data.status,
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data user" }))
        refetch()
        setIsSubmitting(false)
      }).catch((err) => {
        let error = err.graphQLErrors[0];
        if (error.code == "BAD_REQUEST") {
          let curError = error.original?.message || error.message;
          let msg = ""
          if (typeof curError == "string") msg = curError;
          if (typeof curError == "object") msg = curError[0];
          dispatch(openSnackbar({ severity: "error", message: msg }))
        } else {
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data user, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  const columns: GridColDef<RowData>[] = [
    { field: 'index', headerName: "No", type: "number", minWidth: 50 },
    { field: 'username', headerName: "Username", type: "string", flex: 1, minWidth: 150 },
    {
      field: 'name', headerName: 'Name', minWidth: 150, flex: 1, type: "string",
      renderCell: (params) => <>{params.row.employee.person.name}</>,
      valueGetter: (value, row) => row.employee?.person?.name
    },
    {
      field: 'email', headerName: 'Email', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => <>{params.row.employee.person.email}</>,
      valueGetter: (value, row) => row.employee?.person?.email
    },
    {
      field: 'role', headerName: 'Role', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: EmployeeRoleTypeValues,
      renderCell: (params) => (<div className="badge whitespace-nowrap badge-neutral p-3 gap-2"> {params.row.employee.role.name} </div>),
      valueGetter: (value, row) => row.employee?.role?.name
    },
    {
      field: 'status', headerName: 'Status', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: ["Active", "Inactive"],
      renderCell: (params) => (
        <>
          {params.row.status === "Active" ? (
            <div className="badge whitespace-nowrap badge-success p-3 text-white gap-2"> Active </div>
          ) : (
            <div className="badge whitespace-nowrap badge-warning p-3 gap-2"> Inactive </div>
          )}
        </>
      ),
    },
    {
      field: 'action', headerName: 'Action', align: "center", flex: 1, minWidth: 150, sortable: false,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => { handleActionTable(params.row) }}>
          Detail
        </Button>
      ),
    }
  ]

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">User Pegawai Perusahaan</div>
        <div className="flex justify-end"> <AddUser refetchUser={refetch} /> </div>

        {!loading && <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllUsers || []}
            csvname="user_data"
          />
        </div>}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}><b>DETAIL USER</b></Typography>
            {/* FIELD START */}
            <Controller
              name="username" control={control} rules={{ required: 'Username tidak boleh kosong' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 2 }} label="Username" size='small' variant="outlined"
                error={!!errors.username} helperText={errors.username ? errors.username.message : ''}
              />)}
            />
            <Controller
              name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 2 }} label="Status" size="small" variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                >
                  <MenuItem value={"Active"}><div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div></MenuItem>
                  <MenuItem value={"Inactive"}><div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div></MenuItem>
                </TextField>
              )}
            />

            <TextField
              disabled id="outlined-disabled" label="Pegawai" sx={{ width: "100%", mb: 2 }} size="small"
              defaultValue={selectedRow ? `${selectedRow.employee.person.name} (${selectedRow.employee.person.email})` : ""}
            />
            <Button
              sx={{ textDecoration: "none", mb: 2, width: "100%" }} variant="contained" color="secondary" size="small"
              onClick={() => { if (selectedRow) navigate(`/appuser/employee/${selectedRow?.employee._id}`) }}
              disabled={isSubmitting}
            >
              Lihat Detail Pegawai
            </Button>

            {/* FIELD END */}

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="info"
                disabled={isSubmitting}
              >
                Kembali
              </Button>
              <Button
                onClick={handleSubmit(handleEditUser)}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
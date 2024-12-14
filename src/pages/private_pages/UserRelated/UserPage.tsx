import { useMutation, useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
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

  const [nameFilter, setNameFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {if(data) refetch()}, [data, refetch])

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'username', label: "Username", minWidth: 50, align: "center" },
    {
      id: 'name', label: 'Name', minWidth: 50, align: "center",
      renderComponent: (row) => { return (<>{row.employee.person.name}</>) }
    },
    {
      id: 'email', label: 'Email', minWidth: 100, align: "center",
      renderComponent: (row) => { return (<>{row.employee.person.email}</>) }
    },
    {
      id: 'role', label: 'Role', minWidth: 100, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{row.employee.role.name}</div>) }
    },
    {
      id: 'status', label: 'Status', minWidth: 50, align: "center",
      renderComponent: (row) => {
        return (<>
          {row.status == "Active" ?
            <div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div> :
            <div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div>}
        </>)
      },
    },
    {
      id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
    },
  ]

  const { handleSubmit, control, setValue, formState: { errors }, reset } = useForm<UpdateUserValues>({
    defaultValues: {
      username: "",
      status: "",
      employee: "",
    },
  });

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
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

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">User Pegawai Perusahaan</div>
        <div className="flex justify-end"> <AddUser refetchUser={refetch} /> </div>

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
            options={EmployeeRoleTypeValues}
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setRoleFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Role Pegawai"/>}
          />
          <Autocomplete
            disablePortal
            options={["Active", "Inactive"]}
            sx={{ width: 300, mb: 1, mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setStatusFilter(newValue || "")
            }}
            renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Status Pegawai"/>}
          />
        </Box>

        {!loading && <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllUsers.filter((usr: any) => {
              let condition = usr.username.toLowerCase().includes(nameFilter.toLowerCase()) 
                && usr.employee.role.name.includes(roleFilter)
                && usr.status.includes(statusFilter) 
              return condition
            }) ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}><b>DETAIL USER</b></Typography>
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
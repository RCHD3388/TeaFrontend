import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { CreateUserDocument, GetAllUsersQuery, GetAllUsersQueryVariables } from "../../graphql/user.generated";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalStyle } from "../../theme";
import { GetAllEmployeesDocument } from "../../graphql/person.generated";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { generateRandomString } from "../../utils/service/GeneratorService";

interface CreateUserValues {
  username: string
  password: string
  employee: string
}

interface AddUserProps {
  refetchUser: (variables?: GetAllUsersQueryVariables) => Promise<ApolloQueryResult<GetAllUsersQuery>>;
}

const AddUser: React.FC<AddUserProps> = ({ refetchUser }) => {
  let { data, error, loading, refetch } = useQuery(GetAllEmployeesDocument, { variables: { requiresAuth: true } })
  const [createUser] = useMutation(CreateUserDocument);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch()

  const { handleSubmit, control, setValue, formState: { errors }, reset } = useForm<CreateUserValues>({
    defaultValues: {
      username: "",
      password: "",
      employee: "",
    },
  });

  const handleAddUser: SubmitHandler<CreateUserValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createUser({
        variables: {
          createUserInput: {
            username: data.username,
            password: data.password,
            employee: data.employee
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah User" }))
      reset()
      refetchUser()
      handleCloseModal()
    } catch (error: any) {
      let errCode = error?.graphQLErrors[0]?.code || "";
      if (errCode == "BAD_REQUEST") {
        let msg = error.original?.message || error.message || "";
        dispatch(openSnackbar({ severity: "error", message: `Gagal Tambah User, ${msg}` }))
      } else {
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah User" }))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah User</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH USER BARU</b></Typography>
        {/* FIELD START */}
        <Controller
          name="username" control={control} rules={{ required: 'Username is required' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Username" size='small' variant="outlined"
            error={!!errors.username} helperText={errors.username ? errors.username.message : ''}
          />)}
        />
        <Controller
          name="password" control={control} rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters long' }
          }}
          render={({ field }) => (<div className="flex">
            <TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Password" size='small' variant="outlined"
              error={!!errors.password} helperText={errors.password ? errors.password.message : ''}
            />
            <Button
              sx={{ mb: 1, ml: 1, textTransform: "none" }}
              onClick={() => { setValue("password", generateRandomString()) }}
              variant="contained" color="success" size="small"
            >
              Generate
            </Button>
          </div>)}
        />

        <Controller
          name="employee" control={control} rules={{ required: 'Pegawai is required' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Pegawai" size="small" variant="outlined"
              error={!!errors.employee}
              helperText={errors.employee ? errors.employee.message : ''}
            >
              {!loading && !error && data?.getAllEmployees?.map((value: any, index: number) => {
                return <MenuItem key={index} value={value._id}>{value.person.name} ({value.person.email})</MenuItem>
              })}
            </TextField>
          )}
        />

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
            onClick={handleSubmit(handleAddUser)}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddUser
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, InputAdornment, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateEmployeeDocument, GetAllEmployeesQuery, GetAllEmployeesQueryVariables, GetAllRoleDocument, GetAllSkillDocument } from "../../graphql/person.generated";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { modalStyle } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import AddIcon from '@mui/icons-material/Add';
import { RootState } from "../../app/store";
import { selectUser } from "../../app/reducers/userSlice";
import { EmployeeRoleType } from "../../types/staticData.types";

interface CreateEmployeeValues {
  name: string
  email: string
  phone_number: string
  address: string
  hire_date: string
  salary: number
  status: string
  role_id: string
  skill_id: string
}

interface AddEmployeeProps {
  refetchEmployee: (variables?: GetAllEmployeesQueryVariables) => Promise<ApolloQueryResult<GetAllEmployeesQuery>>;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ refetchEmployee }) => {
  const { data: rolesData, loading: rolesLoading, refetch: rolesRefetch } = useQuery(GetAllRoleDocument, { variables: { requiresAuth: true } })
  const { data: skillsData, loading: skillsLoading, refetch } = useQuery(GetAllSkillDocument, { variables: { requiresAuth: true } })
  const [createEmployee] = useMutation(CreateEmployeeDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => selectUser(state))

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateEmployeeValues>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      hire_date: "",
      salary: 0,
      status: "",
      role_id: "",
      skill_id: ""
    },
  });

  useEffect(() => { if (rolesData) rolesRefetch }, [rolesData, rolesRefetch])
  // useEffect(() => { if (skillsData) refetch }, [skillsData, refetch])

  const handleAddEmployee: SubmitHandler<CreateEmployeeValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createEmployee({
        variables: {
          input: {
            hire_date: data.hire_date,
            person: {
              address: data.address,
              email: data.email,
              name: data.name,
              phone_number: data.phone_number,
            },
            role: data.role_id,
            salary: Number(data.salary),
            skill: data.skill_id,
            status: data.status
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Pegawai" }))
      reset()
      refetchEmployee()
      handleCloseModal()
    } catch (err: any) {
      let error = err.graphQLErrors[0];
      if (error.code == "BAD_REQUEST") {
        let curError = error.original?.message || error.message;
        let msg = ""
        if (typeof curError == "string") msg = curError;
        if (typeof curError == "object") msg = curError[0];
        dispatch(openSnackbar({ severity: "error", message: msg }))
      } else {
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Pegawai, silakan coba lagi" }))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
        onClick={async () => {
          await refetch();
          handleOpenModal()
        }}
        endIcon={<AddIcon />}
      >Tambah Pegawai</Button>


      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH PEGAWAI BARU</b></Typography>
          {/* FIELD START */}
          <Controller
            name="name" control={control} rules={{ required: 'Name tidak boleh kosong' }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
              error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
            />)}
          />
          <Controller
            name="email" control={control} rules={{
              required: 'Email tidak boleh kosong',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email tidak valid'
              }
            }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Email" size='small' variant="outlined"
              error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
            />)}
          />
          <Controller
            name="phone_number" control={control} rules={{
              required: 'Nomer telepon tidak boleh kosong',
              validate: (value) =>
                /^(\+62|62|0)[2-9]{1}[0-9]{7,12}$/.test(value) || 'format nomer telepon salah',
            }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Phone" size='small' variant="outlined"
              error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
            />)}
          />
          <Controller
            name="address" control={control} rules={{ required: 'Alamat tidak boleh kosong' }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Address" size='small' variant="outlined"
              error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
            />)}
          />
          <div className="flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="hire_date" control={control}
                rules={{
                  required: 'tanggal tidak boleh kosong',
                  validate: (value) => {
                    if (value && dayjs(value).isAfter(dayjs())) { return 'tanggal tidak boleh di masa depan'; }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    label="Tanggal Rekrut"
                    sx={{ mb: 1, mr: 0.5 }}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || null)}
                    slotProps={{
                      textField: {
                        error: !!fieldState.error,
                        helperText: fieldState.error ? fieldState.error.message : null,
                        size: 'small',
                        fullWidth: true,
                        color: "secondary"
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Controller
              name="salary" control={control} rules={{
                required: 'Gaji tidak boleh kosong',
                validate: (value) => value >= 50000 || 'Gaji harus minimal Rp. 50,000'
              }}
              render={({ field }) => (<TextField
                type="number"
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Gaji" size='small' variant="outlined"
                error={!!errors.salary} helperText={errors.salary ? errors.salary.message : ''}
                InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
              />)}
            />
          </div>
          <div className="flex">
            <Controller
              name="role_id" control={control} rules={{ required: 'Role tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1, mr: 0.5 }} label="Role" size="small" variant="outlined"
                  error={!!errors.role_id}
                  helperText={errors.role_id ? errors.role_id.message : ''}
                >
                  {!rolesLoading && rolesData.getAllRole.map((value: any, index: number) => {
                    if (user.role == EmployeeRoleType.ADMIN && (value.name == EmployeeRoleType.ADMIN || value.name == EmployeeRoleType.OWNER)) return <></>
                    return <MenuItem key={index} value={value._id}>
                      <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{value.name}</div>
                    </MenuItem>
                  })}
                </TextField>
              )}
            />
            <Controller
              name="skill_id" control={control} rules={{ required: 'Skill tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Skill" size="small" variant="outlined"
                  error={!!errors.skill_id}
                  helperText={errors.skill_id ? errors.skill_id.message : ''}
                >
                  {!skillsLoading && skillsData.getAllSkill.map((value: any, index: number) => {
                    return <MenuItem key={index} value={value._id}>
                      <div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{value.name}</div>
                    </MenuItem>
                  })}
                </TextField>
              )}
            />
          </div>
          <Controller
            name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                select sx={{ width: "100%", mb: 1 }} label="Status" size="small" variant="outlined"
                error={!!errors.status}
                helperText={errors.status ? errors.status.message : ''}
              >
                <MenuItem value={"Active"}><div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div></MenuItem>
                <MenuItem value={"Inactive"}><div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div></MenuItem>
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
              onClick={handleSubmit(handleAddEmployee)}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddEmployee;
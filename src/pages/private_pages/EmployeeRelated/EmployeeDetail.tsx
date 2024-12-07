import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllRoleDocument, GetEmployeeByIdDocument, UpdateEmployeeDocument, UpdateEmployeeSkillDocument } from "../../../graphql/person.generated";
import { Box, Button, Container, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { selectUser } from "../../../app/reducers/userSlice";
import { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";

interface RowData {
  _id: string,
  name: string,
  description: string
}
const columns: StickyHeadTableColumn<RowData>[] = [
  { id: "name", label: "Name", minWidth: 50, align: "center" },
  { id: "description", label: "Description", align: "center" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Hapus',
    align: "center",
    buttonColor: (row) => 'error'
  },
]

interface updateEmployeValues {
  name: string
  email: string
  phone_number: string
  address: string
  hire_date: string
  salary: number
  status: string
  role_id: string
  skill_id: [string]
}

const EmployeeDetail: React.FC = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { data: rolesData, loading: rolesLoading } = useQuery(GetAllRoleDocument, { variables: { requiresAuth: true } })
  const { data: employeeData, loading, refetch } = useQuery(GetEmployeeByIdDocument, { variables: { id: employeeId, requiresAuth: true } })
  const [updateEmployee] = useMutation(UpdateEmployeeDocument)
  const [skillData, setSkillData] = useState<RowData[]>([])
  const user = useSelector((state: RootState) => selectUser(state))
  const dispatch = useDispatch()
  const getEmployeeData = () => employeeData.getEmployeeById

  const { handleSubmit, control, formState: { errors }, reset } = useForm<updateEmployeValues>({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      hire_date: '',
      salary: 0,
      status: '',
      role_id: ''
    }
  });

  useEffect(() => {
    if (!loading && employeeData) {
      reset({
        name: employeeData.getEmployeeById.person.name,
        email: employeeData.getEmployeeById.person.email,
        phone_number: employeeData.getEmployeeById.person.phone_number,
        address: employeeData.getEmployeeById.person.address,
        hire_date: employeeData.getEmployeeById.hire_date,
        salary: Number(employeeData.getEmployeeById.salary),
        status: employeeData.getEmployeeById.status,
        role_id: employeeData.getEmployeeById.role._id
      });
      setSkillData(employeeData.getEmployeeById.skill)
    }
  }, [loading, employeeData])

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    let currentSkillData = [...skillData]; 
    currentSkillData = currentSkillData.filter((sk) => sk._id !== row._id)

    if(employeeData?.getEmployeeById){
      updateEmployee({variables: {
        id: employeeData.getEmployeeById._id,
        updateEmployeeInput: {
          skills: currentSkillData.map((sk) => {sk._id})  
        },
        requiresAuth: true,
      }}).then((response) => {
        setSkillData(currentSkillData);
        dispatch(openSnackbar({ severity: "success", message: "Berhasil hapus skill pada pegawai" }))
      }).catch((err) => {
        dispatch(openSnackbar({ severity: "error", message: "Gagal hapus skill pada pegawai" }))
      })
    }
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Box display={"flex"}>
          <IconButton
            style={{ backgroundColor: theme.palette.secondary.main, height: 40, width: 40, borderRadius: 8, color: 'white' }}
            sx={{ mr: 1 }}
            onClick={() => { navigate("/appuser/employee") }}
          >
            <ReplyAllIcon fontSize="medium"></ReplyAllIcon>
          </IconButton>
          <div className="text-4xl font-bold mb-2">Detail Pegawai</div>
        </Box>
        <Container sx={{ paddingTop: 4 }}>
          {!loading && <div>
            <Controller
              name="name" control={control} rules={{ required: 'Name is required' }}
              render={({ field }) => (<TextField
                {...field}
                sx={{ width: "100%", mb: 2 }} label="Name" size='small' variant="outlined"
                error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
              />)}
            />
            <Controller
              name="email" control={control} rules={{ required: 'Email is required' }}
              render={({ field }) => (<TextField
                {...field}
                sx={{ width: "100%", mb: 2 }} label="Email" size='small' variant="outlined"
                error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
              />)}
            />
            <Controller
              name="phone_number" control={control} rules={{
                required: 'Phone is required',
                validate: (value) =>
                  /^(\+62|62|0)[2-9]{1}[0-9]{7,12}$/.test(value) || 'Invalid phone number format',
              }}
              render={({ field }) => (<TextField
                {...field}
                sx={{ width: "100%", mb: 2 }} label="Phone" size='small' variant="outlined"
                error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
              />)}
            />
            <Controller
              name="address" control={control} rules={{ required: 'Address is required' }}
              render={({ field }) => (<TextField
                {...field}
                sx={{ width: "100%", mb: 2 }} label="Address" size='small' variant="outlined"
                error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
              />)}
            />
            <div className="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="hire_date" control={control}
                  rules={{
                    required: 'Hire date is required',
                    validate: (value) => {
                      if (value && dayjs(value).isAfter(dayjs())) { return 'Hire date cannot be in the future'; }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      {...field}
                      label="Hire Date"
                      sx={{ mb: 2, mr: 1 }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || null)}
                      slotProps={{
                        textField: {
                          error: !!fieldState.error,
                          helperText: fieldState.error ? fieldState.error.message : null,
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Controller
                name="salary" control={control} rules={{
                  required: 'Valid Gaji value is required',
                  validate: (value) => value >= 50000 || 'Gaji harus minimal Rp. 50,000'
                }}
                render={({ field }) => (<TextField
                  type="number"
                  {...field}
                  sx={{ width: "100%", mb: 2, ml: 1 }} label="Gaji" size='small' variant="outlined"
                  error={!!errors.salary} helperText={errors.salary ? errors.salary.message : ''}
                  InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
                />)}
              />
            </div>
            <div className="flex">
              <Controller
                name="status" control={control} rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <TextField
                    {...field} select sx={{ width: "100%", mb: 2, mr: 1 }} label="Status" size="small" variant="outlined"
                    error={!!errors.status}
                    helperText={errors.status ? errors.status.message : ''}
                  >
                    <MenuItem value={"Active"}>{"Active"}</MenuItem>
                    <MenuItem value={"Inactive"}>{"Inactive"}</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="role_id" control={control} rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <TextField
                    {...field} select sx={{ width: "100%", mb: 2, ml: 1 }} label="Role" size="small" variant="outlined"
                    error={!!errors.role_id}
                    helperText={errors.role_id ? errors.role_id.message : ''}
                  >
                    {!rolesLoading && rolesData.getAllRole.map((value: any, index: number) => {
                      if (user.role == "admin" && (value.name == "admin" || value.name == "owner")) return <></>
                      return <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                    })}
                  </TextField>
                )}
              />
            </div>
            <div className="text-xl font-bold mb-2">Skill Pegawai</div>
            <StickyHeadTable
              columns={columns}
              rows={skillData ?? []}
              withIndex={true}
              onActionClick={handleActionTable}
            />
          </div>}
        </Container>
      </div>
    </div>
  )
}
export default EmployeeDetail;
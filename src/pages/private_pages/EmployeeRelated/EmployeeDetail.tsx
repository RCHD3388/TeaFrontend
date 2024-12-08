import { useMutation, useQuery } from "@apollo/client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllRoleDocument, GetAllSkillDocument, GetEmployeeByIdDocument, UpdateEmployeeDocument, UpdateEmployeeSkillDocument } from "../../../graphql/person.generated";
import { Autocomplete, Box, Button, CircularProgress, Container, IconButton, InputAdornment, MenuItem, Tab, Tabs, TextField } from "@mui/material";
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
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";

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
  const { data: skillsData, loading: skillsLoading, refetch: skillDataRefetch } = useQuery(GetAllSkillDocument, { variables: { requiresAuth: true } })
  const { data: rolesData, loading: rolesLoading } = useQuery(GetAllRoleDocument, { variables: { requiresAuth: true } })
  const { data: employeeData, loading, refetch, error: employeeDataError } = useQuery(GetEmployeeByIdDocument, { variables: { id: employeeId, requiresAuth: true } })
  const [updateEmployee] = useMutation(UpdateEmployeeDocument)
  const [skillData, setSkillData] = useState<RowData[]>([])
  const user = useSelector((state: RootState) => selectUser(state))
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const selectedNewSkill = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    if (employeeDataError) {
      let graphqlErrorFetch = employeeDataError?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
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
    }
  }, [loading, employeeData, employeeDataError])

  const handleEditEmployee = (data: updateEmployeValues) => {

    if (employeeData?.getEmployeeById) {
      setIsSubmitting(true)
      updateEmployee({
        variables: {
          id: employeeData.getEmployeeById._id,
          updateEmployeeInput: {
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            address: data.address,
            status: data.status,
            salary: Number(data.salary),
            hire_date: data.hire_date,
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data pegawai" }))
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
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data pegawai, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  // HANDLE UPDATE EMPLOYEE SKILL

  const handleUpdateSkillData = (currentSkillData: SetStateAction<RowData[]>, updatedSkills: string[]) => {
    if (employeeData?.getEmployeeById) {
      updateEmployee({
        variables: {
          id: employeeData.getEmployeeById._id, updateEmployeeInput: { skills: updatedSkills },
          requiresAuth: true,
        },
      }).then(() => {
        setSkillData(currentSkillData);
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui skill pada pegawai" }))
      }).catch((err) => {
        let error = err.graphQLErrors[0];
        if (error.code == "BAD_REQUEST") {
          let curError = error.original?.message || error.message;
          let msg = ""
          if (typeof curError == "string") msg = curError;
          if (typeof curError == "object") msg = curError[0];
          dispatch(openSnackbar({ severity: "error", message: msg }))
        } else {
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui skill pada pegawai, Silakan coba lagi nanti" }))
        }
      })
    }
  }

  const handleAddEmployeeSkill = () => {
    let currentSkillData = [...skillData];
    let newSkillName = selectedNewSkill.current?.value || null;
    if (newSkillName && !skillsLoading) {
      let newSkill = skillsData?.getAllSkill?.find((sk: any) => sk.name == newSkillName) || null;
      if (newSkill) {
        currentSkillData.push({ _id: newSkill._id, name: newSkill.name, description: newSkill.description });
        let updatedSkill = currentSkillData.map((sk) => sk._id)
        handleUpdateSkillData(currentSkillData, updatedSkill);
      }
    }
  }

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    let currentSkillData = [...skillData];
    currentSkillData = currentSkillData.filter((sk) => sk._id !== row._id)
    let updatedSkills = currentSkillData.map((sk) => sk._id);
    handleUpdateSkillData(currentSkillData, updatedSkills)
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

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary'>
              <Tab label="Informasi Personal" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              <Tab label="Histori Proyek Pegawai" {...a11yProps(1)} sx={{
                color: value === 1 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Container sx={{ paddingTop: 4 }}>
              {!loading && <div>
                {/* FIELD START */}
                <Controller
                  name="name" control={control} rules={{ required: 'Name is required' }}
                  render={({ field }) => (<TextField
                    {...field} color="secondary"
                    sx={{ width: "100%", mb: 2 }} label="Name" size='small' variant="outlined"
                    error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
                  />)}
                />
                <Controller
                  name="email" control={control} rules={{ required: 'Email is required' }}
                  render={({ field }) => (<TextField
                    {...field} color="secondary"
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
                    {...field} color="secondary"
                    sx={{ width: "100%", mb: 2 }} label="Phone" size='small' variant="outlined"
                    error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
                  />)}
                />
                <Controller
                  name="address" control={control} rules={{ required: 'Address is required' }}
                  render={({ field }) => (<TextField
                    {...field} color="secondary"
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
                              color: "secondary"
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
                      {...field} color="secondary"
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
                        {...field}  color="secondary" 
                        select sx={{ width: "100%", mb: 2, mr: 1 }} label="Status" size="small" variant="outlined"
                        error={!!errors.status}
                        helperText={errors.status ? errors.status.message : ''}
                      >
                        <MenuItem value={"Active"}><div className="badge badge-success text-white gap-2">Active</div></MenuItem>
                        <MenuItem value={"Inactive"}><div className="badge badge-success text-white gap-2">Inactive</div></MenuItem>
                      </TextField>
                    )}
                  />
                  <Controller
                    name="role_id" control={control} rules={{ required: 'Role is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}  color="secondary" 
                        select sx={{ width: "100%", mb: 2, ml: 1 }} label="Role" size="small" variant="outlined"
                        error={!!errors.role_id}
                        helperText={errors.role_id ? errors.role_id.message : ''}
                      >
                        {!rolesLoading && rolesData.getAllRole.map((value: any, index: number) => {
                          if (user.role == "admin" && (value.name == "admin" || value.name == "owner")) return <></>
                          return <MenuItem key={index} value={value._id}><div className="badge badge-neutral gap-2">{value.name}</div></MenuItem>
                        })}
                      </TextField>
                    )}
                  />
                </div>
                {/* FIELD END */}

                {/* BUTTON SUBMIT */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmit(handleEditEmployee)}
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
                  </Button>
                </div>
                {/* BUTTON SUBMIT END */}

                {/* PEGAWAI HANDLER */}
                <div className="text-xl font-bold mb-2">Skill Pegawai</div>
                <Box display={"flex"} gap={2} sx={{ mb: 2 }}>
                  <Autocomplete
                    disablePortal
                    options={skillsLoading ? [] : skillsData.getAllSkill.map((sk: any) => { return { label: sk.name, value: sk._id } })}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Skill Pegawai" inputRef={selectedNewSkill} />}
                  />
                  <Button
                    onClick={handleAddEmployeeSkill}
                    variant="contained"
                    color="secondary"
                  >
                    Tambah Skill
                  </Button>
                </Box>
                <StickyHeadTable
                  columns={columns}
                  rows={skillData ?? []}
                  withIndex={true}
                  onActionClick={handleActionTable}
                />
              </div>}
            </Container>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <h1>Project History</h1>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  )
}
export default EmployeeDetail;
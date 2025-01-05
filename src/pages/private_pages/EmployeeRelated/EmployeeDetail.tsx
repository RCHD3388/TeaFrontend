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
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { a11yProps, CustomTabPanel } from "../../../components/CustomTabPanel";
import { EmployeeRoleType } from "../../../types/staticData.types";
import { GridColDef } from "@mui/x-data-grid";
import ProjectHistoryCard from "../../../components/emlpoyee_related/ProjectHistoryCard";

interface RowData {
  _id: string,
  name: string,
  description: string
}
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
            role: data.role_id
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

  const handleActionTable = (row: RowData) => {
    let currentSkillData = [...skillData];
    currentSkillData = currentSkillData.filter((sk) => sk._id !== row._id)
    let updatedSkills = currentSkillData.map((sk) => sk._id);
    handleUpdateSkillData(currentSkillData, updatedSkills)
  }

  const columns: GridColDef[] = [
    { field: "index", headerName: "No", type: "number", flex: 1 },
    { field: "name", headerName: "Name", minWidth: 200, type: "string", flex: 2 },
    { field: "description", headerName: "Description", minWidth: 200, type: "string", flex: 2 },
    {
      field: 'action', headerName: 'Hapus', minWidth: 100, flex: 1, sortable: false, filterable: false,
      renderCell: (params) => (
        <Button variant="contained" color="error"
          onClick={() => { handleActionTable(params.row) }}>
          Hapus
        </Button>
      ),
    },
  ]

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        <Box display={"flex"}>
          <IconButton
            style={{ backgroundColor: theme.palette.secondary.main, height: 40, width: 40, borderRadius: 8, color: 'white' }}
            sx={{ mr: 1 }}
            onClick={() => { navigate(-1) }}
          >
            <ReplyAllIcon fontSize="medium"></ReplyAllIcon>
          </IconButton>
          <div className="text-4xl font-bold mb-2">Detail Pegawai</div>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', top: "0%", backgroundColor: "white" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor='secondary' variant="scrollable">
              <Tab label="Informasi Personal" {...a11yProps(0)} sx={{
                color: value === 0 ? 'secondary.main' : 'inherit',
                '&.Mui-selected': { color: 'secondary.main' },
              }} />
              {(employeeData?.getEmployeeById.role.name === EmployeeRoleType.PEGAWAI ||
                employeeData?.getEmployeeById.role.name === EmployeeRoleType.MANDOR) &&
                <Tab label="Histori Proyek Pegawai" {...a11yProps(1)} sx={{
                  color: value === 1 ? 'secondary.main' : 'inherit',
                  '&.Mui-selected': { color: 'secondary.main' },
                }} />}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {!loading && !employeeDataError && <div>
              {/* FIELD START */}
              <Controller
                name="name" control={control} rules={{ required: 'Name tidak boleh kosong' }}
                render={({ field }) => (<TextField
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 2 }} label="Name" size='small' variant="outlined"
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
                  sx={{ width: "100%", mb: 2 }} label="Email" size='small' variant="outlined"
                  error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
                />)}
              />
              <Controller
                name="phone_number" control={control} rules={{
                  required: 'Nomer telepon tidak boleh kosong',
                  validate: (value) =>
                    /^(\+62|62|0)[2-9]{1}[0-9]{7,12}$/.test(value) || 'Format nomor telepon tidak valid',
                }}
                render={({ field }) => (<TextField
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 2 }} label="Phone" size='small' variant="outlined"
                  error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
                />)}
              />
              <Controller
                name="address" control={control} rules={{ required: 'Alamat tidak boleh kosong' }}
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
                      required: 'Tanggal tidak boleh kosong',
                      validate: (value) => {
                        if (value && dayjs(value).isAfter(dayjs())) { return 'Tanggal tidak boleh di masa depan'; }
                        return true;
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <DatePicker
                        {...field}
                        label="Tanggal Rekrut"
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
                    required: 'Gaji tidak boleh kosong',
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
                  name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
                  render={({ field }) => (
                    <TextField
                      {...field} color="secondary"
                      select sx={{ width: "100%", mb: 2, mr: 1 }} label="Status" size="small" variant="outlined"
                      error={!!errors.status}
                      helperText={errors.status ? errors.status.message : ''}
                    >
                      <MenuItem value={"Active"}><div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div></MenuItem>
                      <MenuItem value={"Inactive"}><div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div></MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="role_id" control={control} rules={{ required: 'Role tidak boleh kosong' }}
                  render={({ field }) => (
                    <TextField
                      {...field} color="secondary"
                      select sx={{ width: "100%", mb: 2, ml: 1 }} label="Role" size="small" variant="outlined"
                      error={!!errors.role_id}
                      helperText={errors.role_id ? errors.role_id.message : ''}
                    >
                      {!rolesLoading && rolesData.getAllRole.map((value: any, index: number) => {
                        if (user.role == EmployeeRoleType.ADMIN && (value.name == EmployeeRoleType.ADMIN || value.name == EmployeeRoleType.OWNER)) return <></>
                        return <MenuItem key={index} value={value._id}><div className="badge whitespace-nowrap badge-neutral p-3 gap-2">{value.name}</div></MenuItem>
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
                  options={skillsLoading || !skillsData ? [] : skillsData.getAllSkill.map((sk: any) => { return { label: sk.name, value: sk._id } })}
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
                withtoolbar={false}
              />
            </div>}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {!loading && !employeeDataError && employeeData.getEmployeeById.project_history.map((history: any, index: number) => {
              return <ProjectHistoryCard
                key={index}
                join_at={history.join_at}
                left_at={history.left_at}
                description={history.description}
                project={{
                  _id: history.project._id,
                  name: history.project.name,
                }}
                onViewDetails={(projectId) => {navigate("/appuser/project/" + projectId)}}
              />
            })}
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  )
}
export default EmployeeDetail;
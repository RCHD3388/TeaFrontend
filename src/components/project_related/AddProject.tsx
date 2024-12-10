import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateProjectDocument, FindAllProjectsQuery, FindAllProjectsQueryVariables } from "../../graphql/project.generated";
import { GetAllEmployeesDocument } from "../../graphql/person.generated";
import { GetCategoriesDocument } from "../../graphql/category.generated";
import { CreateProjectInput } from "../../types/graphql_types";

interface CreateProjectValues {
  name: string;
  location: string;
  description: string;
  target_date: Date;
  priority: string;
  status: string;
  project_leader: string;
}

interface AddProjectProps {
  refetchProject: (variables?: FindAllProjectsQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>;
}

const AddProject: React.FC<AddProjectProps> = ({ refetchProject }) => {
  const { data: empData, loading: empLoading, error: empError, refetch: empRefetch } = useQuery(GetAllEmployeesDocument, {
    variables: {
      employeeFilter: { filter: ["mandor"] },
      requiresAuth: true
    }
  })
  const { data: catData, loading: catLoading, error: catError, refetch: catRefetch } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: ["priority", "completion_status"] },
      requiresAuth: true
    }
  })
  const [createProject] = useMutation(CreateProjectDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateProjectValues>({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      priority: "",
      status: "",
      project_leader: "",
    },
  });

  const handleAddProject: SubmitHandler<CreateProjectValues> = async (data) => {
    setIsSubmitting(true)
    console.log(data.target_date)
    try {
      let createProjectInput: CreateProjectInput = {
        name: data.name,
        location: data.location,
        description: data.description,
        priority: data.priority,
        status: data.status,
        project_leader: data.project_leader,
      }
      if (data.target_date) createProjectInput.target_date = data.target_date
      await createProject({
        variables: {
          createProjectInput, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Project" }))
      reset()
      refetchProject()
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
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Project, silakan coba lagi nanti" }))
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
    >Inisialisasi Project Baru</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>INISIALISASI PROJECT BARU</b></Typography>
        {/* FIELD START */}
        <Controller
          name="name" control={control} rules={{ required: 'Name is required' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
            error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
          />)}
        />
        <Controller
          name="location" control={control} rules={{ required: 'Lokasi is required' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Lokasi" size='small' variant="outlined"
            error={!!errors.location} helperText={errors.location ? errors.location.message : ''}
          />)}
        />
        <Controller
          name="description" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Deskripsi" size='small' variant="outlined"
            error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
          />)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="target_date" control={control}
            rules={{
              validate: (value) => {
                if (value && dayjs(value).isBefore(dayjs())) { return 'Tanggal target must be in the future'; }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <DatePicker
                {...field}
                label="Tanggal Target"
                sx={{ mb: 1 }}
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
        <Box display={"flex"} mb={1} >
          <Controller
            name="status" control={control} rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                select sx={{ width: "100%", mr: 0.5 }} label="Status" size="small" variant="outlined"
                error={!!errors.status}
                helperText={errors.status ? errors.status.message : ''}
              >
                {!catLoading && !catError && catData.getCategories.map((data: any, index: number) => {
                  if (data.type == "completion_status") return (
                    <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.name}</div></MenuItem>
                  )
                })}
              </TextField>
            )}
          />
          <Controller
            name="priority" control={control} rules={{ required: 'Priority is required' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                select sx={{ width: "100%", ml: 0.5 }} label="Prioritas" size="small" variant="outlined"
                error={!!errors.status}
                helperText={errors.status ? errors.status.message : ''}
              >
                {!catLoading && !catError && catData.getCategories.map((data: any, index: number) => {
                  if (data.type == "priority") return (
                    <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.name}</div></MenuItem>
                  )
                })}
              </TextField>
            )}
          />
        </Box>
        <Controller
          name="project_leader" control={control} rules={{ required: 'Mandor is required' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Mandor" size="small" variant="outlined"
              error={!!errors.status}
              helperText={errors.status ? errors.status.message : ''}
            >
              {!empLoading && !empError && empData.getAllEmployees.map((data: any, index: number) => {
                return <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.person.name} ({data.person.email})</div></MenuItem>
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
            onClick={handleSubmit(handleAddProject)}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("inisialisasi")}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddProject;
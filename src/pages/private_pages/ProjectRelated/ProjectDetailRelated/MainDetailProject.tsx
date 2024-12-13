import { ApolloError, ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FindAllProjectsQuery, FindProjectByIdQueryVariables, UpdateProjectDocument } from "../../../../graphql/project.generated";
import { CustomGraphQLError } from "../../../../types/apollo_client.types";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { GetAllEmployeesDocument } from "../../../../graphql/person.generated";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { formatDateToLong } from "../../../../utils/service/FormatService";
import { RootState } from "../../../../app/store";
import { selectUser } from "../../../../app/reducers/userSlice";
import { CategoryType, EmployeeRoleType } from "../../../../types/staticData.types";

interface updateProjectValues {
  name: string;
  location: string;
  description: string;
  target_date: Date;
  priority: string;
  status: string;
  project_leader: string;
}

interface MainDetailProjectProps {
  dataProject: any,
  loadingProject: boolean,
  errorProject: ApolloError | undefined,
  refetchDetailProject: (variables?: FindProjectByIdQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>;
}

const MainDetailProject: React.FC<MainDetailProjectProps> = ({ dataProject, loadingProject, errorProject, refetchDetailProject }) => {
  const user = useSelector((state: RootState) => selectUser(state))
  const { data: empData, loading: empLoading, error: empError, refetch: empRefetch } = useQuery(GetAllEmployeesDocument, {
    variables: {
      employeeFilter: { filter: [EmployeeRoleType.MANDOR] },
      requiresAuth: true
    },
    skip: user.role == EmployeeRoleType.MANDOR
  })
  const { data: catData, loading: catLoading, error: catError, refetch: catRefetch } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.PRIORITY, CategoryType.COMPLETION_STATUS] },
      requiresAuth: true
    }
  })
  const [updateProject] = useMutation(UpdateProjectDocument)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control, formState: { errors }, reset } = useForm<updateProjectValues>({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      priority: "",
      status: "",
      project_leader: "",
    }
  });

  const handleEditProject = (data: updateProjectValues) => {
    if (dataProject?.findProjectById) {
      setIsSubmitting(true)
      updateProject({
        variables: {
          id: dataProject.findProjectById._id,
          updateProjectInput: {
            name: data.name,
            location: data.location,
            description: data.description,
            target_date: data.target_date,
            priority: data.priority,
            status: data.status,
            project_leader: data.project_leader,
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data project" }))
        refetchDetailProject()
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
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data project, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  useEffect(() => {
    if (errorProject) {
      let graphqlErrorFetch = errorProject?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
      if (!loadingProject && dataProject) {
        reset({
          name: dataProject.findProjectById.name,
          location: dataProject.findProjectById.location,
          description: dataProject.findProjectById.description,
          target_date: dataProject.findProjectById.target_date,
          priority: dataProject.findProjectById.priority._id,
          status: dataProject.findProjectById.status._id,
          project_leader: dataProject.findProjectById.project_leader._id,
        });
      }
    }
  }, [loadingProject, dataProject, errorProject])

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>


        <Container sx={{ paddingTop: 4 }}>
          {!loadingProject && <div>
            <Box sx={{ mb: 3 }} display={"flex"} flexDirection={"column"}>
              <span><span className="font-bold mb-5">Tanggal Inisialisasi</span> : {formatDateToLong(dataProject.findProjectById.createdAt)}</span>
              <span>
                <span className="font-bold">Tanggal Selesai</span> :
                {dataProject.findProjectById.finishedAt ? formatDateToLong(dataProject.findProjectById.finishedAt) : <span className="text-error"> Project Belum Selesai</span>}
              </span>
            </Box>

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
              name="location" control={control} rules={{ required: 'Lokasi tidak boleh kosong' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Lokasi" size='small' variant="outlined"
                error={!!errors.location} helperText={errors.location ? errors.location.message : ''}
              />)}
            />
            <Controller
              name="description" control={control}
              render={({ field }) => (<TextField
                {...field} color="secondary" multiline rows={3}
                sx={{ width: "100%", mb: 1 }} label="Deskripsi" size='small' variant="outlined"
                error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
              />)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="target_date" control={control}
                rules={{
                  validate: (value) => {
                    if (value && dayjs(value).isBefore(dayjs())) { return 'Tanggal target harus di masa depan'; }
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
                name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
                render={({ field }) => (
                  <>
                    {!catLoading && !catError && (
                      <TextField
                        {...field} color="secondary"
                        select sx={{ width: "100%", mr: 0.5 }} label="Status" size="small" variant="outlined"
                        error={!!errors.status}
                        helperText={errors.status ? errors.status.message : ''}
                      >
                        {catData.getCategories.map((data: any, index: number) => {
                          if (data.type == CategoryType.COMPLETION_STATUS) return (
                            <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.name}</div></MenuItem>
                          )
                        })}

                      </TextField>
                    )}
                  </>
                )}
              />
              <Controller
                name="priority" control={control} rules={{ required: 'Prioritas tidak boleh kosong' }}
                render={({ field }) => (
                  <>
                    {!catLoading && !catError && (
                      <TextField
                        {...field} color="secondary"
                        select sx={{ width: "100%", ml: 0.5 }} label="Prioritas" size="small" variant="outlined"
                        error={!!errors.status}
                        helperText={errors.status ? errors.status.message : ''}
                      >
                        {catData.getCategories.map((data: any, index: number) => {
                          if (data.type == CategoryType.PRIORITY) return (
                            <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.name}</div></MenuItem>
                          )
                        })}
                      </TextField>
                    )}
                  </>
                )}
              />
            </Box>
            <Controller
              name="project_leader" control={control} rules={{ required: 'Mandor tidak boleh kosong' }}
              render={({ field }) => (
                <>
                  {user.role != EmployeeRoleType.MANDOR && !empLoading && !empError && (
                    <TextField
                      {...field} color="secondary"
                      select sx={{ width: "100%", mb: 4 }} label="Mandor" size="small" variant="outlined"
                      error={!!errors.status}
                      helperText={errors.status ? errors.status.message : ''}
                    >
                      {empData?.getAllEmployees.map((data: any, index: number) => {
                        return <MenuItem key={index} value={data._id}><div className="badge p-3 gap-2">{data.person.name} ({data.person.email})</div></MenuItem>
                      })}
                    </TextField>
                  )}
                </>
              )}
            />
            {/* FIELD END */}

            {/* BUTTON SUBMIT */}
            <div className="flex justify-between">
              <Button
                onClick={() => { }}
                variant="contained"
                color="error"
                disabled={isSubmitting}
              >
                Closing Proyek
              </Button>
              <Button
                onClick={handleSubmit(handleEditProject)}
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
              </Button>
            </div>
            {/* BUTTON SUBMIT END */}
          </div>}
        </Container>
      </div>
    </div>
  )
}
export default MainDetailProject;
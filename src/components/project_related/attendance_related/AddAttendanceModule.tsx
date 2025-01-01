import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { modalStyle } from "../../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { CreateAttendanceDocument, CreateProjectDocument, FindAllAttendanceModulesQuery, FindAllAttendanceModulesQueryVariables, FindAllProjectsQuery, FindAllProjectsQueryVariables } from "../../../graphql/project.generated";
import { GetAllEmployeesDocument } from "../../../graphql/person.generated";
import { GetCategoriesDocument } from "../../../graphql/category.generated";
import { CreateProjectInput } from "../../../types/graphql_types";
import { CategoryType, EmployeeRoleType } from "../../../types/staticData.types";
import { GetBadReqMsg } from "../../../utils/helpers/ErrorMessageHelper";

interface AddAttendanceModuleProps {
  projectId: string
  refetchProjectAttendance: (variables?: FindAllAttendanceModulesQueryVariables) => Promise<ApolloQueryResult<FindAllAttendanceModulesQuery>>;
}

const AddAttendanceModule: React.FC<AddAttendanceModuleProps> = ({ projectId, refetchProjectAttendance }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const [createAttendanceModule] = useMutation(CreateAttendanceDocument);
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<{ start_date: Date }>({});

  const handleSubmitNewModule: SubmitHandler<{ start_date: Date }> = async (data) => {
    setIsSubmitting(true)
    try {
      await createAttendanceModule({
        variables: {
          createAttendanceInput: {
            start_date: data.start_date,
            project_id: projectId
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil tambah module absensi" }))
      refetchProjectAttendance()
      reset()
      handleCloseModal()
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal tambah modul absen, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
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
    >Tambah Modul Absensi</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 600
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH MODUL ABSENSI</b></Typography>

        <Box mb={3}>Modul absensi akan digunakan untuk mengatur absen pegawai selama 1 minggu. Dimulai dari tanggal awal yang diberikan</Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="start_date" control={control}
            rules={{
              required: 'tanggal tidak boleh kosong'
            }}
            render={({ field, fieldState }) => (
              <DatePicker
                {...field}
                label="Tanggal Awal Absensi"
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
            onClick={handleSubmit(handleSubmitNewModule)}
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

export default AddAttendanceModule;
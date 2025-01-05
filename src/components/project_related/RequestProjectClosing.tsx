import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { CreateUserDocument, GetAllUsersQuery, GetAllUsersQueryVariables } from "../../graphql/user.generated";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalStyle } from "../../theme";
import { GetAllEmployeesDocument } from "../../graphql/person.generated";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { generateRandomString } from "../../utils/service/GeneratorService";
import { RootState } from "../../app/store";
import { selectUser } from "../../app/reducers/userSlice";
import { EmployeeRoleType } from "../../types/staticData.types";
import { CreateRequestClosingDocument, FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables } from "../../graphql/project_closing.generated";
import { GetBadReqMsg } from "../../utils/helpers/ErrorMessageHelper";
import { useNavigate } from "react-router-dom";

interface CreateRequestClosingValues {
  title: string
  description: string
}

interface RequestProjectClosingProps {
  refetchProjectClosing: (variables?: FindAllRequestClosingQueryVariables) => Promise<ApolloQueryResult<FindAllRequestClosingQuery>>,
  disabledCondition: boolean
  project_id: string,
}

const RequestProjectClosing: React.FC<RequestProjectClosingProps> = ({ refetchProjectClosing, disabledCondition, project_id }) => {
  const [createRequestClosing] = useMutation(CreateRequestClosingDocument);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleSubmit, control, setValue, formState: { errors }, reset } = useForm<CreateRequestClosingValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleAddUser: SubmitHandler<CreateRequestClosingValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createRequestClosing({
        variables: {
          createRequestClosingInput: {
            title: data.title,
            description: data.description,
            requested_from: project_id
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil mengajukan penutupan proyek" }))
      reset()
      refetchProjectClosing()
      handleCloseModal()
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal mengajukan penutupan proyek, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<>
    <Button
      onClick={async () => {
        handleOpenModal()
      }}
      disabled={disabledCondition}
      variant="contained"
      color="error"
    >
      Pengajuan Penutupan Proyek
    </Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>PENGAJUAN PENUTUPAN PROYEK</b></Typography>
        <span className="alert bg-warning p-2 text-sm my-2">
          Konfirmasi dan pastikan proyek yang ingin diajukan penutupan telah sesuai dengan yang anda inginkan
        </span>
        {/* FIELD START */}
        <Controller
          name="title" control={control} rules={{ required: 'Judul pengajuan penutupan tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Judul" size='small' variant="outlined"
            error={!!errors.title} helperText={errors.title ? errors.title.message : ''}
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
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Submit")}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default RequestProjectClosing
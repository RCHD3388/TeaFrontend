import React, { useState } from 'react';
import { GetProfileDocument, ResetPasswordDocument } from '../../../graphql/user.generated';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Card, CardContent, CircularProgress, Container, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate, useParams } from 'react-router-dom';
import { modalStyle, theme } from '../../../theme';
import { formatDateToLong } from '../../../utils/service/FormatService';
import StickyHeadTable from '../../../components/global_features/StickyHeadTable';
import { GridColDef } from '@mui/x-data-grid';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';

interface inputValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfilePage: React.FC<{}> = () => {
  const { userId } = useParams()
  const { data, loading, error } = useQuery(GetProfileDocument, { variables: { requiresAuth: true }, });
  const navigate = useNavigate()
  const [resetPassword] = useMutation(ResetPasswordDocument);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()

  const { handleSubmit, control, formState: { errors }, reset } = useForm<inputValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (data: inputValues) => {
    if (data.newPassword !== data.confirmPassword) {
      dispatch(openSnackbar({ severity: "error", message: "Password baru dan konfirmasi password harus sama" }))
      return;
    }

    setIsSubmitting(true)
    try {
      await resetPassword({ variables: { currentPassword: data.currentPassword, newPassword: data.newPassword, requiresAuth: true } })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil reset password" }))
    } catch (error) {
      let msg = GetBadReqMsg("Gagal memperbarui password, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getData = () => {
    return data?.getProfile
  }

  const columns: GridColDef[] = [
    { field: "index", headerName: "No", type: "number", width: 75 },
    { field: "name", headerName: "Name", minWidth: 200, type: "string", flex: 2 },
    { field: "description", headerName: "Description", minWidth: 200, type: "string", flex: 2 },
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
          <div className="text-4xl font-bold mb-2">Profile Anda</div>
        </Box>
        {!loading && data && <>
          <Container sx={{ mt: 0 }}>
            <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
              <Button variant="contained" color="error" onClick={() => { handleOpenModal() }} >Perbarui / Reset Password</Button>
            </Box>
            <Card sx={{ my: 3 }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Data Personal Anda</Typography>
                <Box px={4}>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Nama Anda:</b> {getData().employee.person.name}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Email Anda:</b> {getData().employee.person.email}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Nomer Telepon Anda:</b> {getData().employee.person.phone_number}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Alamat Anda:</b> {getData().employee.person.address}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Peran Anda:</b> {getData().employee.role.name}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ mb: 1 }} spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Tanggal Rekrut Anda:</b> {formatDateToLong(getData().employee.hire_date)}</Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>DAFTAR SKILL ANDA</Typography>
                  <StickyHeadTable
                    columns={columns}
                    rows={getData().employee.skill ?? []}
                    withtoolbar={false}
                  />
                </Box>
              </CardContent>
            </Card>
          </Container>
        </>}

        {/* UPDATE PASSWORD MODAL */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2"><b>RESET PASSWORD</b></Typography>
            <span className="alert bg-warning p-2 text-sm my-2">
              Konfirmasi dan pastikan anda ingin mengubah password anda dengan password baru untuk penggunaan akun anda
            </span>
            {/* FIELD START */}
            <Controller
              name="currentPassword" control={control} rules={{ required: 'password saat ini tidak boleh kosong' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Password saat ini" size='small' variant="outlined"
                error={!!errors.currentPassword} helperText={errors.currentPassword ? errors.currentPassword.message : ''}
              />)}
            />
            <Controller
              name="newPassword" control={control} rules={{
                required: 'password baru tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'password harus memiliki minimal 8 karakter'
                }
              }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Password Baru" size='small' variant="outlined"
                error={!!errors.newPassword} helperText={errors.newPassword ? errors.newPassword.message : ''}
              />)}
            />
            <Controller
              name="confirmPassword" control={control} rules={{
                required: 'password konfirmasi tidak boleh kosong',
                minLength: {
                  value: 8,
                  message: 'password harus memiliki minimal 8 karakter'
                }
              }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Konfirmasi Password" size='small' variant="outlined"
                error={!!errors.confirmPassword} helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
                onClick={handleSubmit(handleResetPassword)}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Reset Password")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfilePage;


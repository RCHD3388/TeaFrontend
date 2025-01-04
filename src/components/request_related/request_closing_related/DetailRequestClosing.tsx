import React, { useEffect, useState } from 'react'
import { FindOneRequestCostDocument, UpdateRequestCostDetailDocument, UpdateRequestCostDocument } from '../../../graphql/request_cost.generated';
import { useMutation, useQuery } from '@apollo/client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { CustomGraphQLError } from '../../../types/apollo_client.types';
import { Controller, get, useForm } from 'react-hook-form';
import { formatCurrency, formatDateToLong, RequestStatusColors } from '../../../utils/service/FormatService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { selectUser } from '../../../app/reducers/userSlice';
import { EmployeeRoleType, RequestStatusType } from '../../../types/staticData.types';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';
import { FindOneRequestClosingDocument, UpdateRequestClosingDocument } from '../../../graphql/project_closing.generated';

interface DetailRequestClosingProps { }

const DetailRequestClosing: React.FC<DetailRequestClosingProps> = ({ }) => {
  const { requestClosingId } = useParams();
  const user = useSelector((state: RootState) => selectUser(state))
  const { loading, data, error, refetch } = useQuery(FindOneRequestClosingDocument, {
    variables: { id: requestClosingId! },
  });
  const [updateRequestClosing] = useMutation(UpdateRequestClosingDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    return data?.findOneRequestClosing;
  }
  const getDisabledCondition = () => {
    return isSubmitting || getData().status != RequestStatusType.MENUNGGU
  }

  const handleAction = async (value: RequestStatusType) => {
    if (value == RequestStatusType.DIBATALKAN || value == RequestStatusType.DISETUJUI || value == RequestStatusType.DITOLAK) {
      setIsSubmitting(true)
      try {
        await updateRequestClosing({
          variables: {
            updateRequestStatusInput: {
              status: value,
            },
            id: requestClosingId,
            requiresAuth: true
          },
        })
        refetch()
        dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui data" }))
      } catch (err: any) {
        let msg = GetBadReqMsg("Gagal memperbarui data, silakan coba lagi nanti", err)
        dispatch(openSnackbar({ severity: "error", message: String(msg) }))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const dispatch = useDispatch()

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
          <div className="text-4xl font-bold mb-2">Detail Permintaan Penutupan Proyek</div>
        </Box>
        {(!loading && !error) &&
          <Container sx={{ mt: 3 }}>
            <Card sx={{ my: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Permintaan</Typography>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Diajukan oleh:</b> {getData()?.requested_by?.person.name} ( {getData()?.requested_by?.person.email} )</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Dibuat pada:</b> {getData() ? formatDateToLong(getData()?.requested_at) : ''}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Deskripsi:</b> {getData()?.description || "-"}</Typography>
                  </Stack>

                  <Typography variant="h6" sx={{ my: 2 }}><b>Detail Proyek</b></Typography>
                  <Box sx={{ pl: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body1" sx={{ mr: 2 }}><b>Nama Proyek:</b> {getData()?.requested_from.name}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body1" sx={{ mr: 2 }}><b>Lokasi Proyek:</b> {getData()?.requested_from.location}</Typography>
                    </Stack>
                    <Button
                      size='small'
                      variant="contained"
                      color="secondary" sx={{ mt: 1 }}
                      onClick={() => { navigate(`/appuser/project/${getData()?.requested_from._id}`) }}
                    >
                      Lihat Detail Proyek
                    </Button>
                  </Box>
                </Box>
              </CardContent>

              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Persetujuan</Typography>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      <b>Status Permintaan:</b>
                      <span className={` ms-1 badge ${RequestStatusColors[getData().status as keyof typeof RequestStatusColors]}`}> {getData().status}</span>
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Ditangani oleh:</b> {getData()?.handled_by?.person.name || "-"} ( {getData()?.handled_by?.person.email || "-  "} )</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Ditangani pada:</b> {getData()?.handled_date ? formatDateToLong(getData()?.handled_date) : '-'}</Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
            <div className='flex justify-end'>
              {user._id === getData().requested_by._id && <>
                <Button variant="contained" color="error" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                  onClick={() => { handleAction(RequestStatusType.DIBATALKAN) }}
                >
                  Dibatalkan
                </Button>
              </>}
              {(user.role == EmployeeRoleType.ADMIN || user.role == EmployeeRoleType.OWNER) && <>
                <div>
                  <Button variant="contained" color="error" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                    onClick={() => { handleAction(RequestStatusType.DITOLAK) }}
                  >
                    Menolak
                  </Button>
                  <Button variant="contained" color="success" disabled={getDisabledCondition()} sx={{ mr: 0 }}
                    onClick={() => { handleAction(RequestStatusType.DISETUJUI) }}
                  >
                    Menyetujui
                  </Button>
                </div>
              </>}
            </div>
          </Container>
        }
      </div>
    </div>
  )
}

export default DetailRequestClosing

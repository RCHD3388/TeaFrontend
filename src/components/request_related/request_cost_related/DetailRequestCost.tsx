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
import { Controller, useForm } from 'react-hook-form';
import { formatCurrency, formatDateToLong, RequestStatusColors } from '../../../utils/service/FormatService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { selectUser } from '../../../app/reducers/userSlice';
import { EmployeeRoleType, RequestStatusType } from '../../../types/staticData.types';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';

interface DetailRequestCostProps { }

interface updateData {
  title: string;
  description: string;
  price: number;
}

const DetailRequestCost: React.FC<DetailRequestCostProps> = ({ }) => {
  const { requestCostId } = useParams();
  const user = useSelector((state: RootState) => selectUser(state))
  const { loading, data, error, refetch } = useQuery(FindOneRequestCostDocument, {
    variables: { id: requestCostId! },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateRequestCostDetail] = useMutation(UpdateRequestCostDetailDocument)
  const [updateRequestCost] = useMutation(UpdateRequestCostDocument)
  const navigate = useNavigate();

  const getData = () => {
    return data?.findOneRequestCost;
  }

  const { handleSubmit, control, formState: { errors }, reset } = useForm<updateData>({
    defaultValues: {
      title: '',
      description: '',
      price: 0
    }
  });
  const dispatch = useDispatch()
  const handleUpdateDetail = async (data: updateData) => {
    setIsSubmitting(true)
    try {
      await updateRequestCostDetail({
        variables: {
          id: requestCostId,
          updateRequestInput: {
            title: data.title,
            description: data.description,
            price: Number(data.price)
          }, requiresAuth: true
        }
      })
      refetch()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui data" }))
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal memperbarui data, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStatus = async (status: RequestStatusType) => {
    setIsSubmitting(true)
    try {
      await updateRequestCost({
        variables: {
          updateRequestCostStatusInput: {
            status,
          },
          id: requestCostId,
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

  const getDisabledCondition = () => {
    return getData().status != RequestStatusType.MENUNGGU || isSubmitting
  }

  useEffect(() => {
    if (error) {
      let graphqlErrorFetch = error?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
      if (!loading && data) {
        reset({
          title: getData()?.title,
          description: getData()?.description,
          price: getData()?.price
        })
      }
    }
  }, [loading, data, error])


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
          <div className="text-4xl font-bold mb-2">Detail Permintaan Pengeluaran</div>
        </Box>
        {(!loading && !error) &&
          <Container sx={{ mt: 3 }}>
            <Card sx={{ my: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Permintaan</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Diajukan oleh:</b> {getData()?.requested_by?.person.name} ( {getData()?.requested_by?.person.email} )</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Diajukan untuk project:</b> {getData()?.requested_from.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Dibuat pada:</b> {getData() ? formatDateToLong(getData()?.createdAt) : ''}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Terakhir diperbarui pada:</b> {getData() ? formatDateToLong(getData()?.updatedAt) : ''}</Typography>
                </Stack>
              </CardContent>

              {getData().status != RequestStatusType.MENUNGGU && <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}><b>Detail Permintaan</b></Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Permintaan:</b> {getData()?.title}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>deskripsi:</b> {getData()?.description}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Harga Pengeluaran:</b> {formatCurrency(getData()?.price)}</Typography>
                </Stack>
              </CardContent>}

              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Persetujuan</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Ditangani oleh:</b> {getData()?.handled_by?.person.name || "-"} ( {getData()?.handled_by?.person.email || "-  "} )</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}><b>Ditangani pada:</b> {getData()?.handled_date ? formatDateToLong(getData()?.handled_date) : '-'}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    <b>Status Permintaan:</b>
                    <span className={` ms-1 badge ${RequestStatusColors[getData().status as keyof typeof RequestStatusColors]}`}> {getData().status}</span>
                  </Typography>
                </Stack>
              </CardContent>

            </Card>
            {getData().status == RequestStatusType.MENUNGGU && <>
              <Controller
                name="title" control={control} rules={{ required: 'Judul tidak boleh kosong' }}
                render={({ field }) => (<TextField disabled={getData().handled_date}
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 2 }} label="Judul" size='small' variant="outlined"
                  error={!!errors.title} helperText={errors.title ? errors.title.message : ''}
                />)}
              />
              <Controller
                name="description" control={control} rules={{}}
                render={({ field }) => (<TextField disabled={getData().handled_date}
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 2 }} label="Deskripsi" size='small' variant="outlined"
                  error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
                />)}
              />
              <Controller
                name="price" control={control} rules={{
                  required: 'Harga tidak boleh kosong',
                  validate: (value) => value >= 0 || 'Harga harus minimal Rp. 0'
                }}
                render={({ field }) => (<TextField disabled={getData().handled_date}
                  type="number"
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 2 }} label="Gaji" size='small' variant="outlined"
                  error={!!errors.price} helperText={errors.price ? errors.price.message : ''}
                  InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
                />)}
              />
            </>}
            <div className='flex justify-end'>
              {user._id === getData().requested_by._id && <>
                <Button variant="contained" color="error" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                  onClick={() => { handleUpdateStatus(RequestStatusType.DIBATALKAN) }}
                >
                  Dibatalkan
                </Button>
                <Button variant="contained" color="secondary" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                  onClick={handleSubmit(handleUpdateDetail)}
                >
                  Perbarui
                </Button>
              </>}
              {user.role != EmployeeRoleType.MANDOR && <>
                <div>
                  <Button variant="contained" color="error" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                    onClick={() => { handleUpdateStatus(RequestStatusType.DITOLAK) }}
                  >
                    Menolak
                  </Button>
                  <Button variant="contained" color="success" disabled={getDisabledCondition()} sx={{ mr: 0 }}
                    onClick={() => { handleUpdateStatus(RequestStatusType.DISETUJUI) }}
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

export default DetailRequestCost

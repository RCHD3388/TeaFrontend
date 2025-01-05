import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Card, CardContent, Chip, CircularProgress, Container, Divider, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { useMutation, useQuery } from '@apollo/client';
import { CreateRequestItemTransactionDocument } from '../../../graphql/request_item.generated';
import { GetAllWarehousesByUserDocument, GetAllWarehousesDocument } from '../../../graphql/inventory.generated';
import { Controller, useForm } from 'react-hook-form';
import { itemDetail, RequestItemTypeValues } from '../../../types/staticData.types';
import RequestItemInput from '../RequestItemInput';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';

interface CreateRequestItemTransactionValues {
  title: String
  type: String
  description: String
  requested_from: String
  requested_to: String
}

interface CreateRequestItemTransactionProps { }

const CreateRequestItemTransaction: React.FC<CreateRequestItemTransactionProps> = ({ }) => {
  const navigate = useNavigate()
  let { data: allWHData, loading: allWHLoading, error: allWHError, refetch: allWHRefetch } = useQuery(GetAllWarehousesDocument, { variables: { 
    filter: {status: true},
    requiresAuth: true 
  } })
  let { data: userWHData, loading: userWHLoading, error: userWHError, refetch: userWHRefetch } = useQuery(GetAllWarehousesByUserDocument, { variables: { requiresAuth: true } })
  const [createRequestItemTransaction] = useMutation(CreateRequestItemTransactionDocument)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [requestItemDetail, setRequestItemDetail] = useState<itemDetail[]>([])
  const dispatch = useDispatch();

  const { handleSubmit, control, watch, setValue, formState: { errors }, reset } = useForm<CreateRequestItemTransactionValues>({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      requested_from: "",
      requested_to: "",
    },
  });

  const handleSubmitRequest = async (data: CreateRequestItemTransactionValues) => {
    setIsEmpty(false);
    let requested_from = (data.requested_from as any).value;
    let requested_to = (data.requested_to as any).value;

    if (requestItemDetail.length == 0) {
      setIsEmpty(true);
      return;
    }

    setIsSubmitting(true)
    try {
      await createRequestItemTransaction({
        variables: {
          createRequestItemInput: {
            title: data.title,
            description: data.description,
            type: data.type,
            requested_from: requested_from,
            requested_to: requested_to,
            request_item_detail: requestItemDetail.map((item) => { return { item: item.item, item_type: item.item_type, quantity: Number(item.quantity) } })
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil mengajukan permintaan perpindahan barang" }))
      navigate(-1)
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal mengajukan permintaan, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // refetch new data
  useEffect(() => { if (allWHData) { allWHRefetch(); } }, [allWHData, allWHRefetch]);
  useEffect(() => { if (userWHData) { userWHRefetch(); } }, [userWHData, userWHRefetch]);

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
          <div className="text-4xl font-bold mb-2">Pengajuan Perpindahan Barang</div>
        </Box>
      </div>

      <Container sx={{ mt: 2 }}>
        <Controller
          name="title" control={control} rules={{ required: 'Judul tidak boleh kosong' }}
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
        <Controller
          name="type" control={control} rules={{ required: 'Tipe perpindahan tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal
              options={RequestItemTypeValues}
              onChange={(_, data) => onChange(data)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params} label="Tipe Perpindahan" sx={{ width: "100%", mb: 1 }}
                  error={!!error} helperText={error ? error.message : null}
                  color="secondary" size="small"
                />
              )}
            />
          )}
        />
        <Controller
          name="requested_from" control={control} rules={{ required: 'Gudang asal tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal
              options={userWHLoading || !userWHData ? [] : userWHData.getAllWarehousesByUser.map((wh: any) => { return { 
                label: `${wh.name} ( ${wh.address} )`, 
                value: wh._id 
              } })}
              onChange={(_, data) => onChange(data)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params} label="Gudang Asal" sx={{ width: "100%", mb: 1 }}
                  error={!!error} helperText={error ? error.message : null}
                  color="secondary" size="small"
                />
              )}
            />
          )}
        />
        <Controller
          name="requested_to" control={control} rules={{ required: 'Gudang tujuan tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal

              options={allWHLoading || !allWHData ? [] : allWHData.getAllWarehouses.filter((wh: any) => {
                let requested_from_data: any = watch("requested_from") || {};
                return wh._id !== (requested_from_data?.value || "")
              }).map((wh: any) => { return { label: `${wh.name} ( ${wh.address} }`, value: wh._id } })}

              onChange={(_, data) => onChange(data)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params} label="Gudang Tujuan" sx={{ width: "100%", mb: 1 }}
                  error={!!error} helperText={error ? error.message : null}
                  color="secondary" size="small"
                />
              )}
            />
          )}
        />

        {/* ADD MATERIAL AND TOOLS */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5"><b>Barang yang diinginkan</b></Typography>
          <Typography variant="body2"><b>Pilih Material atau Sku Barang yang anda butuhkan</b></Typography>
          <RequestItemInput itemDetail={requestItemDetail} setItemDetail={setRequestItemDetail} isEmpty={isEmpty} />
        </Box>

        {/* BUTTON SUBMIT */}
        <div className='flex justify-end'>
          <Button
            onClick={handleSubmit(handleSubmitRequest)}
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Submit")}
          </Button>
        </div>

      </Container>
    </div>
  )
}

export default CreateRequestItemTransaction

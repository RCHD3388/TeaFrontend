import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { GetBadReqMsg } from "../../../utils/helpers/ErrorMessageHelper";
import { modalStyle } from "../../../theme";
import { ClosingItemRequestDocument, ProcessingItemRequestDocument } from "../../../graphql/request_item.generated";

interface CloseValues {
  recipient_name: string
  recipient_phone: string
  recipient_description: string
}

interface ClosingItemModalProps {
  refetchRequest: (variables?: any) => Promise<ApolloQueryResult<any>>;
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  requestItemId: String
}

const ClosingItemModal: React.FC<ClosingItemModalProps> = ({
  refetchRequest,
  openModal,
  handleOpenModal,
  handleCloseModal,
  requestItemId
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [closingItemRequest] = useMutation(ClosingItemRequestDocument);
  const { handleSubmit, control, formState: { errors }, reset } = useForm<CloseValues>({
    defaultValues: {
      recipient_name: "",
      recipient_phone: "",
      recipient_description: "",
    },
  });

  const handleSubmitData: SubmitHandler<CloseValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await closingItemRequest({
        variables: {
          id: requestItemId,
          createFinishingDetailInput: {
            recipient_name: data.recipient_name,
            recipient_phone: data.recipient_phone,
            recipient_description: data.recipient_description,
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil konfirmasi penyelesaian" }))
      refetchRequest()
      handleCloseModal()
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal konfirmasi penyelesaian, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<>{requestItemId &&
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 600;
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>INFORMASI PENGIRIMAN</b></Typography>
        {/* FIELD START */}
        <Controller
          name="recipient_name" control={control} rules={{ required: 'Nama Penerima tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Nama Penerima" size='small' variant="outlined"
            error={!!errors.recipient_name} helperText={errors.recipient_name ? errors.recipient_name.message : ''}
          />)}
        />
        <Controller
          name="recipient_phone" control={control} rules={{ required: 'No Telp. Penerima tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="No Telp. Penerima" size='small' variant="outlined"
            error={!!errors.recipient_phone} helperText={errors.recipient_phone ? errors.recipient_phone.message : ''}
          />)}
        />
        <Controller
          name="recipient_description" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Deskripsi Tambahan" size='small' variant="outlined"
            error={!!errors.recipient_description} helperText={errors.recipient_description ? errors.recipient_description.message : ''}
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
            onClick={handleSubmit(handleSubmitData)}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Konfirmasi")}
          </Button>
        </Box>
      </Box>
    </Modal>
  }</>)
}

export default ClosingItemModal;

import { ApolloQueryResult, useMutation } from "@apollo/client";
import { CreateSupplierDocument, GetAllSuppliersQuery, GetAllSuppliersQueryVariables } from "../../graphql/supplier.generated";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateWarehouseDocument, GetAllWarehousesQuery, GetAllWarehousesQueryVariables } from "../../graphql/inventory.generated";

interface CreateWarehouseValues {
  name: string
  description: string,
  address: string
}

interface AddWarehouseProps {
  refetchWarehouse: (variables?: GetAllWarehousesQueryVariables) => Promise<ApolloQueryResult<GetAllWarehousesQuery>>;
}

const AddWarehouse: React.FC<AddWarehouseProps> = ({ refetchWarehouse }) => {
  const [createWarehouse] = useMutation(CreateWarehouseDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateWarehouseValues>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
    },
  });

  const handleAddWarehouse: SubmitHandler<CreateWarehouseValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createWarehouse({
        variables: {
          createWarehouseInput: {
            name: data.name,
            description: data.description,
            address: data.address,
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah warehouse perusahaan" }))
      reset()
      refetchWarehouse()
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
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah warehouse, silakan coba lagi" }))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
        onClick={async () => {
          handleOpenModal()
        }}
        endIcon={<AddIcon />}
      >Tambah Warehouse</Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH SUPPLIER BARU</b></Typography>
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
            name="description" control={control}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Deskripsi" size='small' variant="outlined"
              error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
            />)}
          />
          <Controller
            name="address" control={control} rules={{ required: 'Alamat tidak boleh kosong', }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1 }} label="Alamat" size='small' variant="outlined"
              error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
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
              onClick={handleSubmit(handleAddWarehouse)}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddWarehouse;
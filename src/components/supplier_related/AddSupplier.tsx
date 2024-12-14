import { ApolloQueryResult, useMutation } from "@apollo/client";
import { CreateSupplierDocument, GetAllSuppliersQuery, GetAllSuppliersQueryVariables } from "../../graphql/supplier.generated";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";

interface CreateSupplierValues {
  company_name: string
  name: string
  email: string
  phone_number: string
  address: string
  status: string
}

interface AddSupplierProps {
  refetchSupplier: (variables?: GetAllSuppliersQueryVariables) => Promise<ApolloQueryResult<GetAllSuppliersQuery>>;
}

const AddSupplier: React.FC<AddSupplierProps> = ({ refetchSupplier }) => {
  const [createSupplier] = useMutation(CreateSupplierDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateSupplierValues>({
    defaultValues: {
      company_name: "",
      name: "",
      email: "",
      phone_number: "",
      address: "",
      status: "",
    },
  });

  const handleAddSupplier: SubmitHandler<CreateSupplierValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createSupplier({
        variables: {
          input: {
            name: data.company_name,
            person: {
              address: data.address,
              email: data.email,
              name: data.name,
              phone_number: data.phone_number,
            },
            status: data.status
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Supplier" }))
      reset()
      refetchSupplier()
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
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Supplier, silakan coba lagi" }))
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
    >Tambah Supplier</Button>

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
          name="company_name" control={control} rules={{ required: 'Nama perusahaan tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Company name" size='small' variant="outlined"
            error={!!errors.company_name} helperText={errors.company_name ? errors.company_name.message : ''}
          />)}
        />

        <Controller
          name="name" control={control} rules={{ required: 'Name tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
            error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
          />)}
        />
        <Controller
          name="email" control={control} rules={{
            required: 'Email tidak boleh kosong',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email tidak valid'
            }
          }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Email" size='small' variant="outlined"
            error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
          />)}
        />
        <Controller
          name="phone_number" control={control} rules={{
            required: 'Nomer telepon tidak boleh kosong',
            validate: (value) =>
              /^(\+62|62|0)[2-9]{1}[0-9]{7,12}$/.test(value) || 'Format nomer telepon salah',
          }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Phone" size='small' variant="outlined"
            error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
          />)}
        />
        <Controller
          name="address" control={control} rules={{ required: 'Alamat tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Address" size='small' variant="outlined"
            error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
          />)}
        />
        <Controller
          name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Status" size="small" variant="outlined"
              error={!!errors.status}
              helperText={errors.status ? errors.status.message : ''}
            >
              <MenuItem value={"Active"}><div className="badge whitespace-nowrap badge-success p-3 text-white gap-2">Active</div></MenuItem>
              <MenuItem value={"Inactive"}><div className="badge whitespace-nowrap badge-warning p-3 gap-2">Inactive</div></MenuItem>
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
            onClick={handleSubmit(handleAddSupplier)}
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

export default AddSupplier;
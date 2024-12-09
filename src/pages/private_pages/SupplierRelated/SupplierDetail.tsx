import { useMutation, useQuery } from "@apollo/client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from "../../../theme";
import { Box, Button, CircularProgress, Container, IconButton, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { GetSupplierByIdDocument, UpdateSupplierDocument } from "../../../graphql/supplier.generated";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";

interface updateSupplierValues {
  company_name: string
  name: string
  email: string
  phone_number: string
  address: string
  status: string
}

const SupplierDetail: React.FC = () => {
  const { supplierId } = useParams()
  const [updateSupplier] = useMutation(UpdateSupplierDocument)
  const { data: supplierData, loading, refetch, error: supplierDataError } = useQuery(GetSupplierByIdDocument, { variables: { id: supplierId, requiresAuth: true } })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control, formState: { errors }, reset } = useForm<updateSupplierValues>({
    defaultValues: {
      company_name: '',
      name: '',
      email: '',
      phone_number: '',
      address: '',
      status: '',
    }
  });

  const handleEditSupplier = (data: updateSupplierValues) => {
    if (supplierData?.getSupplierById) {
      setIsSubmitting(true)
      updateSupplier({
        variables: {
          id: supplierData.getSupplierById._id,
          updateSupplierInput: {
            company_name: data.company_name,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            address: data.address,
            status: data.status,
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data supplier" }))
        refetch()
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
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data supplier, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  useEffect(() => {
    if (supplierDataError) {
      let graphqlErrorFetch = supplierDataError?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
      if (!loading && supplierData) {
        reset({
          company_name: supplierData.getSupplierById.name,
          name: supplierData.getSupplierById.person.name,
          email: supplierData.getSupplierById.person.email,
          phone_number: supplierData.getSupplierById.person.phone_number,
          address: supplierData.getSupplierById.person.address,
          status: supplierData.getSupplierById.status,
        });
      }
    }
  }, [loading, supplierData, supplierDataError])

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
          <div className="text-4xl font-bold mb-2">Detail Supplier</div>
        </Box>

        <Container sx={{ paddingTop: 4 }}>
          {!loading && <div>
            {/* FIELD START */}
            <Controller
              name="company_name" control={control} rules={{ required: 'Company name is required' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 3 }} label="Company Name" size='small' variant="outlined"
                error={!!errors.company_name} helperText={errors.company_name ? errors.company_name.message : ''}
              />)}
            />
            <Controller
              name="name" control={control} rules={{ required: 'Name is required' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 3 }} label="Name" size='small' variant="outlined"
                error={!!errors.name} helperText={errors.name ? errors.name.message : ''}
              />)}
            />
            <Controller
              name="email" control={control} rules={{ required: 'Email is required' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 3 }} label="Email" size='small' variant="outlined"
                error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
              />)}
            />
            <Controller
              name="phone_number" control={control} rules={{
                required: 'Phone is required',
                validate: (value) =>
                  /^(\+62|62|0)[2-9]{1}[0-9]{7,12}$/.test(value) || 'Invalid phone number format',
              }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 3 }} label="Phone" size='small' variant="outlined"
                error={!!errors.phone_number} helperText={errors.phone_number ? errors.phone_number.message : ''}
              />)}
            />
            <Controller
              name="address" control={control} rules={{ required: 'Address is required' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 3 }} label="Address" size='small' variant="outlined"
                error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
              />)}
            />
            <Controller
              name="status" control={control} rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 3 }} label="Status" size="small" variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                >
                  <MenuItem value={"Active"}><div className="badge badge-success p-3 text-white gap-2">Active</div></MenuItem>
                  <MenuItem value={"Inactive"}><div className="badge badge-warning p-3 gap-2">Inactive</div></MenuItem>
                </TextField>
              )}
            />
            {/* FIELD END */}

            {/* BUTTON SUBMIT */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit(handleEditSupplier)}
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
export default SupplierDetail;
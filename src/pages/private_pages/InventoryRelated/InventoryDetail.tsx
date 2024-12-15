import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GetWarehouseByIdDocument, UpdateWarehouseDocument } from "../../../graphql/inventory.generated";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Container, IconButton, MenuItem, TextField } from "@mui/material";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import { CustomGraphQLError } from "../../../types/apollo_client.types";
import { WarehouseType } from "../../../types/staticData.types";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import DetailInventoryItem from "../../../components/inventory_related/DetailInventoryItem";

interface UpdateWarehouseValues {
  name: string
  description: string
  address: string
  status: string
}

export default function InventoryDetail() {
  const { warehouseId } = useParams();
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const [updateWarehouse] = useMutation(UpdateWarehouseDocument)
  const { data: dataInventory, loading: loadingInventory, error: errorInventory, refetch: refetchInventory } = useQuery(GetWarehouseByIdDocument, {
    variables: {
      id: warehouseId,
      requiresAuth: true
    }
  })

  const { handleSubmit, control, formState: { errors }, reset } = useForm<UpdateWarehouseValues>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      status: "",
    }
  });

  const handleEditInventory = (data: UpdateWarehouseValues) => {
    if (dataInventory?.getWarehouseById) {
      setIsSubmitting(true)
      updateWarehouse({
        variables: {
          id: dataInventory.getWarehouseById._id,
          updateWarehouseInput: {
            name: data.name,
            description: data.description,
            address: data.address,
            status: data.status
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data warehouse" }))
        refetchInventory()
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
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data warehouse, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  useEffect(() => {
    if (errorInventory) {
      let graphqlErrorFetch = errorInventory?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
      if (!loadingInventory && dataInventory) {
        reset({
          name: dataInventory.getWarehouseById.name,
          description: dataInventory.getWarehouseById.description,
          address: dataInventory.getWarehouseById.address,
          status: dataInventory.getWarehouseById.status,
        });
      }
    }
  }, [loadingInventory, dataInventory, errorInventory])

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <Box display={"flex"}>
          <IconButton
            style={{ backgroundColor: theme.palette.secondary.main, height: 40, width: 40, borderRadius: 8, color: 'white' }}
            sx={{ mr: 1 }}
            onClick={() => { navigate(-1) }}
          >
            <ReplyAllIcon fontSize="medium"></ReplyAllIcon>
          </IconButton>
          <div className="mb-2 flex items-center flex-wrap">
            <span className="text-4xl font-bold mr-2">Detail Warehouse</span>
            {!loadingInventory && !errorInventory && <span className={`badge whitespace-nowrap badge-lg ${dataInventory.getWarehouseById.type == WarehouseType.INVENTORY ? "badge-warning" : "badge-info text-white"}`}>
              {dataInventory.getWarehouseById.type == WarehouseType.INVENTORY ? "Inventory Perusahaan" : "Inventory Proyek"}
            </span>}
          </div>
        </Box>

        <Container sx={{ paddingY: 3 }}>
          {!loadingInventory && !errorInventory && <div>
            {/* FIELD START */}
            <Controller
              name="name" control={control} rules={{ required: 'Nama tidak boleh kosong' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Nama" size='small' variant="outlined"
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
              name="address" control={control} rules={{ required: 'Alamat tidak boleh kosong' }}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Alamat" size='small' variant="outlined"
                error={!!errors.address} helperText={errors.address ? errors.address.message : ''}
              />)}
            />
            <Controller
              name="status" control={control} rules={{ required: 'Status tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  disabled={dataInventory.getWarehouseById.type == WarehouseType.PROJECT}
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

            {/* BUTTON SUBMIT */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit(handleEditInventory)}
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
              </Button>
            </div>
            {/* BUTTON SUBMIT END */}
          </div>}

          {/* HORIZONTAL LINE */}
          <hr className="bg-gray-400" style={{ padding: 1, marginTop: 20, marginBottom: 20 }} />

          {/* DETAIL INVENTORY */}
          {warehouseId ? <DetailInventoryItem warehouseId={warehouseId} /> :
            <div className="bg-error text-white p-5 flex justify-center items-center rounded-lg">
              Tidak dapat mendapatkan data item pada warehouse
            </div>
          }
        </Container>
      </div>
    </div>
  );
}
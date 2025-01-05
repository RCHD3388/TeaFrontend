import { useMutation, useQuery } from "@apollo/client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box, Button, CircularProgress, Container, IconButton, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { GetAllMerksDocument, GetSkuByIdDocument, UpdateSkuDocument } from "../../../../graphql/inventory.generated";
import { CustomGraphQLError } from "../../../../types/apollo_client.types";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { theme } from "../../../../theme";
import { CategoryType } from "../../../../types/staticData.types";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import DetailSkuTools from "./DetailSkuTools";

interface UpdateSkuValues {
  name: string
  description: string,
  merk: string,
  item_category: string,
  status: string
}

const DetailSku: React.FC = () => {
  const { skuId } = useParams()
  const [updateSku] = useMutation(UpdateSkuDocument)
  const { data: skuData, loading, refetch, error: skuDataError } = useQuery(GetSkuByIdDocument, { variables: { id: skuId, requiresAuth: true } })
  const { data: merkData, loading: merkLoading, error: merkError, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.ITEM] },
      requiresAuth: true
    }
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control, formState: { errors }, reset } = useForm<UpdateSkuValues>({
    defaultValues: {
      name: "",
      description: "",
      merk: "",
      item_category: "",
      status: ""
    }
  });

  const handleEditSku = (data: UpdateSkuValues) => {
    if (skuData?.getSkuById) {
      setIsSubmitting(true)
      
      updateSku({
        variables: {
          id: skuData.getSkuById._id,
          updateSkuInput: {
            name: data.name,
            description: data.description,
            merk: data.merk,
            item_category: data.item_category,
            status: data.status
          },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui data Sku" }))
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
          dispatch(openSnackbar({ severity: "error", message: "Gagal perbarui data Sku, Silakan coba lagi nanti" }))
        }
        setIsSubmitting(false)
      })
    }
  }

  useEffect(() => {
    if (skuDataError) {
      let graphqlErrorFetch = skuDataError?.graphQLErrors[0] as CustomGraphQLError || null;
      if (graphqlErrorFetch?.original?.statusCode == "404") {
        navigate("/appuser/notfound")
      }
    } else {
      if (!loading && skuData) {
        reset({
          name: skuData.getSkuById.name,
          description: skuData.getSkuById.description,
          merk: skuData.getSkuById.merk._id,
          item_category: skuData.getSkuById.item_category._id,
          status: skuData.getSkuById.status
        });
      }
    }
  }, [loading, skuData, skuDataError])

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
          <div className="text-4xl font-bold mb-2">Detail Sku Barang</div>
        </Box>

        <Container sx={{ paddingTop: 4 }}>
          {!loading && <div>
            {/* FIELD START */}
            <Controller
              name="name" control={control} rules={{ required: 'Nama tidak boleh kosong' }}
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
              name="merk" control={control} rules={{ required: 'Merk tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1 }} label="Merk Barang" size="small" variant="outlined"
                  error={!!errors.merk}
                  helperText={errors.merk ? errors.merk.message : ''}
                >
                  {!merkLoading && !merkError && merkData.getAllMerks.map((value: any, index: number) => {
                    return <MenuItem key={index} value={value._id}>
                      <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                    </MenuItem>
                  })}
                </TextField>
              )}
            />

            <Controller
              name="item_category" control={control} rules={{ required: 'Kategori item tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1 }} label="Kategori Item" size="small" variant="outlined"
                  error={!!errors.item_category}
                  helperText={errors.item_category ? errors.item_category.message : ''}
                >
                  {!categoryLoading && !categoryError && categoryData.getCategories.map((value: any, index: number) => {
                    return <MenuItem key={index} value={value._id}>
                      <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                    </MenuItem>
                  })}
                </TextField>
              )}
            />
            <Controller
              name="status" control={control} rules={{
                required: 'Status tidak boleh kosong',
              }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1 }} label="Status" size="small" variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                >
                  <MenuItem value={"Active"}> <div className="badge badge-success text-white whitespace-nowrap p-3 gap-2">Active</div></MenuItem>
                  <MenuItem value={"Inactive"}> <div className="badge badge-warning whitespace-nowrap p-3 gap-2">Inactive</div></MenuItem>
                </TextField>
              )}
            />
            {/* FIELD END */}

            {/* BUTTON SUBMIT */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit(handleEditSku)}
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
              </Button>
            </div>
            {/* BUTTON SUBMIT END */}
          </div>}
              
          <DetailSkuTools id={skuId || ""} />
        </Container>
      </div>
    </div>
  )
}
export default DetailSku;
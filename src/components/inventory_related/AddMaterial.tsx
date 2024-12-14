import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateMaterialDocument, CreateSkuDocument, GetAllMaterialsQuery, GetAllMaterialsQueryVariables, GetAllMerksDocument, GetAllUnitMeasuresDocument } from "../../graphql/inventory.generated";
import { GetCategoriesDocument } from "../../graphql/category.generated";
import { CategoryType } from "../../types/staticData.types";

interface CreateMaterialValues {
  name: string
  description: string,
  merk: string,
  unit_measure: string,
  status: string,
  minimum_unit_measure: string,
  conversion: number,
  item_category: string
}

interface AddMaterialProps {
  refetchMaterials: (variables?: GetAllMaterialsQueryVariables) => Promise<ApolloQueryResult<GetAllMaterialsQuery>>;
}

const AddMaterial: React.FC<AddMaterialProps> = ({ refetchMaterials }) => {
  const [createMaterial] = useMutation(CreateMaterialDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const { data: merkData, loading: merkLoading, error: merkError, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const { data: unitMeasureData, loading: unitMeasureLoading, error: unitMeasureError, refetch: refetchUnitMeasure } = useQuery(GetAllUnitMeasuresDocument, { variables: { requiresAuth: true } })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.ITEM] },
      requiresAuth: true
    }
  })

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateMaterialValues>({
    defaultValues: {
      name: "",
      description: "",
      merk: "",
      unit_measure: "",
      status: "",
      minimum_unit_measure: "",
      conversion: 1,
      item_category: ""
    },
  });

  const handleAddMaterial: SubmitHandler<CreateMaterialValues> = async (data) => {
    console.log(data)
    setIsSubmitting(true)
    try {
      await createMaterial({
        variables: {
          createMaterialInput: {
            name: data.name,
            description: data.description,
            merk: data.merk,
            unit_measure: data.unit_measure,
            status: data.status,
            minimum_unit_measure: data.minimum_unit_measure,
            conversion: Number(data.conversion),
            item_category: data.item_category
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Material" }))
      reset()
      refetchMaterials()
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
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Material, silakan coba lagi" }))
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
    >Tambah Material</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH MATERIAL</b></Typography>
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

        <Controller
          name="unit_measure" control={control} rules={{
            required: 'Satuan Unit tidak boleh kosong',
          }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Satuan Unit" size="small" variant="outlined"
              error={!!errors.unit_measure}
              helperText={errors.unit_measure ? errors.unit_measure.message : ''}
            >
              {!unitMeasureLoading && !unitMeasureError && unitMeasureData.getAllUnitMeasures.map((value: any, index: number) => {
                return <MenuItem key={index} value={value._id}>
                  <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                </MenuItem>
              })}
            </TextField>
          )}
        />

        <Controller
          name="minimum_unit_measure" control={control} rules={{
            required: 'Satuan Unit tidak boleh kosong',
          }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Satuan Unit Minimum" size="small" variant="outlined"
              error={!!errors.minimum_unit_measure}
              helperText={errors.minimum_unit_measure ? errors.minimum_unit_measure.message : ''}
            >
              {!unitMeasureLoading && !unitMeasureError && unitMeasureData.getAllUnitMeasures.map((value: any, index: number) => {
                return <MenuItem key={index} value={value._id}>
                  <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                </MenuItem>
              })}
            </TextField>
          )}
        />

        <Controller
          name="conversion" control={control}
          rules={{
            required: 'Konversi tidak boleh kosong',
            min: { value: 1, message: "Nilai harus lebih besar atau sama dengan 1" },
          }}
          render={({ field }) => (<TextField
            {...field} color="secondary" type="number"
            sx={{ width: "100%", mb: 1 }} label="Konversi" size='small' variant="outlined"
            error={!!errors.conversion} helperText={errors.conversion ? errors.conversion.message : ''}
          />)}
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
            onClick={handleSubmit(handleAddMaterial)}
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

export default AddMaterial;
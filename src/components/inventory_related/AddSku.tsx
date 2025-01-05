import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateSkuDocument, GetAllMerksDocument, GetAllMerksQueryResult, GetAllSkusQueryVariables } from "../../graphql/inventory.generated";
import { GetAllSkillQuery } from "../../graphql/person.generated";
import { GetCategoriesDocument, GetCategoriesQueryResult } from "../../graphql/category.generated";
import { CategoryType } from "../../types/staticData.types";

interface CreateSkuValues {
  name: string
  description: string,
  merk: string,
  item_category: string
}

interface AddSkuProps {
  refetchSkus: (variables?: GetAllSkusQueryVariables) => Promise<ApolloQueryResult<GetAllSkillQuery>>;
}

const AddSku: React.FC<AddSkuProps> = ({ refetchSkus }) => {
  const [createSku] = useMutation(CreateSkuDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const { data: merkData, loading: merkLoading, error: merkError, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.ITEM] },
      requiresAuth: true
    }
  })

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateSkuValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleAddSku: SubmitHandler<CreateSkuValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createSku({
        variables: {
          createSkuInput: {
            name: data.name,
            description: data.description,
            merk: data.merk,
            item_category: data.item_category
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Sku" }))
      reset()
      refetchSkus()
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
        dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Sku, silakan coba lagi" }))
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
    >Tambah SKU Barang</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH SKU BARANG</b></Typography>
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
            onClick={handleSubmit(handleAddSku)}
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

export default AddSku;
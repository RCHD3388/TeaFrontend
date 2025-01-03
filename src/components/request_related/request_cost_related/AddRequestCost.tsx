import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, InputAdornment, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { modalStyle } from "../../../theme";
import { CreateRequestCostDocument, FindAllRequestCostsQuery, FindAllRequestCostsQueryVariables } from "../../../graphql/request_cost.generated";
import { GetBadReqMsg } from "../../../utils/helpers/ErrorMessageHelper";
import { CategoryType } from "../../../types/staticData.types";
import { GetCategoriesDocument } from "../../../graphql/category.generated";
import { FindAllProjectsDocument } from "../../../graphql/project.generated";
import { formatDateToLong } from "../../../utils/service/FormatService";

interface CreateRequestCostValues {
  title: String,
  description: String,
  price: number,
  project_cost_category: String,
  requested_from: String
}

interface AddRequestCostProps {
  refetchRequestCost: (variables?: FindAllRequestCostsQueryVariables) => Promise<ApolloQueryResult<FindAllRequestCostsQuery>>;
}

const AddRequestCost: React.FC<AddRequestCostProps> = ({ refetchRequestCost }) => {
  const [createRequestCost] = useMutation(CreateRequestCostDocument);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  let { data: dataProject, loading: loadingProject, error: errorProject, refetch: refetchProject } = useQuery(FindAllProjectsDocument, { variables: { requiresAuth: true } })
  const { data: catData, loading: catLoading, error: catError, refetch: catRefetch } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.PROJECT_COST] },
      requiresAuth: true
    }
  })

  useEffect(() => {if(catData) {catRefetch()}}, [catData, catRefetch])

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateRequestCostValues>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      project_cost_category: '',
      requested_from: '',
    },
  });

  const handleSubmitRequest: SubmitHandler<CreateRequestCostValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createRequestCost({
        variables: {
          createRequestCostInput: {
            title: data.title,
            description: data.description,
            price: Number(data.price),
            project_cost_category: data.project_cost_category,
            requested_from: data.requested_from
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil mengajukan permintaan pengeluraan" }))
      reset()
      refetchRequestCost()
      handleCloseModal()
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal mengajukan permintaan pengeluaran, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
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
    >Pengajuan Permintaan Pengeluaran</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>MENGAJUKAN PERMINTAAN PENGELUARAN</b></Typography>
        {/* FIELD START */}
        <Controller
          name="title" control={control} rules={{ required: 'Judul permintaan tidak boleh kosong' }}
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
          name="price" control={control} rules={{
            required: 'Harga tidak boleh kosong',
            validate: (value) => value > 0 || 'Harga harus lebih dari Rp 0'
          }}
          render={({ field }) => (<TextField
            type="number"
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Harga" size='small' variant="outlined"
            error={!!errors.price} helperText={errors.price ? errors.price.message : ''}
            InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
          />)}
        />
        <Controller
          name="project_cost_category" control={control} rules={{ required: 'Kategori tidak boleh kosong' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Kategori Pengeluaran" size="small" variant="outlined"
              error={!!errors.project_cost_category}
              helperText={errors.project_cost_category ? errors.project_cost_category.message : ''}
            >
              {!catLoading && !catError && catData.getCategories.map((data: any, index: number) => {
                return (
                  <MenuItem key={index} value={data._id}><div className="badge whitespace-nowrap p-3 gap-2">{data.name}</div></MenuItem>
                )
              })}
            </TextField>
          )}
        />
        <Controller
          name="requested_from" control={control} rules={{ required: 'Proyek asal tidak boleh kosong' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Proyek asal" size="small" variant="outlined"
              error={!!errors.requested_from}
              helperText={errors.requested_from ? errors.requested_from.message : ''}
            >
              {!loadingProject && !errorProject && dataProject.findAllProjects.map((data: any, index: number) => {
                return (
                  <MenuItem key={index} value={data._id}><div className="badge whitespace-nowrap p-3 gap-2">{data.name} ({formatDateToLong(data.createdAt.toString())})</div></MenuItem>
                )
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
            onClick={handleSubmit(handleSubmitRequest)}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Submit")}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddRequestCost;
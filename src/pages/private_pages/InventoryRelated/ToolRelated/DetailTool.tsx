import { useNavigate, useParams } from "react-router-dom";
import { GetAllSkusDocument, GetToolByIdDocument, GetToolTransactionsDocument, UpdateToolDocument } from "../../../../graphql/inventory.generated";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Container, IconButton, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { theme } from "../../../../theme";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CategoryType, TransactionCategory, TransactionCategoryId, TransactionCategoryTypeValues } from "../../../../types/staticData.types";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect } from "react";
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { useDispatch } from "react-redux";
import StickyHeadTable from "../../../../components/global_features/StickyHeadTable";
import { GridColDef } from "@mui/x-data-grid";
import { formatDateToLong } from "../../../../utils/service/FormatService";

const initialInputState = {
  description: "",
  warranty_number: "",
  status: "",
  price: 0,
  sku: ""
}

interface RowData {
  description: string,
  warranty_number: string,
  warranty_expired_date: Date,
  status: String,
  price: number,
  sku: String
}

interface transRowData {
  _id: string
  date: Date
  in: number
  out: number
  warehouse: {
    _id: string
    name: string
    address: string
  }
  transaction_code: string
  transaction_category: {
    _id: string
    id: string
    description: string
  }
  tool: {
    _id: string
    id: string
  }
}

const transColumns: GridColDef<transRowData>[] = [
  { field: "index", headerName: "No", type: "number", maxWidth: 50 },
  {
    field: "Tipe Transaksi", headerName: "Tipe Transaksi", minWidth: 200, type: "string", flex: 1,
    renderCell: (params) => <>{TransactionCategory.getDescription(params.row.transaction_category.id as TransactionCategoryId)} (
      {params.row.in == 0 ? "Keluar" : "Masuk"}
      )</>
  },
  {
    field: "warehouse", headerName: "Gudang", minWidth: 200, type: "string", flex: 2,
    renderCell: (params) => <>{params.row.warehouse.name} ( {params.row.warehouse.address} )</>
  },
  {
    field: "transaction_code", headerName: "Kode Transaksi", minWidth: 150, type: "string", flex: 2,
    renderCell: (params) => <>{params.row.transaction_code}</>
  },
  {
    field: "transaction_date", headerName: "Tanggal Transaksi", minWidth: 150, type: "string", flex: 2,
    renderCell: (params) => <>{formatDateToLong(params.row.date.toString())}</>
  },
]

const DetailTool = () => {
  let { data: skuData, loading: skuLoading, error: skuError, refetch: refetchSku } = useQuery(GetAllSkusDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.TOOL_STATUS] },
      requiresAuth: true
    }
  })

  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [updateTool] = useMutation(UpdateToolDocument)
  const { data, loading, error, refetch } = useQuery(
    GetToolByIdDocument,
    {
      variables: { id: toolId, requiresAuth: true },
    }
  );
  const { data: dataTransaction, loading: loadingTransaction, error: errorTransaction, refetch: refetchTransaction } = useQuery(
    GetToolTransactionsDocument,
    {
      variables: { tool_id: toolId, requiresAuth: true },
    }
  );

  const dispatch = useDispatch()

  const getData = () => {
    return data?.getToolById
  }
  const getTransaction = () => {
    return dataTransaction?.getToolTransactions
  }

  const handleUpdateButton: SubmitHandler<RowData> = async (data) => {
    try {
      await updateTool({
        variables: {
          id: toolId,
          updateToolInput: { ...data, price: Number(data.price) },
          requiresAuth: true
        }
      })

      refetch()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui data peralatan" }))
    } catch (error) {
      let msg = GetBadReqMsg("Gagal memperbarui data peralatan, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    }
  }

  const { handleSubmit, control, formState: { errors }, reset } = useForm<RowData>({
    defaultValues: initialInputState,
  });

  useEffect(() => {
    if (data && skuData && categoryData) {
      reset({
        description: getData().description,
        warranty_number: getData().warranty_number,
        warranty_expired_date: getData().warranty_expired_date,
        status: getData().status._id,
        price: getData().price,
        sku: getData().sku._id
      })
    }
  }, [data, skuData, categoryData])

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
          <div className="text-4xl font-bold mb-2">Detail Data Peralatan</div>
        </Box>
        {!loading && data &&
          <Container sx={{ mt: 2 }}>
            <Controller
              name="description" control={control}
              render={({ field }) => (<TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Description" size='small' variant="outlined"
                error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
              />)}
            />
            <div className="flex">
              <Controller
                name="sku" control={control} rules={{ required: 'Skill tidak boleh kosong' }}
                render={({ field }) => (
                  <TextField
                    {...field} color="secondary"
                    select sx={{ width: "100%", mb: 1, mr: 0.5 }} label="Sku" size="small" variant="outlined"
                    error={!!errors.sku}
                    helperText={errors.sku ? errors.sku.message : ''}
                  >
                    {!skuLoading && !skuError && skuData.getAllSkus.map((value: any, index: number) => {
                      return <MenuItem key={index} value={value._id}>
                        <div>{value.name} - {value.merk.name}</div>
                      </MenuItem>
                    })}
                  </TextField>
                )}
              />
              <Controller
                name="price" control={control} rules={{
                  required: 'Harga tidak boleh kosong',
                  validate: (value) => value >= 0 || 'Harga tidak valid'
                }}
                render={({ field }) => (<TextField
                  type="number"
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Harga" size='small' variant="outlined"
                  error={!!errors.price} helperText={errors.price ? errors.price.message : ''}
                  InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
                />)}
              />
            </div>
            <div className="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="warranty_expired_date" control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      {...field}
                      label="Tgl. Garansi (Exp)"
                      sx={{ mb: 1, mr: 0.5 }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || null)}
                      slotProps={{
                        textField: {
                          error: !!fieldState.error,
                          helperText: fieldState.error ? fieldState.error.message : null,
                          size: 'small',
                          fullWidth: true,
                          color: "secondary"
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Controller
                name="warranty_number" control={control}
                render={({ field }) => (<TextField
                  {...field} color="secondary"
                  sx={{ width: "100%", mb: 1, ml: 0.5 }} label="No. Garansi" size='small' variant="outlined"
                  error={!!errors.warranty_number} helperText={errors.warranty_number ? errors.warranty_number.message : ''}
                />)}
              />
            </div>

            <Controller
              name="status" control={control} rules={{ required: 'Status alat tidak boleh kosong' }}
              render={({ field }) => (
                <TextField
                  {...field} color="secondary"
                  select sx={{ width: "100%", mb: 1 }} label="Status Alat" size="small" variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                >
                  {!categoryLoading && !categoryError && categoryData.getCategories.map((value: any, index: number) => {
                    return <MenuItem key={index} value={value._id}>
                      <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                    </MenuItem>
                  })}
                </TextField>
              )}
            />
            <div className="flex justify-end">
              <Button variant="contained" color="secondary" onClick={handleSubmit(handleUpdateButton)}>
                Perbarui
              </Button>
            </div>
            <Box mt={1} maxHeight={400} sx={{ overflow: "auto" }}>
              <Box p={2}>
                <Typography variant="h6" component="h2">Daftar Transaksi Perpindagan Tool<b> {getData().id}</b></Typography>
                {dataTransaction &&
                  <Typography variant="body1" component="h2">Lokasi Penyimpanan Terbaru: <b> {getTransaction()[0].warehouse.name} ( {getTransaction()[0].warehouse.address} )</b></Typography>}
              </Box>
              {dataTransaction && <StickyHeadTable
                tableSx={{ height: 300 }}
                columns={transColumns}
                rows={getTransaction() ?? []}
                csvname="daftar_merk"
              />}
            </Box>
          </Container>
        }
      </div>
    </div>
  );
};

export default DetailTool;

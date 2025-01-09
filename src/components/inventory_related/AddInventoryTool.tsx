import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, InputAdornment, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { modalStyle } from "../../theme";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { GetAllSkusDocument } from "../../graphql/inventory.generated";
import { AddInventoryToolDocument, GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables } from "../../graphql/inventoryItem.generated";
import { formatCurrency, formatDateToLong } from "../../utils/service/FormatService";
import { GetBadReqMsg } from "../../utils/helpers/ErrorMessageHelper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { GetCategoriesDocument } from "../../graphql/category.generated";
import { CategoryType } from "../../types/staticData.types";
import { use } from "framer-motion/client";

interface RowData {
  description: string,
  warranty_number: string,
  warranty_expired_date: Date,
  status: String,
  status_name: String
  price: number,
  sku: String
  sku_name: String
}

const initialInputState = {
  description: "",
  warranty_number: "",
  status: "",
  price: 0,
  sku: ""
}

interface AddInventoryToolProps {
  warehouseId: String | undefined,
  refetch: (variables?: GetWarehouseToolsQueryVariables) => Promise<ApolloQueryResult<GetWarehouseToolsQuery>>;
}

const AddInventoryTool: React.FC<AddInventoryToolProps> = ({ warehouseId, refetch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

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
  const [addInventoryTool] = useMutation(AddInventoryToolDocument);
  const [rows, setRows] = useState<RowData[]>([])
  const { handleSubmit, control, formState: { errors }, reset } = useForm<RowData>({
    defaultValues: initialInputState,
  });

  const handleAddButton: SubmitHandler<RowData> = async (data) => {
    data.sku_name = skuData?.getAllSkus.find((sku: any) => sku._id == data.sku)?.name || "";
    data.status_name = categoryData?.getCategories.find((category: any) => category._id == data.status)?.name || "";
    setRows([...rows, data])
    reset(initialInputState)
  }
  const handleRemoveButton = (index: number) => {
    if (rows.length == 1) {
      setIsConfirmation(false)
    }
    setRows(rows.filter((_, i) => i !== index))
  }
  const handleSubmitButton = async () => {
    setIsEmpty(false)
    if (isConfirmation == false) {
      if (rows.length <= 0) {
        setIsEmpty(true)
      } else {
        setIsConfirmation(true)
      }
    } else if (isConfirmation == true) {
      // confirmed
      try {
        await addInventoryTool({
          variables: {
            addOnlyToolTransactionInput: {
              tool: rows.map(row => ({
                description: row.description,
                warranty_number: row.warranty_number,
                status: row.status,
                price: Number(row.price),
                sku: row.sku
              })),
              warehouse_to: warehouseId
            }
          }
        })
        await refetch()
        handleCloseModal()
        dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Tool pada Gudang" }))
      } catch (error: any) {
        let msg = GetBadReqMsg("Gagal tambah tool pada Gudang, silakan coba lagi nanti", error)
        dispatch(openSnackbar({ severity: "error", message: String(msg) }))
      }
    }
  }

  const handleBackButton = () => {
    if (isConfirmation == false) {
      handleCloseModal()
    } else if (isConfirmation == true) {
      setIsConfirmation(false)
    }
  }

  useEffect(() => { if (skuData) refetchSku() }, [skuData, refetchSku])
  useEffect(() => { if (categoryData) refetchCategory() }, [categoryData, refetchCategory])

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah Peralatan</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 700
        modalStyle.p = 2
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}><b>TAMBAH PERALATAN</b></Typography>
        <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
          {isEmpty && <span className="text-error">Anda perlu memberikan minimal satu peralatan yang akan dimasukan untuk konfirmasi</span>}
          <table className="table table-xs border-2">
            <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                <td align="center">Sku</td>
                <td >No. Garansi</td>
                <td >Tgl. Garansi (Exp)</td>
                <td align="center">Status</td>
                <td align="center">Harga</td>
                <td className="text-center">Action</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{row.sku_name}</td>
                  <td className="text-sm">{row.warranty_number ? row.warranty_number : <span className="text-error">belum diberikan</span>}</td>
                  <td className="text-sm">{row.warranty_expired_date ? formatDateToLong(row.warranty_expired_date.toString()) :
                    <span className="text-error">belum diberikan</span>
                  }</td>
                  <td className="text-sm" align="center">
                    <div className="badge whitespace-nowrap p-3 gap-2">{row.status_name}</div>
                  </td>
                  <td className="text-sm" align="right">{formatCurrency(row.price)}</td>
                  <td className="text-sm text-center">
                    <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                      onClick={() => { handleRemoveButton(index) }}
                    >
                      Batalkan
                    </Button>
                  </td>
                </tr>
              )) : <tr className="p-4"><td colSpan={6} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
            </tbody>
          </table>
        </Box>
        {isConfirmation && <span className="alert bg-warning p-2">
          Konfirmasi dan pastikan data tool yang ingin anda tambahkan pada gudang telah sesuai dan benar
        </span>}
        {/* ADD TOOL FIELD START */}
        {isConfirmation == false &&
          <>
            <span className="font-bold text-base">Silakan tambahkan tool yang diperlukan, dengan data sesuai.</span>
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
                name="sku" control={control} rules={{ required: 'Sku tidak boleh kosong' }}
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
            <Button variant="contained" color="success" onClick={handleSubmit(handleAddButton)} style={{ width: "100%" }}>Tambah ke List</Button>
          </>
        }
        {/* ADD MATERIAL FIELD END */}

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Button
            onClick={handleBackButton}
            variant="contained"
            color="error"
            disabled={isSubmitting}
          >
            {isConfirmation ? "Kembali" : "Batalkan"}
          </Button>
          <Button
            onClick={() => { handleSubmitButton() }}
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : isConfirmation ? "Tambahkan" : "Konfirmasi"}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddInventoryTool;
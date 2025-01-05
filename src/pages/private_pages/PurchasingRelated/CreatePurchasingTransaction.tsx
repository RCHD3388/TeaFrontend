import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Card, CardContent, Chip, CircularProgress, Container, Divider, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { useMutation, useQuery } from '@apollo/client';
import { Controller, set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';
import { CreatePurchaseTransactionDocument, GetAllPurchaseOrdersDocument } from '../../../graphql/purchasing.generated';
import { GetAllSuppliersDocument } from '../../../graphql/supplier.generated';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { GetAllMaterialsDocument, GetAllSkusDocument } from '../../../graphql/inventory.generated';
import { RequestItem_ItemType } from '../../../types/staticData.types';
import { formatCurrency, formatISODateToCustom } from '../../../utils/service/FormatService';
import PurchasingMaterialInput from './PurchasingMaterialInput';
import PurchasingToolInput, { ToolDetailPurchasingInput } from './PurchaseToolInput';

interface CreatePurchasingTransactionValues {
  supplier: string
  transaction_date: Date
  description: string
  transaction_number: string
}

interface PurchasingDetailValues {
  purchase_order: any,
  item: any,
  quantity: number,
  item_type: string
  price: number,
  tool?: {
    description: string
    warranty_number: string
    warranty_expired_date: Date
    status: string
    price: number
    sku: string
  }
}

interface CreatePurchasingTransactionProps { }

const CreatePurchasingTransaction: React.FC<CreatePurchasingTransactionProps> = ({ }) => {
  const navigate = useNavigate()
  let { data: supplierData, loading: supplierLoading, error: supplierError, refetch: supplierRefetch } = useQuery(GetAllSuppliersDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  let { data: poData, loading: poLoading, error: poError, refetch: poRefetch } = useQuery(GetAllPurchaseOrdersDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  let { data: materialData, loading: materialLoading, error: materialError, refetch: refetchMaterial } = useQuery(GetAllMaterialsDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  let { data: skuData, loading: skuLoading, error: skuError, refetch: refetchSku } = useQuery(GetAllSkusDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })

  const [createPurchaseTransaction] = useMutation(CreatePurchaseTransactionDocument)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [poInput, setPoInput] = useState<any>("")
  const [poInputError, setPoInputError] = useState("")
  const [itemtypeInput, setItemTypeInput] = useState(RequestItem_ItemType.MATERIAL)
  const [itemtypeInputError, setItemTypeInputError] = useState("")

  const dispatch = useDispatch();

  const [purchaseDetails, setPurchaseDetails] = useState<PurchasingDetailValues[]>([])
  const { handleSubmit, control, watch, setValue, formState: { errors }, reset } = useForm<CreatePurchasingTransactionValues>({
    defaultValues: {
      supplier: '',
      transaction_date: new Date(),
      description: '',
      transaction_number: '',
    },
  });

  // DONE
  const handleSubmitRequest = async (data: CreatePurchasingTransactionValues) => {
    if (purchaseDetails.length == 0) {
      setIsEmpty(true)
      return
    }
    setIsSubmitting(true)
    try {
      let formatedPurchaseDetails = purchaseDetails.map((detail) => {
        let defealtWithoutTool = {
          purchase_order: detail.purchase_order.value,
          item: detail.item.value,
          quantity: Number(detail.quantity),
          item_type: detail.item_type,
          price: Number(detail.price),
        }
        if (detail.item_type == RequestItem_ItemType.TOOL) {
          return {
            ...defealtWithoutTool, tool: {
              description: detail.tool?.description || "",
              warranty_number: detail.tool?.warranty_number || "",
              warranty_expired_date: detail.tool?.warranty_expired_date || null,
              status: detail.tool?.status || "",
              price: Number(detail.tool?.price) || 0,
              sku: detail.tool?.sku
            }
          }
        }
        return defealtWithoutTool
      })

      let input = {
        supplier: (data.supplier as any).value || "",
        transaction_date: data.transaction_date,
        description: data.description,
        transaction_number: data.transaction_number,
        purchase_transaction_detail: formatedPurchaseDetails
      }
      
      await createPurchaseTransaction({
        variables: {
          createPurchaseTransactionInput: input , requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil membuat data transaksi pembelian" }))
      navigate(-1)
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal membuat transaksi pembelian, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // HANDLE ADD MATERIAL
  const handleAddPurchasingMaterial = (material: any, quantity: number, price: number) => {
    if (checkItemList()) return

    let temp = [...purchaseDetails]
    temp.push({ purchase_order: poInput, item: material, quantity: Number(quantity), item_type: itemtypeInput, price: Number(price) })
    setPurchaseDetails(temp)
  }
  // HANDLE ADD TOOL
  const handleAddPurchasingTool = (data: ToolDetailPurchasingInput) => {
    if (checkItemList()) return

    let temp = [...purchaseDetails]
    temp.push({
      tool: {
        description: data.description || "",
        warranty_number: data.warranty_number || "",
        warranty_expired_date: data.warranty_expired_date,
        status: data.status,
        price: data.price,
        sku: data.sku
      }, item_type: RequestItem_ItemType.TOOL, item: {
        label: data.sku_name, value: data.sku
      }, quantity: 1, price: data.price, purchase_order: poInput
    })
    setPurchaseDetails(temp)
  }
  // HANDLE REMOVE
  const handleRemoveButton = (index: number) => {
    const updatedItemDetail = [...purchaseDetails];
    updatedItemDetail.splice(index, 1);
    setPurchaseDetails(updatedItemDetail);
  }


  const checkItemList = (): boolean => {
    setPoInputError("")
    setItemTypeInputError("")

    if (!poInput?.value) {
      setPoInputError("PO tidak boleh kosong")
      return true
    }
    if (!itemtypeInput) {
      setItemTypeInputError("Item Type tidak boleh kosong")
      return true
    }

    return false
  }

  // refetch new data
  useEffect(() => { if (supplierData) { supplierRefetch(); } }, [supplierData, supplierRefetch]);

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
          <div className="text-4xl font-bold mb-2">Membuat Transaksi Pembelian</div>
        </Box>
      </div>

      <Container sx={{ mt: 2 }}>
        <Controller
          name="transaction_number" control={control} rules={{ required: 'Kode Transaksi tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Kode Transaksi" size='small' variant="outlined"
            error={!!errors.transaction_number} helperText={errors.transaction_number ? errors.transaction_number.message : ''}
          />)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="transaction_date" control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                {...field}
                label="Tgl. Transaksi"
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
          name="description" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Deskripsi" size='small' variant="outlined"
            error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
          />)}
        />
        <Controller
          name="supplier" control={control} rules={{ required: 'Supplier tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal
              options={supplierLoading || !supplierData ? [] : supplierData.getAllSuppliers.map((sup: any) => {
                return {
                  label: `${sup.name} ( ${sup.person.name} )`,
                  value: sup._id
                }
              })}
              onChange={(_, data) => onChange(data)}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params} label="Supplier" sx={{ width: "100%", mb: 1 }}
                  error={!!error} helperText={error ? error.message : null}
                  color="secondary" size="small"
                />
              )}
            />
          )}
        />

        {/* ADD MATERIAL AND TOOLS */}
        <Box py={2}>
          <Typography variant="h6" component="h2"><b>Daftar Pembelian Barang</b></Typography>
          <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
            {isEmpty && <span className="text-error">Anda perlu memberikan minimal satu barang yang akan dimasukan untuk submit </span>}
            <table className="table table-xs border-2">
              <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr>
                  <td align="left">Barang</td>
                  <td align="left">Tipe Barang</td>
                  <td align="right">Kuantitas</td>
                  <td align="right">Harga</td>
                  <td align="right">Target PO</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {purchaseDetails.length > 0 ? purchaseDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="text-sm" align="left" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.item.label}</td>
                    <td className="text-sm" align="left">{item.item_type}</td>
                    <td className="text-sm" align="right">{item.quantity}</td>
                    <td className="text-sm" align="right">{formatCurrency(item.price)}</td>
                    <td className="text-sm" align="right">{item.purchase_order.label}</td>
                    <td className="text-sm text-center">
                      <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                        onClick={() => { handleRemoveButton(index) }}
                      >
                        Batalkan
                      </Button>
                    </td>
                  </tr>
                )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
              </tbody>
            </table>
          </Box>
          <Box py={2} px={3}>
            <Autocomplete
              disablePortal
              options={poLoading || !poData ? [] : poData.getAllPurchaseOrders.map((po: any) => {
                return {
                  label: `PO${formatISODateToCustom(po.date)}`,
                  value: po._id
                }
              })}
              onChange={(_, data) => setPoInput(data)}
              value={poInput}
              renderInput={(params) => (
                <TextField
                  {...params} label="Order Pembelian" sx={{ width: "100%", mb: 1 }}
                  error={poInputError.length != 0} helperText={poInputError}
                  color="secondary" size="small"
                />
              )}
            />
            <TextField
              color="secondary" select sx={{ width: "100%" }} label="Tipe Barang" size="small" variant="outlined"
              onChange={(e) => setItemTypeInput(e.target.value as RequestItem_ItemType)} value={itemtypeInput}
              error={itemtypeInputError.length != 0} helperText={itemtypeInputError}
            >
              <MenuItem value={RequestItem_ItemType.MATERIAL}><div className="badge whitespace-nowrap p-3 gap-2">{RequestItem_ItemType.MATERIAL}</div></MenuItem>
              <MenuItem value={RequestItem_ItemType.TOOL}><div className="badge whitespace-nowrap p-3 gap-2">{RequestItem_ItemType.TOOL}</div></MenuItem>
            </TextField>

            <Typography variant="body1" component="h2" sx={{ mt: 2 }}><b>Detail Barang</b></Typography>


            {/* INPUT MATERIAL */}
            {itemtypeInput == RequestItem_ItemType.MATERIAL &&
              <>
                <PurchasingMaterialInput materialData={materialData} materialLoading={materialLoading} handleAddPurchasingMaterial={handleAddPurchasingMaterial} />
              </>
            }
            {itemtypeInput == RequestItem_ItemType.TOOL &&
              <>
                <PurchasingToolInput skuData={skuData} skuLoading={skuLoading} skuError={skuError} handleAddPurchasingTool={handleAddPurchasingTool} />
              </>
            }
          </Box>
        </Box>

        {/* BUTTON SUBMIT */}
        <div className='flex justify-end'>
          <Button
            onClick={handleSubmit(handleSubmitRequest)}
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Submit")}
          </Button>
        </div>

      </Container>
    </div>
  )
}

export default CreatePurchasingTransaction

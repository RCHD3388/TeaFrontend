import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Box, Button, Card, CardContent, Chip, Container, Divider, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { useMutation, useQuery } from '@apollo/client';
import { selectUser } from '../../../app/reducers/userSlice';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeRoleType, RequestItem_ItemType, RequestItemType, RequestStatusType } from '../../../types/staticData.types';
import { AddNewDetailPtDocument, GetAllPurchaseOrdersDocument, GetPurchaseTransactionByIdDocument, HandleWaitingPoDocument, RemovePurchaseTransactionDetailDocument, UpdatePurchaseTransactionDocument } from '../../../graphql/purchasing.generated';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';
import { GetAllSuppliersDocument } from '../../../graphql/supplier.generated';
import { formatCurrency, formatISODateToCustom } from '../../../utils/service/FormatService';
import PurchasingMaterialInput from './PurchasingMaterialInput';
import PurchasingToolInput, { ToolDetailPurchasingInput } from './PurchaseToolInput';
import { GetAllMaterialsDocument, GetAllSkusDocument } from '../../../graphql/inventory.generated';

interface DetailPurchasingProps { }

interface UpdatePurchasingTransactionValues {
  supplier: any
  transaction_date: Date
  description: string
  transaction_number: string
}

const DetailPurchasing: React.FC<DetailPurchasingProps> = ({ }) => {
  const { purchasingId } = useParams();
  const { data, loading, error, refetch } = useQuery(GetPurchaseTransactionByIdDocument, { variables: { id: purchasingId, requiresAuth: true }, });
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
  const [poInput, setPoInput] = useState<any>("")
  const [poInputError, setPoInputError] = useState("")
  const [itemtypeInput, setItemTypeInput] = useState(RequestItem_ItemType.MATERIAL)
  const [itemtypeInputError, setItemTypeInputError] = useState("")

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updatePurchaseTransaction] = useMutation(UpdatePurchaseTransactionDocument)
  const [removePurchaseTransactionDetail] = useMutation(RemovePurchaseTransactionDetailDocument)
  const [addNewDetailPT] = useMutation(AddNewDetailPtDocument)

  const dispatch = useDispatch()
  const getData = () => {
    return data?.getPurchaseTransactionById.purchase_transaction[0]
  }
  const getRawData = () => {
    return data?.getPurchaseTransactionById
  }
  const getItemDetail = (id: String, type: String) => {
    if (type == RequestItem_ItemType.MATERIAL) {
      let material = getRawData().materials.find((material: any) => { return material._id == id })
      return `${material.name} (${material.conversion} x ${material.minimum_unit_measure.name}) - ${material.merk.name}`
    } else if (type == RequestItem_ItemType.TOOL) {
      let tool = getRawData().tools.find((tool: any) => { return tool._id == id })
      return `${tool.id} ( ${tool.sku.name} - ${tool.sku.merk.name} )`
    }
  }
  const canEdit = () => {
    return data && user._id == getData().purchasing_staff._id
  }

  const { handleSubmit, control, watch, setValue, formState: { errors }, reset } = useForm<UpdatePurchasingTransactionValues>({
    defaultValues: {
      supplier: "",
      transaction_date: new Date(),
      description: "",
      transaction_number: "",
    },
  });

  const handleUpdateData = async (data: UpdatePurchasingTransactionValues) => {
    setIsSubmitting(true)
    try {
      let input = {
        supplier: (data.supplier as any).value || "",
        transaction_date: data.transaction_date,
        description: data.description,
        transaction_number: data.transaction_number,
      }

      await updatePurchaseTransaction({
        variables: {
          id: purchasingId,
          updatePurchaseTransactionInput: input, requiresAuth: true
        }
      })
      refetch()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui data transaksi pembelian" }))
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal memperbarui transaksi pembelian, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveButton = async (id: String) => {
    setIsSubmitting(true)
    try {
      await removePurchaseTransactionDetail({
        variables: {
          id: purchasingId,
          id_detail: id, requiresAuth: true
        }
      })
      refetch()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil menghapus data detail transaksi" }))
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal menghapus data detail transaksi, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
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
  // ADD NEW PRUCHAS DETAL
  const handleAddPurchasingMaterial = async (material: any, quantity: number, price: number) => {
    if (checkItemList()) return

    let input = { purchase_order: poInput.value, item: material.value, quantity: Number(quantity), item_type: itemtypeInput, price: Number(price) }
    handleAddNewPTDetail(input)
  }
  // HANDLE ADD TOOL
  const handleAddPurchasingTool = async (data: ToolDetailPurchasingInput) => {
    if (checkItemList()) return

    let input = {
      tool: {
        description: data.description || "",
        warranty_number: data.warranty_number || "",
        warranty_expired_date: data.warranty_expired_date,
        status: data.status,
        price: Number(data.price),
        sku: data.sku
      }, item_type: RequestItem_ItemType.TOOL, item: data.sku, quantity: 1, price: Number(data.price), purchase_order: poInput.value
    }
    handleAddNewPTDetail(input)
  }
  // HANDLE SUBMIT NEW PURCHASE DETAIL
  const handleAddNewPTDetail = async (input: any) => {
    setIsSubmitting(true)
    try {
      await addNewDetailPT({
        variables: {
          id: purchasingId,
          createPurchaseTransactionDetailInput: {
            input: input
          }, requiresAuth: true
        }
      })
      refetch()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil manambahkan data detail transaksi" }))
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal manambahkan data detail transaksi, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (data) {
      reset({
        supplier: { value: getData().supplier._id, label: `${getData().supplier.name} - ${getData().supplier.person.name}` },
        transaction_date: getData().transaction_date,
        description: getData().description,
        transaction_number: getData().transaction_number,
      })
    }
  }, [data])

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
          <div className="text-4xl font-bold mb-2">Detail Pembelian</div>
        </Box>
        {(!loading && !error) &&
          <Box maxHeight={800} overflow={"auto"}>
            <Container sx={{ mt: 3 }}>
              <Card sx={{ my: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Data Detail Transaksi Pembelian</Typography>
                  {/* FIELD START */}
                  <Controller
                    name="transaction_number" control={control} rules={{ required: 'Kode Transaksi tidak boleh kosong' }}
                    render={({ field }) => (<TextField
                      {...field} color="secondary" disabled={!canEdit()}
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
                          disabled={!canEdit()}
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
                    disabled={!canEdit()}
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
                        disabled={!canEdit()}
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
                  {/* FIELD END */}
                  <div className='flex justify-end'>
                    {canEdit() &&
                      <Button variant="contained" color="secondary" onClick={handleSubmit(handleUpdateData)} disabled={isSubmitting}>
                        Perbarui
                      </Button>
                    }
                  </div>
                </CardContent>
              </Card>
              <div className='flex justify-end'>
                <Button variant="contained" color="warning" onClick={() => { }} >Cetak Laporan</Button>
              </div>

              {/* DETAIL BARANG */}
              <Box pt={2}>
                <Typography variant="h6" component="h2"><b>Daftar Pembelian Barang</b></Typography>
                <Box overflow={"auto"} maxHeight={300} sx={{ mb: 1 }}>
                  <table className="table table-xs border-2">
                    <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                      <tr>
                        <td align="left">Barang</td>
                        <td align="left">Tipe Barang</td>
                        <td align="right">Kuantitas</td>
                        <td align="right">Harga</td>
                        <td align="right">PO Tujuan</td>
                        <td className="text-center">Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data && getData().purchase_transaction_detail.length > 0 ? getData().purchase_transaction_detail.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="text-sm" align="left" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                            {getItemDetail(item.original_item, item.item_type)}
                          </td>
                          <td className="text-sm" align="left">{item.item_type}</td>
                          <td className="text-sm" align="right">{item.quantity}</td>
                          <td className="text-sm" align="right">{formatCurrency(item.price)}</td>
                          <td className="text-sm" align="right">PO{formatISODateToCustom(item.purchase_order.date)}</td>
                          <td className="text-sm text-center">
                            <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                              onClick={() => { handleRemoveButton(item._id) }} disabled={isSubmitting || !canEdit()}
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
            </Container>
          </Box>
        }
      </div>
    </div>
  )
}

export default DetailPurchasing

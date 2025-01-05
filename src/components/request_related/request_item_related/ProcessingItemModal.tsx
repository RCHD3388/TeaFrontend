import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Box, Button, Chip, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { GetBadReqMsg } from "../../../utils/helpers/ErrorMessageHelper";
import { modalStyle } from "../../../theme";
import { ProcessingItemRequestDocument } from "../../../graphql/request_item.generated";
import { GetWarehouseToolsDocument } from "../../../graphql/inventoryItem.generated";
import { RequestItem_ItemType, RequestItemType } from "../../../types/staticData.types";

interface ProcessValues {
  sender_name: string
  sender_phone: string
  police_number: string
  vehicle_detail: string
}

interface ProcessingItemModalProps {
  refetchRequest: (variables?: any) => Promise<ApolloQueryResult<any>>;
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  requestItemId: String,
  requestData: any,
  requestSkuData: any
}

const ProcessingItemModal: React.FC<ProcessingItemModalProps> = ({
  refetchRequest,
  openModal,
  handleOpenModal,
  handleCloseModal,
  requestItemId,
  requestData,
  requestSkuData
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [processingItemRequest] = useMutation(ProcessingItemRequestDocument);
  let { data: toolData, loading: toolLoading, error: toolError, refetch: toolRefetch } = useQuery(GetWarehouseToolsDocument, {
    variables: {
      warehouse_id: requestData.type == RequestItemType.PEMINJAMAN ? requestData.requested_to._id : requestData.requested_from._id,
      requiresAuth: true
    }
  });
  const [newTool, setNewTool] = useState<string | null>(null);
  const [newToolFieldError, setNewToolFieldError] = useState<string>("");
  const [processingItemDetail, setProcessingItemDetail] = useState<{ sku: any, qty: number, tool: any[] }[]>([]);
  const getToolFieldData = () => {
    let targetSku = processingItemDetail.map((item: any) => item.sku._id);
    return toolData.getWarehouseTools
      .filter((to: any) => {
        return !processingItemDetail.find((item: any) => item.tool.find((tool: any) => tool._id == to.tool._id)) && targetSku.includes(to.tool.sku._id)
      })
      .map((to: any) => {
        return {
          label: `${to.tool.id} ( ${to.tool.sku.merk.name} )`,
          value: to.tool._id
        }
      })
  }

  const addNewTool = async () => {
    setNewToolFieldError("");
    if (!newTool) {
      setNewToolFieldError("Tool harus diisi");
      return;
    }
    let newToolId = (newTool as any).value
    let tool = toolData.getWarehouseTools.find((trf: any) => trf.tool._id == newToolId).tool;
    let tempData = processingItemDetail.map((item: any) => {
      if (item.sku._id == tool.sku._id) {
        item.tool.push(tool)
        return { ...item }
      }
      return { ...item }
    });
    setNewTool(null);
    setProcessingItemDetail(tempData);
  }
  const removeToolFromSku = (sku: String, tool: String) => {
    let tempData = processingItemDetail.map((item: any) => {
      if (item.sku._id == sku) {
        item.tool = item.tool.filter((t: any) => t._id != tool)
        return { ...item }
      }
      return { ...item }
    })
    setProcessingItemDetail(tempData);
  }

  useEffect(() => {
    if (processingItemDetail.length > 0) return
    let tempData = [];
    tempData.push(...requestData.request_item_detail.filter((item: any) => item.item_type == RequestItem_ItemType.TOOL).map((item: any) => {
      let sku = requestSkuData.find((sku: any) => { return sku._id == item.item })
      return {
        sku: sku,
        qty: item.quantity,
        tool: []
      }
    }))
    setProcessingItemDetail(tempData)
  }, [])

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ProcessValues>({
    defaultValues: {
      sender_name: "",
      sender_phone: "",
      police_number: "",
      vehicle_detail: "",
    },
  });

  const handleSubmitData: SubmitHandler<ProcessValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await processingItemRequest({
        variables: {
          id: requestItemId,
          createProcessingDetailInput: {
            sender_name: data.sender_name,
            sender_phone: data.sender_phone,
            police_number: data.police_number,
            vehicle_detail: data.vehicle_detail,
            processing_tool_detail: processingItemDetail.map((item: any) => {
              return {
                sku: item.sku._id,
                tool: item.tool.map((tool: any) => tool._id)
              }
            })
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memproses permintaan" }))
      refetchRequest()
      handleCloseModal()
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal memproses permintaan, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<>{requestItemId &&
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 800;
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}><b>ISI DATA PENGIRIMAN</b></Typography>
        <Typography id="modal-modal-title" variant="body1" component="h2"><b>Informasi Pengirim</b></Typography>
        {/* FIELD START */}
        <Controller
          name="sender_name" control={control} rules={{ required: 'Nama Pengirim tidak boleh kosong' }}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Nama" size='small' variant="outlined"
            error={!!errors.sender_name} helperText={errors.sender_name ? errors.sender_name.message : ''}
          />)}
        />
        <div className="flex justify-between">
          <Controller
            name="sender_phone" control={control} rules={{ required: 'No Telp. Pengirim tidak boleh kosong' }}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1, mr: 0.5 }} label="No Telp" size='small' variant="outlined"
              error={!!errors.sender_phone} helperText={errors.sender_phone ? errors.sender_phone.message : ''}
            />)}
          />
          <Controller
            name="police_number" control={control}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Nomor Polisi" size='small' variant="outlined"
              error={!!errors.police_number} helperText={errors.police_number ? errors.police_number.message : ''}
            />)}
          />
        </div>
        <Controller
          name="vehicle_detail" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Detail Kendaraan" size='small' variant="outlined"
            error={!!errors.vehicle_detail} helperText={errors.vehicle_detail ? errors.vehicle_detail.message : ''}
          />)}
        />
        {/* FIELD END */}
        {/* SELECT TOOL ITEM */}
        <Typography id="modal-modal-title" variant="body1" sx={{ mt: 1 }} component="h2"><b>Pilih peralatan yang akan diberikan</b></Typography>
        <Box px={2} py={1} maxHeight={400} sx={{ overflow: "auto" }}>
          {processingItemDetail.length != 0 && processingItemDetail.map((item: any, index: number) => {
            return (
              <Box key={index} display={"flex"} flexDirection={"column"} sx={{ mb: 2 }}>
                <span> <span className="font-bold text-gray-600">Nama: </span>{item.sku.name} <span className="font-bold text-gray-600">  Merk: </span>{item.sku.merk.name}</span>
                <span> <span className="font-bold text-gray-600">Kuantitas: </span>{item.qty}</span>
                <Box  >
                  <table className="table table-xs border-2">
                    <thead className="bg-secondary text-white font-normal" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                      <tr>
                        <td align="center">ID Peralatan</td>
                        <td align="center">Batalkan</td>
                      </tr>
                    </thead>
                    <tbody>
                      {item.tool.length > 0 ? item.tool.map((tool: any, toolIndex: number) => (
                        <tr key={toolIndex}>
                          <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}> {tool.id} </td>
                          <td className="text-sm" align="center"><Button variant="contained" color="error" size="small"
                            onClick={() => { removeToolFromSku(tool.sku._id, tool._id) }}>Batalkan</Button></td>
                        </tr>
                      )) : <tr className="p-4"><td colSpan={4} className="p-2 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
                    </tbody>
                  </table>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Autocomplete
            disablePortal
            options={toolLoading || !toolData ? [] : getToolFieldData()}
            sx={{ width: "100%", mr: 1 }}
            onChange={(event: React.SyntheticEvent, newValue: string | null) => {
              setNewTool(newValue);
            }}
            value={newTool}
            disabled={processingItemDetail.length == 0}
            renderInput={(params) => <TextField
              color="secondary" {...params} size="small" label="ID Peralatan (SKU)"
              error={newToolFieldError.length != 0} helperText={newToolFieldError}
            />}
          />
          <Button variant="contained" color="secondary" disabled={processingItemDetail.length == 0} onClick={() => { addNewTool() }}>Tambah</Button>
        </Box>


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
            onClick={handleSubmit(handleSubmitData)}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Konfirmasi Pengiriman")}
          </Button>
        </Box>
      </Box>
    </Modal>
  }</>)
}

export default ProcessingItemModal;
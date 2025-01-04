import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { useMutation, useQuery } from '@apollo/client';
import { selectUser } from '../../../app/reducers/userSlice';
import { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToLong, RequestStatusColors } from '../../../utils/service/FormatService';
import { EmployeeRoleType, RequestItem_ItemType, RequestItemType, RequestStatusType } from '../../../types/staticData.types';
import { CancelPurchaseOrderDocument, GetPurchaseOrderByIdDocument, HandleWaitingPoDocument } from '../../../graphql/purchasing.generated';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import { GetBadReqMsg } from '../../../utils/helpers/ErrorMessageHelper';
import PurchaseOrderReportModal from './PurchaseOrderReport';

interface DetailPurchaseOrderProps { }


const DetailPurchaseOrder: React.FC<DetailPurchaseOrderProps> = ({ }) => {
  const { requestPoId } = useParams();
  const { data, loading, error, refetch } = useQuery(GetPurchaseOrderByIdDocument, { variables: { id: requestPoId }, });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));
  const [handleWaitingPO] = useMutation(HandleWaitingPoDocument)
  const [cancelPurchaseOrder] = useMutation(CancelPurchaseOrderDocument)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openReportModal, setOpenReportModal] = useState(false);
  const handleOpenReportModal = () => { setOpenReportModal(true) }
  const handleCloseReportModal = () => { setOpenReportModal(false) }

  const dispatch = useDispatch()
  const getItemName = (item_type: String, item: String) => {
    if (item_type == RequestItem_ItemType.MATERIAL) {
      let material = data?.getPurchaseOrderByID.materials.find((mat: any) => { return mat._id == item })
      return material ? `${material.name} (${material.conversion} x ${material.minimum_unit_measure.name}) - ${material.merk.name}` : ``
    } else if (item_type == RequestItem_ItemType.TOOL) {
      let sku = data?.getPurchaseOrderByID.skus.find((sku: any) => { return sku._id == item })
      return sku ? `${sku.name} - ${sku.merk.name}` : ``
    }
    return ""
  }

  const getDataRequest = () => {
    return data?.getPurchaseOrderByID.purchase_order
  }

  const handleAction = async (value: String) => {
    setIsSubmitting(true)
    try {
      if (value == RequestStatusType.DIBATALKAN || value == RequestStatusType.DISETUJUI || value == RequestStatusType.DITOLAK) {
        if (value == RequestStatusType.DIBATALKAN) {
          await cancelPurchaseOrder({ variables: { id: requestPoId, requiresAuth: true } })
        } else if (value == RequestStatusType.DISETUJUI || value == RequestStatusType.DITOLAK) {
          await handleWaitingPO({
            variables: {
              id: requestPoId, status: value,
              requiresAuth: true
            }
          })
        }
        refetch()
        dispatch(openSnackbar({ severity: "success", message: "Berhasil memperbarui status permintaan" }))
      }
    } catch (error: any) {
      let msg = GetBadReqMsg("Gagal memperbarui status permintaan, silakan coba lagi nanti", error)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (error) {
      navigate("/appuser/notfound")
    }
  }, [error]);

  useEffect(() => {
    console.log(data?.getPurchaseOrderByID.materials)
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
          <div className="text-4xl font-bold mb-2">Detail Permintaan Pembelian</div>
        </Box>
        {(!loading && !error) &&
          <Box maxHeight={800} overflow={"auto"}>
            <Container sx={{ mt: 3 }}>
              <Card sx={{ my: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Permintaan</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Diajukan oleh:</b> {getDataRequest()?.requested_by?.person.name} ( {getDataRequest()?.requested_by?.person.email} )</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Dibuat pada:</b> {getDataRequest() ? formatDateToLong(getDataRequest()?.date) : ''}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Deskripsi: </b> {getDataRequest()?.description || "-"}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Gudang Asal:</b> {getDataRequest()?.requested_from.name || ""} - ( {getDataRequest()?.requested_from.address} )</Typography>
                  </Stack>
                  <Box maxHeight={250} overflow={"auto"}>
                    <table className="table table-xs border-2">
                      <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0 }}>
                        <tr>
                          <td align="left">Barang</td>
                          <td align="right">Kuantitas </td>
                          <td align="right">Jumlah Diterima </td>
                          <td align="left">Tipe Barang</td>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDataRequest().purchase_order_detail.length > 0 ? getDataRequest().purchase_order_detail.map((item: any, index: number) => (
                          <>
                            <tr key={index}>
                              <td className="text-sm" align="left" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                                {getItemName(item.item_type, item.item)}
                              </td>
                              <td className="text-sm" align="right">{item.quantity}</td>
                              <td className="text-sm" align="right">{item.completed_quantity}</td>
                              <td className="text-sm" align="left">{item.item_type}</td>
                            </tr>
                          </>
                        )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
                      </tbody>
                    </table>
                  </Box>
                </CardContent>

                {/* INFORMASI PENYELESAIAN */}
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Informasi Persetujuan</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      <b>Status Permintaan:</b>
                      <span className={` ms-1 badge ${RequestStatusColors[getDataRequest().status as keyof typeof RequestStatusColors]}`}> {getDataRequest().status}</span>
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              {/* ACTION BUTTON */}
              <div className='flex justify-end'>
                {/* BATALKAN */}
                {user._id == getDataRequest().requested_by._id && <>
                  <div>
                    <Button variant="contained" color="error" disabled={
                      getDataRequest()?.status != RequestStatusType.MENUNGGU || isSubmitting
                    } sx={{ mr: 1 }}
                      onClick={() => { handleAction(RequestStatusType.DIBATALKAN) }}
                    >
                      Batalkan
                    </Button>
                  </div>
                </>}
                {user._id != getDataRequest().requested_by._id
                  && user.role != EmployeeRoleType.STAFF_PEMBELIAN
                  && user.role != EmployeeRoleType.MANDOR && <>
                    <div>
                      <Button variant="contained" color="error" disabled={
                        getDataRequest()?.status != RequestStatusType.MENUNGGU || isSubmitting
                      } sx={{ mr: 1 }}
                        onClick={() => { handleAction(RequestStatusType.DITOLAK) }}
                      >
                        Menolak
                      </Button>
                    </div>
                    <div>
                      <Button variant="contained" color="success" disabled={
                        getDataRequest()?.status != RequestStatusType.MENUNGGU || isSubmitting
                      } sx={{ mr: 1 }}
                        onClick={() => { handleAction(RequestStatusType.DISETUJUI) }}
                      >
                        Menyetujui
                      </Button>
                    </div>
                  </>}
                {user.role != EmployeeRoleType.MANDOR && <>
                  <div>
                    <Button variant="contained" color="warning" sx={{ mr: 1 }}
                      onClick={() => { handleOpenReportModal() }}
                    >
                      Cetak Permintaan
                    </Button>
                    <PurchaseOrderReportModal
                      openModal={openReportModal}
                      handleOpenModal={handleOpenReportModal}
                      handleCloseModal={handleCloseReportModal}
                    />
                  </div>
                </>}
              </div>
            </Container>
          </Box>
        }
      </div>
    </div>
  )
}

export default DetailPurchaseOrder

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { theme } from '../../../theme';
import { FindOneRequestItemTransactionDocument } from '../../../graphql/request_item.generated';
import { useQuery } from '@apollo/client';
import { selectUser } from '../../../app/reducers/userSlice';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { formatDateToLong, RequestStatusColors } from '../../../utils/service/FormatService';
import { RequestItem_ItemType, RequestItemType, RequestStatusType } from '../../../types/staticData.types';

interface DetailRequestItemProps { }

const DetailRequestItem: React.FC<DetailRequestItemProps> = ({ }) => {
  const { requestItemId } = useParams();
  const { data, loading, error } = useQuery(FindOneRequestItemTransactionDocument, { variables: { id: requestItemId }, });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectUser(state));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDataRequest = () => {
    return data?.findOneRequestItemTransaction.request_item_header
  }
  const getItemName = (item_type: String, item: String) => {
    if (item_type == RequestItem_ItemType.MATERIAL) {
      let material = data?.findOneRequestItemTransaction.materials.find((mat: any) => { return mat._id == item })
      return material ? `${material.name} (${material.conversion} x ${material.minimum_unit_measure.name}) - ${material.merk.name}` : ``
    } else if (item_type == RequestItem_ItemType.TOOL) {
      let sku = data?.findOneRequestItemTransaction.skus.find((sku: any) => { sku._id == item })
      return sku ? `${sku.name} - ${sku.merk.name}` : ``
    }
    return ""
  }

  const getDisabledCondition = () => {
    return getDataRequest().status == RequestStatusType.DISETUJUI || isSubmitting
  }

  useEffect(() => {
    if (error) {
      navigate("/appuser/notfound")
    }
  }, [error]);

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
          <div className="text-4xl font-bold mb-2">Detail Permintaan Perpindahan Barang</div>
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
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Dibuat pada:</b> {getDataRequest() ? formatDateToLong(getDataRequest()?.requested_at) : ''}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Deskripsi: </b> {getDataRequest()?.description ?? "-"}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Tipe Perpindahan: </b>
                      <span className='badge badge-neutral' style={{ textTransform: "capitalize" }}>{getDataRequest()?.type || ""}</span>
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Warehouse Asal:</b> {getDataRequest()?.requested_from.name || ""} - ( {getDataRequest()?.requested_from.address} )</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}><b>Warehouse Tujuan:</b> {getDataRequest()?.requested_to.name || ""} - ( {getDataRequest()?.requested_to.address} )</Typography>
                  </Stack>
                  <Box sx={{ p: 1 }}>
                    <table className="table table-xs border-2">
                      <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0 }}>
                        <tr>
                          <td align="center">Barang</td>
                          <td align="center">Kuantitas </td>
                          <td align="center">Tipe Barang</td>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDataRequest().request_item_detail.length > 0 ? getDataRequest().request_item_detail.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                              {getItemName(item.item_type, item.item)}
                            </td>
                            <td className="text-sm" align="center">{item.quantity}</td>
                            <td className="text-sm" align="center">{item.item_type}</td>
                          </tr>
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

              {/* HASIL PERSETUJUAN */}
              {(getDataRequest()?.status == RequestStatusType.PROSES || getDataRequest()?.status == RequestStatusType.SELESAI) &&
                <Card sx={{ my: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Data Pengirim</Typography>
                    <Box px={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>Nama Pengirim:</b> {getDataRequest()?.finishing_detail?.sender_name || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>No Telp. Pengirim:</b> {getDataRequest()?.finishing_detail?.sender_phone || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>Nomer Polisi:</b> {getDataRequest()?.finishing_detail?.police_number || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>Detail Kendaraan:</b> {getDataRequest()?.finishing_detail?.vehicle_detail || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>Nama Penerima:</b> {getDataRequest()?.finishing_detail?.recipient_name || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>No Telp. Penerima:</b> {getDataRequest()?.finishing_detail?.recipient_phone || "-"}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" sx={{ mr: 2 }}><b>Deskripsi Tambahan:</b> {getDataRequest()?.finishing_detail?.recipient_description || "-"}</Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              }
              {/* ACTION BUTTON */}
              <div className='flex justify-end'>
                {/* BATALKAN */}
                {user._id == getDataRequest().requested_by._id && getDataRequest()?.status == RequestStatusType.MENUNGGU && <>
                  <div>
                    <Button variant="contained" color="error" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                      onClick={() => { }}
                    >
                      Batalkan
                    </Button>
                  </div>
                </>}
                {/* SETUJUI */}
                {user._id != getDataRequest().requested_by._id 
                && getDataRequest()?.status == RequestStatusType.MENUNGGU 
                && getDataRequest()?.type == RequestItemType.PENGEMBALIAN && <>
                  <div>
                    <Button variant="contained" color="success" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                      onClick={() => { }}
                    >
                      Menyetujui
                    </Button>
                  </div>
                </>}
                {/* PROCESSING */}
                {(
                  (user._id == getDataRequest().requested_by._id && getDataRequest()?.status == RequestStatusType.DISETUJUI && getDataRequest()?.type == RequestItemType.PENGEMBALIAN) ||
                  (user._id != getDataRequest().requested_by._id && getDataRequest()?.status == RequestStatusType.MENUNGGU && getDataRequest()?.type == RequestItemType.PEMINJAMAN) 
                )&& <>
                  <div>
                    <Button variant="contained" color="warning" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                      onClick={() => { }}
                    >
                      PROSES KIRIM
                    </Button>
                  </div>
                </>}
                {/* DITERIMA */}
                {(
                  (user._id != getDataRequest().requested_by._id && getDataRequest()?.status == RequestStatusType.PROSES && getDataRequest()?.type == RequestItemType.PENGEMBALIAN) ||
                  (user._id == getDataRequest().requested_by._id && getDataRequest()?.status == RequestStatusType.PROSES && getDataRequest()?.type == RequestItemType.PEMINJAMAN) 
                )&& <>
                  <div>
                    <Button variant="contained" color="success" disabled={getDisabledCondition()} sx={{ mr: 1 }}
                      onClick={() => { }}
                    >
                      SELESAIKAN
                    </Button>
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

export default DetailRequestItem

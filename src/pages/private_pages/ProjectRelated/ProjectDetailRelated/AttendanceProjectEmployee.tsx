import AddAttendanceModule from "../../../../components/project_related/attendance_related/AddAttendanceModule";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { DeleteAttendanceModuleDocument, FindAllAttendanceModulesDocument } from "../../../../graphql/project.generated";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import AttendanceCard from "../../../../components/project_related/attendance_related/AttendanceCard";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { modalStyle, theme } from "../../../../theme";
import DetailAttendance from "./DetailAttendance";
import { formatDateToLong } from "../../../../utils/service/FormatService";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper";

interface AttendanceProjectEmployeeProps {
  projectId: string | undefined
}

const AttendanceProjectEmployee: React.FC<AttendanceProjectEmployeeProps> = ({ projectId }) => {
  const { data: attendanceData, loading: attendanceLoading, error: attendanceError, refetch: attendanceRefetch } = useQuery(FindAllAttendanceModulesDocument, {
    variables: {
      projectId: projectId || "",
      requiresAuth: true
    }
  })
  // page 1 => default untuk view dan create
  // page 2 => untuk detail dan edit
  const [page, setPage] = React.useState(1);
  const [deleteAttendanceModule] = useMutation(DeleteAttendanceModuleDocument);
  const [selectedAttendanceId, setSelectedAttendanceId] = React.useState<string | undefined>(undefined);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const getStartDate = () => {
    return attendanceData.findAllAttendanceModules.find((d: any) => d._id == selectedAttendanceId)?.start_date
  }
  const getEndDate = () => {
    return attendanceData.findAllAttendanceModules.find((d: any) => d._id == selectedAttendanceId)?.end_date
  }

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await deleteAttendanceModule({
        variables: {
          projectId: projectId, moduleId: selectedAttendanceId,
          requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui modul absensi" }))
      attendanceRefetch()
      setSelectedAttendanceId(undefined)
      setOpenDeleteModal(false)
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal perbarui modul absen, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* UNTUK PAGE DEFAULT */}
        {page == 1 &&
          <>
            <div className="text-2xl font-bold mb-2">Absensi Pegawai</div>
            <div className="flex justify-end">
              <AddAttendanceModule projectId={projectId || ""} refetchProjectAttendance={attendanceRefetch} />
            </div>
            {!attendanceLoading && !attendanceError &&
              attendanceData.findAllAttendanceModules.map((d: any) => <AttendanceCard key={d._id} {...d} onDetailClick={() => {
                setPage(2);
                setSelectedAttendanceId(d._id);
              }} onDeleteClick={() => {
                setSelectedAttendanceId(d._id);
                setOpenDeleteModal(true);
              }} withDelete={d.submit_status == false} />)
            }
          </>
        }

        {/* UNTUK PAGE DETAIL */}
        {page == 2 && (
          <div className="" style={{ height: "100%" }}>
            <div className="flex flex-col" style={{ maxHeight: "100%" }}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={2}>
                <div className="text-2xl font-bold mb-2">Detail Absensi Pegawai</div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => { setPage(1); setSelectedAttendanceId(undefined); }}
                >Kembali Ke Daftar Absensi</Button>
              </Box>
              {!selectedAttendanceId ? <div className="flex justify-center items-center p-5 bg-accent shadow-md">
                DATA ABSENSI TIDAK DITEMUKAN
              </div> : <DetailAttendance projectId={projectId || ""} moduleId={selectedAttendanceId} />}
            </div>
          </div>
        )}
      </div>



      {/* DELETE MODAL */}
      {attendanceData && selectedAttendanceId && <Modal
        open={openDeleteModal}
        onClose={() => { setOpenDeleteModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}><b>Hapus module absensi</b></Typography>
          <Box>
            <Typography id="modal-modal-description" sx={{ mb: 2 }}>
              <p className="mb-2">Lakukan konfirmasi untuk melakukan penghapusan pada module absensi, pastikan data yang akan dihapus sesuai.</p>
              <p><span className="font-bold">Tanggal Awal :</span> {getStartDate() == "" ? "" : formatDateToLong(getStartDate())}</p>
              <p><span className="font-bold">Tanggal Akhir :</span> {getEndDate() == "" ? "" : formatDateToLong(getEndDate())}</p>
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={() => {
                setSelectedAttendanceId(undefined)
                setOpenDeleteModal(false)
              }}
              variant="contained" color="info" disabled={isSubmitting}
            >
              Kembali
            </Button>
            <Button
              onClick={() => { handleDelete() }}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Konfirmasi")}
            </Button>
          </Box>
        </Box>
      </Modal>}
    </div>
  )
}
export default AttendanceProjectEmployee;
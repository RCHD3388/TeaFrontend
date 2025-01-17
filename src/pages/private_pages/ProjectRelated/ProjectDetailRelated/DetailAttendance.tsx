import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteAttendanceModuleDocument,
  FindOneAttendanceModuleDocument,
  SubmitAttendanceModuleDocument,
  UpdateAttendanceModuleDocument,
} from "../../../../graphql/project.generated";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper";
import { current } from "@reduxjs/toolkit";
import { formatDateToLong } from "../../../../utils/service/FormatService";
import AttendanceReportModal from "../../../../components/project_related/attendance_related/AttendanceReportModal";
import { modalStyle } from "../../../../theme";

interface UpdateValue {
  description: string;
  start_date: Date;
  end_date: Date;
}

interface DetailAttendanceProps {
  projectId: string;
  moduleId: string;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DetailAttendance: React.FC<DetailAttendanceProps> = ({
  projectId,
  moduleId,
}) => {
  const { data, loading, refetch } = useQuery(FindOneAttendanceModuleDocument, {
    variables: {
      projectId: projectId,
      moduleId: moduleId,
      requiresAuth: true,
    },
  });
  const [employeeCount, setEmployeeCount] = useState(0);
  const [currentAttendance, setCurrentAttendance] = useState<any[]>([]);
  const [updateAttendanceModule] = useMutation(UpdateAttendanceModuleDocument);
  const [submitAttendanceModule] = useMutation(SubmitAttendanceModuleDocument);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UpdateValue>({ defaultValues: { description: "" } });

  const handleUpdate: SubmitHandler<UpdateValue> = async (data) => {
    setIsSubmitting(true);
    try {
      await updateAttendanceModule({
        variables: {
          projectId: projectId,
          moduleId: moduleId,
          updateAttendanceModuleInput: {
            start_date: data.start_date,
            description: data.description,
            attendance: currentAttendance.map((att: any) => {
              return {
                date: att.date,
                attendance_detail: att.attendance_detail.map((det: any) => {
                  return {
                    employee: det.employee._id,
                    check_in: det.check_in,
                    check_out: det.check_out,
                  };
                }),
              };
            }),
          },
          requiresAuth: true,
        },
      });
      dispatch(
        openSnackbar({
          severity: "success",
          message: "Berhasil perbarui modul absensi",
        })
      );
      refetch();
      reset();
    } catch (err: any) {
      let msg = GetBadReqMsg(
        "Gagal perbarui modul absen, silakan coba lagi nanti",
        err
      );
      dispatch(openSnackbar({ severity: "error", message: String(msg) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAttendanceChange = (date: any, employee: any, type: string) => {
    setCurrentAttendance(
      currentAttendance.map((att: any) => {
        if (att.date === date) {
          return {
            ...att,
            attendance_detail: att.attendance_detail.map((det: any) => {
              if (det.employee._id === employee) {
                return {
                  ...det,
                  [type]: !det[type],
                };
              }
              return det;
            }),
          };
        }
        return att;
      })
    );
  };

  const handleSubmitAttendanceModule = async () => {
    setIsSubmitting(true);
    try {
      await submitAttendanceModule({
        variables: {
          projectId: projectId,
          moduleId: moduleId,
          requiresAuth: true,
        },
      });
      dispatch(
        openSnackbar({
          severity: "success",
          message: "Berhasil submit dan selesaikan modul absensi",
        })
      );
      refetch();
      handleCloseModal();
      reset();
    } catch (err: any) {
      let msg = GetBadReqMsg(
        "Gagal subbmit dan selesaikan modul absen, silakan coba lagi nanti",
        err
      );
      dispatch(openSnackbar({ severity: "error", message: String(msg) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        description: data.findOneAttendanceModule.description,
        start_date: data.findOneAttendanceModule.start_date,
        end_date: data.findOneAttendanceModule.end_date,
      });
      setCurrentAttendance(data.findOneAttendanceModule.attendance);
      if (data.findOneAttendanceModule.attendance.length > 0) {
        setEmployeeCount(
          data.findOneAttendanceModule.attendance[0].attendance_detail.length
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  return (
    <div>
      <Box>
        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="start_date"
              control={control}
              rules={{
                required: "tanggal tidak boleh kosong",
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Mulai Modul"
                  sx={{ mb: 1, mr: 0.5 }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.format("YYYY-MM-DD") || null)
                  }
                  slotProps={{
                    textField: {
                      error: !!fieldState.error,
                      helperText: fieldState.error
                        ? fieldState.error.message
                        : null,
                      size: "small",
                      fullWidth: true,
                      color: "secondary",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="end_date"
              control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Akhir Modul"
                  sx={{ mb: 1, ml: 0.5 }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.format("YYYY-MM-DD") || null)
                  }
                  slotProps={{
                    textField: {
                      disabled: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error
                        ? fieldState.error.message
                        : null,
                      size: "small",
                      fullWidth: true,
                      color: "secondary",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="secondary"
              sx={{ width: "100%", mb: 1 }}
              label="Deskripsi"
              size="small"
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
          )}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="overflow-x-auto" style={{ maxHeight: 360 }}>
            <table className="table table-xs table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-base">Pegawai</th>
                  {currentAttendance.map((att: any) => {
                    return (
                      <td className="text-base" key={att.date} align="center">
                        <div className="flex flex-col">
                          <span className="">
                            {formatDateToLong(att.date, true)}
                          </span>
                          <div className="flex justify-evenly">
                            <span>IN</span>
                            <span>OUT</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {currentAttendance.length > 0 &&
                  currentAttendance[0].attendance_detail.map(
                    (att_det: any, index: number) => {
                      return (
                        <tr key={index}>
                          <th
                            className="text-base"
                            style={{ textTransform: "capitalize" }}
                          >
                            {att_det.employee.person.name}
                          </th>
                          {currentAttendance.map((att: any) => {
                            let det = att.attendance_detail.find(
                              (det: any) =>
                                det.employee._id === att_det.employee._id
                            );
                            return (
                              <td key={att._id} align="center">
                                <div className="flex justify-evenly">
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    defaultChecked={det.check_in}
                                    onChange={(e) => {
                                      handleAttendanceChange(
                                        att.date,
                                        det.employee._id,
                                        "check_in"
                                      );
                                    }}
                                  />
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    defaultChecked={det.check_out}
                                    onChange={(e) => {
                                      handleAttendanceChange(
                                        att.date,
                                        det.employee._id,
                                        "check_out"
                                      );
                                    }}
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        )}
      </Box>
      <Box display={"flex"} justifyContent={"end"}>
        {data && data.findOneAttendanceModule.submit_status == false && (
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 1 }}
            onClick={() => {
              handleOpenModal();
            }}
          >
            Submit & Selesaikan
          </Button>
        )}
        {data && (
          <Button
            onClick={handleSubmit(handleUpdate)}
            variant="contained"
            color="secondary"
            sx={{ mr: 1 }}
            disabled={
              isSubmitting || data.findOneAttendanceModule.submit_status == true
            }
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Perbarui"
            )}
          </Button>
        )}
        {!loading && data && (
          <AttendanceReportModal
            attendanceModuleData={JSON.stringify({
              start_date: data.findOneAttendanceModule.start_date,
              end_date: data.findOneAttendanceModule.end_date,
              attendance: data.findOneAttendanceModule.attendance,
              total_employees: employeeCount,
            })}
          />
        )}
      </Box>

      {/* MODAL CONFIRMATION */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={() => {
            modalStyle.width = 700;
            modalStyle.p = 2;
            return modalStyle;
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            <b>KONFIRMASI SUBMIT & PENYELESAIAN MODUL</b>
          </Typography>
          <span className="alert bg-warning p-2">
            Konfirmasi dan pastikan data pada module absensi tersebut telah
            sesuai dan ingin anda submit sebagai penyelesaian absensi
          </span>
          <div className="flex justify-between" style={{ width: "100%" }}>
            <Button
              variant="contained"
              color="info"
              sx={{ mt: 2 }}
              onClick={handleCloseModal}
            >
              Kembali
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => handleSubmitAttendanceModule()}
            >
              Submit & Selesaikan
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailAttendance;

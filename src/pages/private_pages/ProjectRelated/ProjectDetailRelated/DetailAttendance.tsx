import { Box, Button, Checkbox, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { DeleteAttendanceModuleDocument, FindOneAttendanceModuleDocument, UpdateAttendanceModuleDocument } from "../../../../graphql/project.generated";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper";

interface UpdateValue {
  description: string
  start_date: Date
  end_date: Date
}

interface DetailAttendanceProps {
  projectId: string,
  moduleId: string,
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const DetailAttendance: React.FC<DetailAttendanceProps> = ({ projectId, moduleId }) => {
  const { data, loading, refetch } = useQuery(FindOneAttendanceModuleDocument, {
    variables: {
      projectId: projectId,
      moduleId: moduleId,
      requiresAuth: true
    }
  })
  const [currentAttendance, setCurrentAttendance] = useState<any[]>([])
  const [updateAttendanceModule] = useMutation(UpdateAttendanceModuleDocument);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, control, formState: { errors }, reset } = useForm<UpdateValue>({defaultValues: { description: ""}});

  const handleUpdate: SubmitHandler<UpdateValue> = async (data) => {
    setIsSubmitting(true)
    try {
      await updateAttendanceModule({
        variables: {
          projectId: projectId, moduleId: moduleId,
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
                    check_out: det.check_out
                  }
                })
              }
            })
          }, requiresAuth: true
        }
      })
      dispatch(openSnackbar({ severity: "success", message: "Berhasil perbarui modul absensi" }))
      refetch()
      reset()
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal perbarui modul absen, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        description: data.findOneAttendanceModule.description,
        start_date: data.findOneAttendanceModule.start_date,
        end_date: data.findOneAttendanceModule.end_date
      })
      setCurrentAttendance(data.findOneAttendanceModule.attendance)
    }
  }, [data])

  return (
    <div>
      <Box>
        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="start_date" control={control}
              rules={{
                required: 'tanggal tidak boleh kosong',
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Mulai Modul"
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="end_date" control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Akhir Modul"
                  sx={{ mb: 1, ml: 0.5 }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || null)}
                  slotProps={{
                    textField: {
                      disabled: true,
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
        </div>
        <Controller
          name="description" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Deskripsi" size='small' variant="outlined"
            error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
          />)}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <div className="overflow-x-auto" style={{ maxHeight: 360 }}>
          <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th className="text-base">Pegawai</th>
                <td align="center">Tgl 21</td>
                <td align="center">Tgl 22</td>
                <td align="center">Tgl 23</td>
                <td align="center">Tgl 24</td>
                <td align="center">Tgl 25</td>
                <td align="center">Tgl 26</td>
                <td align="center">Tgl 27</td>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="text-base">Richard Rafer Guy</th>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
              </tr>
              <tr>
                <th className="text-base">Yoga Pramana</th>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
                <td align="center"><input type="checkbox" defaultChecked className="checkbox" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"end"}>
        <Button onClick={handleSubmit(handleUpdate)} variant="contained" color="secondary" sx={{ mr: 1 }} disabled={isSubmitting} >
          {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Perbarui")}
        </Button>
        <Button onClick={handleSubmit(handleUpdate)} variant="contained" color="success" disabled={isSubmitting} >
          {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Submit Absensi")}
        </Button>
      </Box>
    </div>
  );
};

export default DetailAttendance;


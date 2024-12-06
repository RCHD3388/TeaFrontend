import * as React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const handleAddProject = (data) => {
  console.log(data);
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
  boxShadow: 24, // Correct capitalization
  borderRadius: "10px",
  height: 550, // Adjusted height to fit the content
};
const { handleSubmit, control } = useForm({
  defaultValues: {
    name: "",
    location: "",
    description: "",
    priority: "",
    status: "",
    target_date: null, // Use `null` for a DateTimePicker-compatible initial value
  },
});
function Addproject() {
  return (
    <div>
      <Box
        component="form"
        sx={style}
        onSubmit={handleSubmit(handleAddProject)}
        gap={1}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tambah Kategori
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Nama Proyek"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              {...field}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Lokasi Proyek"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              id="outlined-basic"
              label="Deskripsi Proyek"
              variant="outlined"
              fullWidth
              {...field}
              sx={{ mb: 1 }}
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select {...field} displayEmpty fullWidth sx={{ mb: 1 }}>
              <MenuItem value="" disabled>
                Pilih Prioritas
              </MenuItem>
              <MenuItem value="Penting">Penting</MenuItem>
              <MenuItem value="Sedang">Sedang</MenuItem>
              <MenuItem value="Biasa">Biasa</MenuItem>
            </Select>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Status"
              variant="outlined"
              fullWidth
              defaultValue=""
              displayEmpty
              sx={{ mb: 1 }}
            >
              <MenuItem value="" disabled>
                Pilih Status
              </MenuItem>
              <MenuItem value="Proses">Proses</MenuItem>
              <MenuItem value="Selesai">Selesai</MenuItem>
            </Select>
          )}
        />
        <Controller
          name="target_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Tanggal Selesai"
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Tambah Project
        </Button>
      </Box>
    </div>
  );
}

export default Addproject;

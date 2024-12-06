import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetProjectsDocument,
  CreateProjectDocument,
} from "../../graphql/project.generated";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import StickyHeadTable, {
  StickyHeadTableColumn,
} from "../../components/global_features/StickyHeadTable";
import { create } from "@mui/material/styles/createTransitions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface RowData {
  name: string;
  created_at: string;
  priority: string;
  status: string;
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: "name", label: "Nama Proyek", minWidth: 50, align: "center" },
  {
    id: "created_at",
    label: "Tanggal Mulai",
    minWidth: 50,
    align: "center",
  },
  { id: "priority", label: "Priority", minWidth: 50, align: "center" },
  { id: "status", label: "Status", minWidth: 50, align: "center" },
  {
    id: "action",
    label: "Detail",
    actionLabel: "Lihat Detail",
    align: "center",
    buttonColor: (row) => "secondary",
  },
];

export default function Projectpage() {
  const { data, loading, refetch } = useQuery(GetProjectsDocument, {
    // variables: { requiresAuth: true },
  });
  const [
    createProject,
    { loading: createProjectLoading, error: createProjectError },
  ] = useMutation(CreateProjectDocument);

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddProject = async (data) => {
    try {
      await createProject({
        variables: {
          data: {
            ...data,
            created_at: new Date().toISOString(), // Example of adding the current timestamp
            finished_at: null,
          },
        },
      });
      refetch(); // Refetch data after creating the project
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  function handleEdit(row: RowData, column: StickyHeadTableColumn<RowData>) {
    refetch();
  }

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

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="flex flex-row">
          <div className="text-4xl font-bold mb-2">Proyek Anda</div>
          {/* main content */}
          <Button
            variant="contained"
            style={
              marginBottom: "1rem",
              backgroundColor: "#56B971",
              marginLeft: "auto",
            }}
            onClick={handleOpen}
          >
            Tambah Project
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
          </Modal>
        </div>
        {!loading && (
          <StickyHeadTable
            columns={columns}
            rows={data?.projects ?? []}
            withIndex={true}
            onActionClick={handleEdit}
          />
        )}
      </div>
    </div>
  );
}

import { useQuery } from "@apollo/client";
import {
  FindAllProjectCostLogsDocument,
  PreviewProjectCostLogReportDocument,
} from "../../../graphql/project.generated";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import StickyHeadTable from "../../../components/global_features/StickyHeadTable";
import { GridColDef } from "@mui/x-data-grid";
import {
  formatCurrency,
  formatDateToLong,
} from "../../../utils/service/FormatService";
import { useNavigate } from "react-router-dom";
import { modalStyle } from "../../../theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { useDispatch } from "react-redux";
interface ProjectCostPageProps {
  projectId: String;
}

interface RowData {
  _id: string;
  title: string;
  description: string;
  date: Date;
  price: number;
  category: string;
  request_cost: String;
}

const ProjectCostPage: React.FC<ProjectCostPageProps> = ({ projectId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null); // Reference to AbortController
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (abortControllerRef.current) {
      // Abort the ongoing request
      abortControllerRef.current.abort();
      setIsFetching(false);
    }
    setOpenModal(false);
    setPdfURL(null);
    setStartDate(null);
    setEndDate(null);
  };

  const { loading, error, data, refetch } = useQuery(
    FindAllProjectCostLogsDocument,
    {
      variables: {
        projectId: projectId,
        requiresAuth: true,
      },
    }
  );

  const { loading: reportLoading, refetch: refetchReport } = useQuery(
    PreviewProjectCostLogReportDocument,
    {
      skip: true,
      onCompleted: (data) => {
        if (data?.previewProjectCostLogReport) {
          const pdfData = `data:application/pdf;base64,${data.previewProjectCostLogReport}`;
          setPdfURL(pdfData);
          setIsFetching(false);
        }
      },
    }
  );

  const getData = () => {
    return data?.findAllProjectCostLogs;
  };

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) return;
    if (startDate.isAfter(endDate)) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: String("tanggal mulai harus lebih kecil dari tanggal akhir"),
        })
      );
      return;
    }
    setIsFetching(true);
    abortControllerRef.current = new AbortController(); // Initialize AbortController

    try {
      await refetchReport({
        projectId: projectId.toString(),
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        context: {
          fetchOptions: {
            signal: abortControllerRef.current.signal, // Pass signal to request
          },
        },
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("Request aborted.");
      } else {
        console.error("Error generating report:", error);
      }
      setIsFetching(false);
    }
  };

  const navigate = useNavigate();

  const columns: GridColDef<RowData>[] = [
    { field: "index", headerName: "No", type: "number", maxWidth: 50 },
    {
      field: "title",
      headerName: "Nama",
      minWidth: 150,
      type: "string",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Deskripsi",
      minWidth: 350,
      type: "string",
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.row.description ? (
            params.row.description
          ) : (
            <span className="text-error">Tanpa deskripsi</span>
          )}
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Kategori",
      minWidth: 200,
      type: "string",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Tanggal",
      minWidth: 150,
      type: "string",
      flex: 1,
      renderCell: (params) => (
        <>{formatDateToLong(params.row.date.toString())}</>
      ),
    },
    {
      field: "price",
      headerName: "Harga",
      minWidth: 150,
      type: "number",
      flex: 1,
      renderCell: (params) => <>{formatCurrency(params.row.price)}</>,
    },
    {
      field: "action",
      headerName: "Detail Request",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          disabled={params.row.request_cost ? false : true}
          onClick={() => {
            navigate(`/appuser/request/cost/${params.row.request_cost}`);
          }}
        >
          Lihat
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <div className="my-2 flex justify-end">
        <Button variant="contained" color="warning" onClick={handleOpenModal}>
          Cetak Laporan
        </Button>
      </div>
      <StickyHeadTable
        columns={columns}
        rows={data ? getData() : []}
        withtoolbar={true}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 1200 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>LAPORAN PENGELUARAN PROYEK</b>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={2} display="flex" gap={2}>
              <DatePicker
                label="Tanggal Mulai"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    color: "secondary",
                    helperText: startDate
                      ? ""
                      : "Pilih tanggal awal untuk laporan",
                  },
                }}
              />
              <DatePicker
                label="Tanggal Akhir"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    color: "secondary",
                    helperText: endDate
                      ? ""
                      : "Pilih tanggal akhir untuk laporan",
                  },
                }}
              />
            </Box>
          </LocalizationProvider>

          {pdfURL && (
            <Box mt={2} height="600px">
              <object
                data={pdfURL}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>PDF tidak dapat ditampilkan</p>
              </object>
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="info"
              sx={{ mr: 1 }}
            >
              Kembali
            </Button>
            <Button
              onClick={handleGenerateReport}
              variant="contained"
              color="primary"
              disabled={!startDate || !endDate || isFetching}
            >
              {isFetching ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Cetak Laporan"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectCostPage;

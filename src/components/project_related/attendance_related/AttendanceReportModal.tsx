import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { modalStyle } from "../../../theme";
import { PreviewReportDocument } from "../../../graphql/project.generated";

interface AttendanceReportModalProps {
  attendanceModuleData: any; // Define the type of attendanceModuleData
}

const AttendanceReportModal: React.FC<AttendanceReportModalProps> = ({
  attendanceModuleData,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  const [fetchPreviewReport] = useLazyQuery(PreviewReportDocument, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.previewReport) {
        // Create Blob URL from Base64 data
        const byteCharacters = atob(data.previewReport);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        setPdfURL(url); // Save URL for <object> tag
        setIsFetching(false);
      }
    },
    onError: () => {
      setIsFetching(false);
    },
  });

  const handleOpenModal = async () => {
    setOpenModal(true);
    setIsFetching(true);

    // Fetch PDF data
    await fetchPreviewReport({
      variables: {
        attendanceModuleData: JSON.stringify(attendanceModuleData),
      },
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPdfURL(null); // Clear PDF URL
  };

  return (
    <>
      <Button onClick={handleOpenModal} variant="contained" color="warning">
        Laporan Absensi
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle, width: 1200 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>LAPORAN ABSENSI</b>
          </Typography>

          {isFetching ? (
            <CircularProgress />
          ) : pdfURL ? (
            <Box mt={2}>
              <object
                data={pdfURL}
                type="application/pdf"
                width="100%"
                height="500px"
              >
                <p>
                  Your browser does not support PDFs. Download the PDF{" "}
                  <a href={pdfURL} target="_blank" rel="noopener noreferrer">
                    here
                  </a>
                  .
                </p>
              </object>
            </Box>
          ) : (
            <Typography color="error">Failed to load the report.</Typography>
          )}

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="contained" color="info">
              Kembali
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AttendanceReportModal;

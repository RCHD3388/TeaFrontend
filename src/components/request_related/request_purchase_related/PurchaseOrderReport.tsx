import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../theme";
import { useState, useEffect } from "react";

interface PurchaseOrderReportModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  pdfData: string | null; // Changed to accept base64 string directly
  
}

const PurchaseOrderReportModal: React.FC<PurchaseOrderReportModalProps> = ({
  openModal,
  handleCloseModal,
  pdfData,
}) => {
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  // Convert base64 to Blob URL when pdfData changes
  useEffect(() => {
    if (pdfData) {
      const byteCharacters = atob(pdfData);
      const byteNumbers = Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfURL(url);

      // Cleanup URL when component unmounts or when pdfData changes
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    }
  }, [pdfData]);

  // Handle modal close and clear the PDF URL
  const handleClose = () => {
    if (pdfURL) {
      URL.revokeObjectURL(pdfURL);
      setPdfURL(null);
    }
    handleCloseModal();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...modalStyle,
          width: 1200,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>CETAK ORDER PEMBELIAN</b>
        </Typography>

        {!pdfData ? (
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
          <Button onClick={handleClose} variant="contained" color="info">
            Kembali
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseOrderReportModal;

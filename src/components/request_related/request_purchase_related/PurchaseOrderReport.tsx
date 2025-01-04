import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { modalStyle } from "../../../theme";


interface PurchaseOrderReportModalProps {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const PurchaseOrderReportModal: React.FC<PurchaseOrderReportModalProps> = ({
  openModal,
  handleOpenModal,
  handleCloseModal,
}) => {

  return (<>{
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 1200
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>CETAK ORDER PEMBELIAN</b></Typography>
      </Box>
    </Modal>
  }</>)
}

export default PurchaseOrderReportModal;
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateMerkDocument, GetAllMerksQuery, GetAllMerksQueryVariables } from "../../graphql/inventory.generated";
import { RootState } from "../../app/store";
import { selectUser } from "../../app/reducers/userSlice";
import { EmployeeRoleType } from "../../types/staticData.types";


interface AddInventoryMaterialProps {
  warehouseId: String | undefined
}

const AddInventoryMaterial: React.FC<AddInventoryMaterialProps> = ({ warehouseId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah Material</Button>

    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => {
        modalStyle.width = 700
        modalStyle.p = 2
        return modalStyle
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2"><b>TAMBAH MATERIAL</b></Typography>
        {/* FIELD START */}
        
      </Box>
    </Modal>
  </>)
}

export default AddInventoryMaterial;
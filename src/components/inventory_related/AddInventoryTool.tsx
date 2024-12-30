import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useRef, useState } from "react";
import { modalStyle } from "../../theme";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { GetAllSkusDocument } from "../../graphql/inventory.generated";
import { AddInventoryToolDocument, GetWarehouseToolsQuery, GetWarehouseToolsQueryVariables } from "../../graphql/inventoryItem.generated";
import { formatCurrency, formatDateToLong } from "../../utils/service/FormatService";
import { GetBadReqMsg } from "../../utils/helpers/ErrorMessageHelper";

interface RowData {
  description: string,
  warranty_number: string,
  warranty_expired_date: Date,
  status: String,
  price: number,
  sku: String
}

interface AddInventoryToolProps {
  warehouseId: String | undefined,
  refetch: (variables?: GetWarehouseToolsQueryVariables) => Promise<ApolloQueryResult<GetWarehouseToolsQuery>>;
}

const AddInventoryTool: React.FC<AddInventoryToolProps> = ({ warehouseId, refetch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const [isConfirmation, setIsConfirmation] = useState(false);

  let { data: skuData, loading: skuLoading, error: skuError, refetch: refetchSku } = useQuery(GetAllSkusDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  const [addInventoryTool] = useMutation(AddInventoryToolDocument);
  const [rows, setRows] = useState<RowData[]>([])

  const handleAddButton = () => {
    
  }
  const handleRemoveButton = (index: number) => {
    if (rows.length == 1) {
      setIsConfirmation(false)
    }
    setRows(rows.filter((_, i) => i !== index))
  }
  const handleSubmitButton = async () => {
    if (isConfirmation == false) {
      setIsConfirmation(true)
    } else if (isConfirmation == true) {
      // confirmed
      try {
        
        await refetch()
        handleCloseModal()
        dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Tool pada Gudang" }))
      } catch (error) {
        let msg = GetBadReqMsg("Gagal tambah tool pada Gudang, silakan coba lagi nanti", error)
        dispatch(openSnackbar({ severity: "error", message: String(msg) }))
      }
    }
  }

  const handleBackButton = () => {
    if (isConfirmation == false) {
      handleCloseModal()
    } else if (isConfirmation == true) {
      setIsConfirmation(false)
    }
  }

  return (<>
    <Button variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
      onClick={async () => {
        handleOpenModal()
      }}
      endIcon={<AddIcon />}
    >Tambah Tool</Button>

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
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}><b>TAMBAH TOOL</b></Typography>
        <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
          <table className="table table-xs border-2">
            <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0 }}>
              <tr>
                <td align="center">Sku</td>
                <td >No. Garansi</td>
                <td >Tgl. Garansi (Exp)</td>
                <td >Status</td>
                <td >Harga</td>
                <td className="text-center">Action</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{row.sku}</td>
                  <td className="text-sm">{row.warranty_number}</td>
                  <td className="text-sm">{formatDateToLong(row.warranty_expired_date.toString())}</td>
                  <td className="text-sm">{row.status}</td>
                  <td className="text-sm">{row.price}</td>
                  <td className="text-sm text-center">
                    <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                      onClick={() => { handleRemoveButton(index) }}
                    >
                      Batalkan
                    </Button>
                  </td>
                </tr>
              )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
            </tbody>
          </table>
        </Box>
        {isConfirmation && <span className="alert bg-warning p-2">
          Konfirmasi dan pastikan data tool yang ingin anda tambahkan pada gudang telah sesuai dan benar
        </span>}
        {/* ADD TOOL FIELD START */}
        {isConfirmation == false &&
          <>
            <span className="font-bold text-base">Silakan tambahkan tool yang diperlukan, dengan data sesuai.</span>
            
          </>
        }
        {/* ADD MATERIAL FIELD END */}

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Button
            onClick={handleBackButton}
            variant="contained"
            color="error"
            disabled={isSubmitting}
          >
            {isConfirmation ? "Kembali" : "Batalkan"}
          </Button>
          <Button
            onClick={() => { handleSubmitButton() }}
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : isConfirmation ? "Tambahkan" : "Konfirmasi"}
          </Button>
        </Box>
      </Box>
    </Modal>
  </>)
}

export default AddInventoryTool;
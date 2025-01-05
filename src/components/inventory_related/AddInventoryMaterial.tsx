import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useMemo, useRef, useState } from "react";
import { modalStyle } from "../../theme";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../app/reducers/snackbarSlice";
import { CreateMerkDocument, GetAllMaterialsDocument, GetAllMerksQuery, GetAllMerksQueryVariables } from "../../graphql/inventory.generated";
import { RootState } from "../../app/store";
import { selectUser } from "../../app/reducers/userSlice";
import { EmployeeRoleType } from "../../types/staticData.types";
import { AddInventoryMaterialDocument, GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables } from "../../graphql/inventoryItem.generated";
import StickyHeadTable from "../global_features/StickyHeadTable";
import { GridColDef } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/service/FormatService";
import { GetBadReqMsg } from "../../utils/helpers/ErrorMessageHelper";

interface RowData {
  _id: string,
  material: string,
  qty: number,
  price: number
}

interface AddInventoryMaterialProps {
  warehouseId: String | undefined,
  refetch: (variables?: GetWarehouseMaterialsQueryVariables) => Promise<ApolloQueryResult<GetWarehouseMaterialsQuery>>;
}

const AddInventoryMaterial: React.FC<AddInventoryMaterialProps> = ({ warehouseId, refetch }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => { setOpenModal(true) }
  const handleCloseModal = () => { setOpenModal(false) }
  const dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  let { data: materialData, loading: materialLoading, error: materialError, refetch: refetchMaterial } = useQuery(GetAllMaterialsDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  const [addInventoryMaterial] = useMutation(AddInventoryMaterialDocument);
  const [materialId, setMaterialId] = useState("")
  const [materialName, setMaterialName] = useState("")
  const [materialInputError, setMaterialInputError] = useState("")
  const qtyRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)
  const [qtyError, setQtyError] = useState("")
  const [rows, setRows] = useState<RowData[]>([])

  const handleAddButton = () => {
    const materialIdValue = materialId ?? ""
    const materialNameValue = materialName ?? ""
    const qtyValue = Number(qtyRef.current?.value ?? 0)
    const priceValue = Number(priceRef.current?.value ?? 0)
    setQtyError("")
    setMaterialInputError("")
    if(materialId == ""){
      setMaterialInputError("Material harus diisi")
      return
    }
    if (qtyValue <= 0) {
      setQtyError("Harus lebih dari 0")
      return
    }

    setRows([...rows, {
      _id: materialIdValue,
      material: materialNameValue,
      qty: qtyValue,
      price: priceValue
    }])

    qtyRef.current!.value = ""
    priceRef.current!.value = ""
  }
  const handleRemoveButton = (_id: string) => {
    const rowToRemove = rows.find(row => row._id === _id)
    if (rows.length == 1) {
      setIsConfirmation(false)
    }
    if (rowToRemove) {
      setRows(rows.filter(row => row !== rowToRemove))
    }
  }
  const handleSubmitButton = async () => {
    if (isConfirmation == false) {
      if(rows.length <= 0) {
        setIsEmpty(true)
      }else {
        setIsConfirmation(true)
      }
    } else if (isConfirmation == true) {
      // confirmed
      try {
        await addInventoryMaterial({
          variables: {
            createMaterialTransactionInput: {
              materials: rows.map(row => ({ material: row._id, qty: row.qty, price: row.price })),
              warehouse_to: warehouseId
            },
            requiresAuth: true,
          }
        })
        await refetch()
        handleCloseModal()
        dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Material pada Gudang" }))
      } catch (error) {
        let msg = GetBadReqMsg("Gagal Tambah Material pada Gudang, silakan coba lagi nanti", error)
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
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}><b>TAMBAH MATERIAL</b></Typography>
        <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
        {isEmpty &&<span className="text-error">Anda perlu memberikan minimal satu material yang akan dimasukan untuk konfirmasi</span>}
          <table className="table table-xs border-2">
            <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0 , zIndex: 1}}>
              <tr>
                <td align="center">Material</td>
                <td align="right">Kuantitas </td>
                <td align="right">Harga</td>
                <td className="text-center">Action</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{row.material}</td>
                  <td className="text-sm" align="right">{row.qty}</td>
                  <td className="text-sm" align="right">{formatCurrency(row.price)}</td>
                  <td className="text-sm text-center">
                    <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                      onClick={() => { handleRemoveButton(row._id) }}
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
          Konfirmasi dan pastikan data material yang ingin anda tambahkan pada gudang telah sesuai dan benar
        </span>}
        {/* ADD MATERIAL FIELD START */}
        {isConfirmation == false &&
          <>
            <span className="font-bold text-base">Silakan tambahkan material yang diperlukan, dengan kuantitas dan harga.</span>
            <Box display="flex" flexDirection={"column"} flexWrap={"wrap"} justifyContent="evenly" alignItems="center" sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                options={materialLoading || !materialData ? [] : materialData.getAllMaterials.map((mt: any) => {
                  return { label: `${mt.name} (${mt.conversion} x ${mt.minimum_unit_measure.name}) - ${mt.merk.name}`, value: mt._id }
                })}
                sx={{ mb: 1, width: "100%" }}
                renderInput={(params) => <TextField
                  error={materialInputError !== ""} helperText={materialInputError}
                  color="secondary" {...params} size="small" label="Material"
                />}
                onChange={
                  (event, newValue: any) => {
                    if (newValue) {
                      setMaterialId(newValue?.value ?? "");
                      setMaterialName(newValue?.label ?? "")
                    }
                  }
                }
              />
              <TextField
                label="Kuantitas" variant="outlined" color="secondary"
                type="number" size="small"
                inputRef={qtyRef}
                sx={{ mb: 1, width: "100%" }}
                helperText={qtyError}
                error={qtyError !== ""}
              />
              <TextField
                label="Harga" color="secondary" type="number"
                variant="outlined" size="small"
                inputRef={priceRef}
                sx={{ mb: 1, width: "100%" }}
              />
              <Button
                onClick={handleAddButton}
                variant="contained"
                color="success"
                sx={{ width: "100%" }}
              >
                Tambah ke List
              </Button>

            </Box>
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

export default AddInventoryMaterial;
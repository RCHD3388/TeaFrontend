import { Autocomplete, Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useMutation, useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { DeleteMerkDocument, DeleteUnitMeasureDocument, GetAllMerksDocument, GetAllUnitMeasuresDocument, UpdateMerkDocument, UpdateUnitMeasureDocument } from "../../../graphql/inventory.generated";
import AddUnitMeasure from "../../../components/inventory_related/AddUnitMeasure";
import AddMerk from "../../../components/inventory_related/AddMerk";
import { modalStyle } from "../../../theme";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";
import { useDispatch } from "react-redux";

enum UnitEditType {
  UNIT_MEASURE = "SATUAN UNIT",
  MERK = "MERK"
}

interface RowData {
  _id: string,
  name: string,
  description: string
}
const mainColumns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: "Nama", minWidth: 50, align: "center" },
  {
    id: 'description', label: "Deskripsi", minWidth: 50, align: "center",
    format(value) {
      return value.length == 0 ? <div className="text-error">Belum ada deskripsi</div> : value
    },
  },
]

export default function InventoryCategoryPage() {
  let { data: dataUMeasure, loading: loadingUMeasure, error: errorUMeasure, refetch: refetchUMeasure } = useQuery(GetAllUnitMeasuresDocument, { variables: { requiresAuth: true } })
  let { data: dataMerk, loading: loadingMerk, error: errorMerk, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const [updateUnitMeasure] = useMutation(UpdateUnitMeasureDocument)
  const [updateMerk] = useMutation(UpdateMerkDocument)
  const [deleteUnitMeasure] = useMutation(DeleteUnitMeasureDocument)
  const [deleteMerk] = useMutation(DeleteMerkDocument)
  const navigate = useNavigate()

  const [nameUnitFilter, setNameUnitFilter] = useState("")
  const [nameMerkFilter, setNameMerkFilter] = useState("")

  const [editType, setEditType] = useState("");
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => { setOpenEditModal(true) }
  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [nameErr, setNameErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");

  const dispatch = useDispatch();

  const handleUnitMeasureEdit = (row: RowData) => {
    setEditType(UnitEditType.UNIT_MEASURE)
    setSelectedRow(row)
    handleOpenEditModal()
  }

  const handleMerkEdit = (row: RowData) => {
    setEditType(UnitEditType.MERK)
    setSelectedRow(row)
    handleOpenEditModal()
  }

  const handleDeleteInventoryCategrory = () => {
    let deleteMethod = editType == UnitEditType.UNIT_MEASURE ? deleteUnitMeasure : deleteMerk;
    if (selectedRow && openEditModal) {
      deleteMethod({ variables: { id: selectedRow._id, requiresAuth: true } })
        .then((response) => {
          dispatch(openSnackbar({ severity: "success", message: `Berhasil Hapus ${editType}` }))
          if (editType == UnitEditType.UNIT_MEASURE) refetchUMeasure()
          if (editType == UnitEditType.MERK) refetchMerk()
          handleCloseEditModal()
        }).catch((err) => {
          dispatch(openSnackbar({ severity: "error", message: `Gagal hapus ${editType}, pastikan nama belum pernah digunakan` }))
        })
    } else {
      dispatch(openSnackbar({ severity: "error", message: `Gagal hapus ${editType}` }))
    }
  }
  const handleEditInventoryCategrory = () => {
    let name = nameRef.current?.value.trim() || ""
    let description = descriptionRef.current?.value.trim() || "";
    setNameErr(""); setDescriptionErr("");
    if (!name) setNameErr("Nama tidak boleh kosong")

    let updateMethod = editType == UnitEditType.UNIT_MEASURE ? updateUnitMeasure : updateMerk

    if (name != "") {
      updateMethod({
        variables: {
          id: selectedRow?._id || "",
          updateInventoryCategoryInput: { name, description },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: `Berhasil Ubah ${editType}` }))
        if (editType == UnitEditType.UNIT_MEASURE) refetchUMeasure()
        if (editType == UnitEditType.MERK) refetchMerk()
        handleCloseEditModal()
      }).catch((err) => {
        dispatch(openSnackbar({ severity: "error", message: `Gagal Ubah ${editType}, pastikan nama belum digunakan` }))
      })
    }
  }

  // COLUMN DETAIL
  const unitMeasureColumns: StickyHeadTableColumn<RowData>[] = [
    ...mainColumns,
    {
      id: 'custom_action', label: 'Action', actionLabel: 'Detail', align: "center",
      renderComponent: (row) => {
        return (
          <Button variant="contained" color="secondary" onClick={() => { handleUnitMeasureEdit(row) }}
            size="small" sx={{ textTransform: "none" }}> Detail / Edit </Button>
        )
      }
    },
  ]

  const merkColumns: StickyHeadTableColumn<RowData>[] = [
    ...mainColumns,
    {
      id: 'custom_action', label: 'Action', actionLabel: 'Detail', align: "center",
      renderComponent: (row) => {
        return (
          <Button variant="contained" color="secondary" onClick={() => { handleMerkEdit(row) }}
            size="small" sx={{ textTransform: "none" }}> Detail / Edit </Button>
        )
      }
    },
  ]
  // COLUMN DETAIL END

  return (
    <div className="p-0" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page merk list */}
        <Box sx={{ mb: 2 }}>
          <div className="text-2xl font-bold mb-1">Daftar Satuan Unit</div>
          <div className="flex justify-end">  </div>

          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"}>
            <AddUnitMeasure refetchUnitMeasure={refetchUMeasure} />
            <TextField
              color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
              onChange={(e) => { setNameUnitFilter(e.target.value) }}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon></SearchIcon>,
                },
              }}
            />
          </Box>

          {!loadingUMeasure && !errorUMeasure &&
            dataUMeasure?.getAllUnitMeasures.length <= 0 ?
            <div className="flex justify-center items-center p-5 bg-accent shadow-md">
              PERUSAHAAN BELUM MEMILIKI DATA SATUAN UNIT
            </div>
            :
            <div>
              <StickyHeadTable
                tableSx={{ height: 150 }}
                columns={unitMeasureColumns}
                rows={dataUMeasure?.getAllUnitMeasures.filter((item: any) => {
                  return item.name.toLowerCase().includes(nameUnitFilter.toLowerCase())
                }) ?? []}
                withIndex={true}
              />
            </div>}
        </Box>

        {/* page merk list */}
        <Box sx={{ mb: 2 }}>
          <div className="text-2xl font-bold mb-1">Daftar Merk</div>
          <div className="flex justify-end">  </div>

          <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-between"}>
            <AddMerk refetchMerk={refetchMerk} />
            <TextField
              color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
              onChange={(e) => { setNameMerkFilter(e.target.value) }}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon></SearchIcon>,
                },
              }}
            />
          </Box>

          {!loadingMerk && !errorMerk &&
            dataMerk?.getAllMerks.length <= 0 ?
            <div className="flex justify-center items-center p-5 bg-accent shadow-md">
              PERUSAHAAN BELUM MEMILIKI DATA MERK
            </div>
            :
            <div>
              <StickyHeadTable
                tableSx={{ height: 150 }}
                columns={merkColumns}
                rows={dataMerk?.getAllMerks.filter((item: any) => {
                  return item.name.toLowerCase().includes(nameMerkFilter.toLowerCase())
                }) ?? []}
                withIndex={true}
              />
            </div>}
        </Box>

        {/* EDIT MODAL INVENTORY CATEGORY */}
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-description" variant="h6" component="h2">
              <b>UBAH {editType}</b>
            </Typography>

            {/* FIELD START */}
            <TextField sx={{ width: "100%", mb: 1 }} label="Name" size='small'
              color="secondary"
              variant="outlined" inputRef={nameRef}
              defaultValue={selectedRow?.name ?? ""}
              error={nameErr != ""}
              helperText={nameErr}
            />
            <TextField sx={{ width: "100%", mb: 1 }} label="Description" size='small'
              color="secondary"
              variant="outlined" inputRef={descriptionRef}
              defaultValue={selectedRow?.description ?? ""}
              error={descriptionErr != ""}
              helperText={descriptionErr}
            />
            {/* FIELD END */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button onClick={handleCloseEditModal}
                variant="contained" color="info" disabled={isSubmitting}
              >
                Kembali
              </Button>
              <Button onClick={() => { handleDeleteInventoryCategrory() }}
                variant="contained" color="error" disabled={isSubmitting}
              >
                Hapus
              </Button>
              <Button onClick={() => { handleEditInventoryCategrory() }}
                variant="contained" color="primary" disabled={isSubmitting}
              >
                {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Ubah")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
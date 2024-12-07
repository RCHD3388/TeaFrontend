import React, { useState } from "react";
import AddEmployeeSkill from "../../../components/emlpoyee_related/AddEmployeeSkill";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useMutation, useQuery } from "@apollo/client";
import { DeleteEmployeeSkillDocument, GetAllSkillDocument, UpdateEmployeeSkillDocument } from "../../../graphql/person.generated";
import { AlertColor, Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { modalStyle } from "../../../theme";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../app/reducers/snackbarSlice";

interface RowData {
  _id: string,
  name: string,
  description: string
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: "name", label: "Name", minWidth: 50, align: "center" },
  { id: "description", label: "Description", align: "center" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Ubah',
    align: "center",
    buttonColor: (row) => 'secondary'
  },
]

const EmployeeSkillData: React.FC = () => {
  let { data, loading, refetch } = useQuery(GetAllSkillDocument, { variables: { requiresAuth: true } })
  const [updateEmployeeSkill] = useMutation(UpdateEmployeeSkillDocument)
  let [deleteEmployeeSkill] = useMutation(DeleteEmployeeSkillDocument)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleOpenEditModal = () => setEditModalOpen(true)
  const handleCloseEditModal = () => setEditModalOpen(false)
  const [selectedRow, setSelectedRow] = React.useState<RowData | null>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const descriptionRef = React.useRef<HTMLInputElement>(null)
  const [nameErr, setNameErr] = useState("")
  const [descriptionErr, setDescriptionErr] = useState("")
  const [deleteErr, setDeleteErr] = useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    setSelectedRow(row);
    handleOpenEditModal();
  }

  const handleEditSkill = () => {
    let name = nameRef.current?.value.trim() || ""
    let description = descriptionRef.current?.value.trim() || "";
    setNameErr(""); setDescriptionErr("");
    if (!name) setNameErr("Nama tidak boleh kosong")
    if (!description) setDescriptionErr("description tidak boleh kosong")
    if (name != "" && description != "") {
      setIsSubmitting(true)
      updateEmployeeSkill({
        variables: {
          id: selectedRow?._id || "",
          updateEmployeeSkillInput: { name, description },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({severity: "success", message: "Berhasil Ubah Skill"}))
        refetch()
        handleCloseEditModal()
      }).catch((err) => {
        dispatch(openSnackbar({severity: "error", message: "Gagal Ubah Skill, Pastikan nama skill belum digunakan"}))
      }).finally(() => {
        setIsSubmitting(false)
      })
    }
  }
  const handleDeleteSkill = () => {
    setDeleteErr("");
    if (selectedRow && editModalOpen) {
      deleteEmployeeSkill({ variables: { id: selectedRow._id, requiresAuth: true } })
        .then((response) => {
          dispatch(openSnackbar({severity: "success", message: "Berhasil Hapus Skill Pegawai"}))
          refetch()
          handleCloseEditModal()
        }).catch((err) => {
          dispatch(openSnackbar({severity: "error", message: "Gagal Hapus Skill Pegawai, pastikan skill belum pernah digunakan"}))
        })
    } else {
      dispatch(openSnackbar({severity: "error", message: "Gagal Hapus Skill Pegawai"}))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold mb-2">Data Skill Pegawai Perusahaan</div>
      <AddEmployeeSkill refetchSkill={refetch} />
      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllSkill ?? []}
          withIndex={true}
          onActionClick={handleActionTable}
        />
      </div>}

      {/* EDIT MODAL */}
      <Modal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <b>UBAH SKILL</b>
          </Typography>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <div className='flex judtify-center items-center mb-3'> {selectedRow?.name ?? ""} </div>
          </Typography>

          {/* FIELD START */}
          <TextField sx={{ width: "100%", mb: 1 }} label="Name" size='small'
            variant="outlined" inputRef={nameRef}
            defaultValue={selectedRow?.name ?? ""}
            error={nameErr != ""}
            helperText={nameErr}
          />
          <TextField sx={{ width: "100%", mb: 1 }} label="Description" size='small'
            variant="outlined" inputRef={descriptionRef}
            defaultValue={selectedRow?.description ?? ""}
            error={descriptionErr != ""}
            helperText={descriptionErr}
          />
          {/* FIELD END */}
          <span className='text-error'>{deleteErr}</span>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={handleCloseEditModal}
              variant="contained" color="info" disabled={loading || isSubmitting}
            >
              Kembali
            </Button>
            <Button onClick={() => { handleDeleteSkill() }}
              variant="contained" color="error" disabled={loading || isSubmitting}
            >
              Hapus
            </Button>
            <Button onClick={() => { handleEditSkill() }}
              variant="contained" color="primary" disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Ubah")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
export default EmployeeSkillData;
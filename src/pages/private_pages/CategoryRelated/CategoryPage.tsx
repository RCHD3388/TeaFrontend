import StickyHeadTable, { StickyHeadTableColumn } from '../../../components/global_features/StickyHeadTable';
import { Alert, AlertColor, Box, Button, CircularProgress, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CreateCategoryDocument, DeleteCategoryDocument, GetCategoriesDocument, UpdateCategoryDocument } from '../../../graphql/category.generated';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { modalStyle } from '../../../theme';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import AddIcon from '@mui/icons-material/Add';

interface CreateCategoryValues {
  name: string
  description: string
  type: string
}

interface RowData {
  _id: string;
  name: string;
  description: string;
  type: string;
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: 'Nama', minWidth: 50, align: "center" },
  { id: 'description', label: 'Deskripsi', minWidth: 200, align: "center" },
  { id: 'type', label: 'Status', minWidth: 50, align: "center" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Ubah',
    align: "center",
    buttonColor: (row) => 'secondary'
  },
];

const typeDropdownValues: string[] = ["project_cost", "priority", "completion_status", "item", "attendance_status", "person_status"]

export default function CategoryPage() {
  let { data, loading, refetch } = useQuery(GetCategoriesDocument, { variables: { requiresAuth: true } });
  let [createCategory] = useMutation(CreateCategoryDocument)
  let [updateCategory] = useMutation(UpdateCategoryDocument)
  let [deleteCategory] = useMutation(DeleteCategoryDocument)
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleCloseAddModal = () => { setOpenAddModal(false) }
  const handleOpenAddModal = () => { setOpenAddModal(true) }
  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const handleOpenEditModal = () => { setOpenEditModal(true) }
  const [selectedRow, setSelectedRow] = React.useState<RowData | null>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const descriptionRef = React.useRef<HTMLInputElement>(null)
  const [nameErr, setNameErr] = useState("")
  const [descriptionErr, setDescriptionErr] = useState("")
  const [deleteErr, setDeleteErr] = useState("")
  const dispatch = useDispatch();

  const { handleSubmit, control, formState: { errors }, reset } = useForm<CreateCategoryValues>({
    defaultValues: {
      name: '',
      description: '',
      type: '',
    },
  });

  const handleAddCategory: SubmitHandler<CreateCategoryValues> = async (data) => {
    setIsSubmitting(true)
    try {
      await createCategory({ variables: { input: { ...data }, requiresAuth: true } })
      await refetch()
      reset()
      handleCloseAddModal();
      dispatch(openSnackbar({ severity: "success", message: "Berhasil Tambah Kategori" }))
    } catch (error) {
      dispatch(openSnackbar({ severity: "error", message: "Gagal Tambah Kategori, pastikan nama belum pernah digunakan" }))
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTableAction = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    setSelectedRow(row)
    handleOpenEditModal();
  }

  const handleEditCategory = () => {
    let name = nameRef.current?.value.trim() || ""
    let description = descriptionRef.current?.value.trim() || "";
    setNameErr(""); setDescriptionErr("");
    if (!name) setNameErr("Nama tidak boleh kosong")
    if (!description) setDescriptionErr("description tidak boleh kosong")

    if (name != "" && description != "") {
      updateCategory({
        variables: {
          id: selectedRow?._id || "",
          updateCategoryInput: { name, description },
          requiresAuth: true
        }
      }).then((response) => {
        dispatch(openSnackbar({ severity: "success", message: "Berhasil Ubah Kategori" }))
        refetch()
        handleCloseEditModal()
      }).catch((err) => {
        dispatch(openSnackbar({ severity: "error", message: "Gagal Ubah Kategori, pastikan nama kategori belum digunakan" }))
      })
    }
  }

  const handleDeleteCategory = () => {
    setDeleteErr("");
    if (selectedRow && openEditModal) {
      deleteCategory({ variables: { id: selectedRow._id, requiresAuth: true } })
        .then((response) => {
          dispatch(openSnackbar({ severity: "success", message: "Berhasil Hapus Kategori" }))
          refetch()
          handleCloseEditModal()
        }).catch((err) => {
          dispatch(openSnackbar({ severity: "error", message: "Gagal hapus Kategori, pastikan kategori belum pernah digunakan" }))
        })
    } else {
      dispatch(openSnackbar({ severity: "error", message: "Gagal hapus Kategori" }))
    }
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Kategori Data Perusahaan</div>
        {/* main content */}
        <div className='flex justify-end'>
          <Button
            variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
            endIcon={<AddIcon/>}
            onClick={() => { handleOpenAddModal() }}
          >Tambah Kategori</Button>
        </div>
        {!loading && <StickyHeadTable
          columns={columns}
          rows={data?.getCategories ?? []}
          withIndex={true}
          onActionClick={handleTableAction}
        />}
      </div>

      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>TAMBAH KATEGORI BARU</b>
          </Typography>
          {/* FIELD START */}
          <Controller
            name="name" control={control} rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="description" control={control} rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "100%", mb: 1 }} label="Description" size='small' variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="type" control={control} rules={{ required: 'Type is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                select sx={{ width: "100%", mb: 1 }}
                label="Type" size="small" variant="outlined"
                error={!!errors.type}
                helperText={errors.type ? errors.type.message : ''}
              >
                {typeDropdownValues.map((value, index) => {
                  return <MenuItem key={index} value={value}>{value}</MenuItem>
                })}
              </TextField>
            )}
          />
          {/* FIELD END */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleCloseAddModal}
              variant="contained"
              color="info"
              disabled={loading || isSubmitting}
            >
              Kembali
            </Button>
            <Button
              onClick={handleSubmit(handleAddCategory)}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Tambah")}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <b>UBAH KATEGORI</b>
          </Typography>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <div className='flex judtify-center items-center mb-3'>
              {selectedRow?.name ?? ""} <div className=' ml-2 badge badge-neutral'>{selectedRow?.type}</div>
            </div>
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
            <Button onClick={() => { handleDeleteCategory() }}
              variant="contained" color="error" disabled={loading || isSubmitting}
            >
              Hapus
            </Button>
            <Button onClick={() => { handleEditCategory() }}
              variant="contained" color="primary" disabled={isSubmitting}
            >
              {isSubmitting ? (<CircularProgress size={24} sx={{ color: "white" }} />) : ("Ubah")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
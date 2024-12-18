import StickyHeadTable from '../../../components/global_features/StickyHeadTable';
import { Alert, AlertColor, Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CreateCategoryDocument, DeleteCategoryDocument, GetCategoriesDocument, UpdateCategoryDocument } from '../../../graphql/category.generated';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { modalStyle } from '../../../theme';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../app/reducers/snackbarSlice';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { CategoryTypeValues } from '../../../types/staticData.types';
import { GridColDef } from '@mui/x-data-grid';

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

const typeDropdownValues: string[] = CategoryTypeValues

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

  const [nameFilter, setNameFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

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

  const handleTableAction = (row: RowData) => {
    setSelectedRow(row)
    handleOpenEditModal();
  }

  const handleEditCategory = () => {
    let name = nameRef.current?.value.trim() || ""
    let description = descriptionRef.current?.value.trim() || "";
    setNameErr(""); setDescriptionErr("");
    if (!name) setNameErr("Nama tidak boleh kosong")

    if (name != "") {
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

  const columns: GridColDef<RowData>[] = [
    { field: 'index', type: 'number', headerName: "No", minWidth: 50 },
    { field: 'name', headerName: 'Nama', minWidth: 150, type: "string", flex: 1 },
    {
      field: 'description', headerName: 'Deskripsi', minWidth: 200, type: "string", flex: 2,
      renderCell: (params) => params.value.length === 0 ? (<div className="text-error">Belum ada deskripsi</div>) : (<>{params.value}</>),
    },
    {
      field: 'type', headerName: 'Type', minWidth: 175, type: "singleSelect", flex: 1,
      valueOptions: CategoryTypeValues,
      valueGetter: (value, row) => row.type,
      renderCell: (params) => (<div className="badge whitespace-nowrap badge-neutral p-3 gap-2"> {params.row.type} </div>),
    },
    {
      field: 'action', headerName: 'Action', minWidth: 125, flex: 1, sortable: false,
      renderCell: (params) => (<Button variant='contained' color='secondary' sx={{ textTransform: 'none' }}
        onClick={() => { handleTableAction(params.row) }}> Detail / Ubah </Button>
      ),
    },
  ];

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Kategori Data Perusahaan</div>
        {/* main content */}
        <div className='flex justify-end'>
          <Button
            variant="contained" color='secondary' style={{ marginBottom: "1rem" }}
            endIcon={<AddIcon />}
            onClick={() => { handleOpenAddModal() }}
          >Tambah Kategori</Button>
        </div>
        
        {!loading && <StickyHeadTable
          columns={columns}
          rows={data?.getCategories || []}
          csvname='category_data'
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
            name="name" control={control} rules={{ required: 'Nama harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Name" size='small' variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="description" control={control}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                sx={{ width: "100%", mb: 1 }} label="Description" size='small' variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="type" control={control} rules={{ required: 'Tipe kategori harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
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
              {selectedRow?.name ?? ""} <div className=' ml-2 badge whitespace-nowrap badge-neutral p-3'>{selectedRow?.type}</div>
            </div>
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
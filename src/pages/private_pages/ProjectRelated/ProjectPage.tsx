import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Modal,
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import {
  GetProjectsDocument,
  CreateProjectDocument,
} from '../../../graphql/project.generated';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import StickyHeadTable, {
  StickyHeadTableColumn,
} from '../../../components/global_features/StickyHeadTable';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { CreateProjectInput } from '../../../types/graphql_types';
import { modalStyle } from '../../../theme';
interface RowData {
  _id: string;
  name: string;
  created_at: string;
  priority: string;
  status: string;
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: 'Nama Proyek', minWidth: 50, align: 'center' },
  { id: 'created_at', label: 'Tanggal Mulai', minWidth: 50, align: 'center' },
  { id: 'priority', label: 'Priority', minWidth: 50, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 50, align: 'center' },
  {
    id: 'action',
    label: 'Detail',
    actionLabel: 'Lihat Detail',
    align: 'center',
    buttonColor: () => 'primary',
  },
];

export default function Projectpage() {
  const { data, loading, error, refetch } = useQuery(GetProjectsDocument);
  const [createProject] = useMutation(CreateProjectDocument);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      location: '',
      description: '',
      priority: '',
      status: '',
      target_date: null,
    },
  });

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddProject = async (formData: CreateProjectInput) => {
    try {
      await createProject({
        variables: {
          data: {
            ...formData,
            created_at: new Date().toISOString(),
            finished_at: null,
          },
        },
      });
      refetch();
      setOpen(false);
      reset();
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const filteredProjects =
    data?.projects?.filter((project: RowData) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const handleViewDetail = (row: RowData) => {
    navigate(`./detail/${row._id}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
        Terjadi kesalahan saat memuat data proyek.
      </div>
    );
  }

  return (
    <div className='p-5' style={{ height: '100%' }}>
      <div className='flex flex-col' style={{ maxHeight: '100%' }}>
        <div className='text-4xl font-bold mb-2'>Proyek Anda</div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              component='form'
              sx={{
                ...modalStyle,
              }}
              onSubmit={handleSubmit(handleAddProject)}>
              <Typography id='modal-modal-title' variant='h6'>
                Tambah Proyek
              </Typography>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Nama Proyek'
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    {...field}
                  />
                )}
              />
              <Controller
                name='location'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Lokasi Proyek'
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    {...field}
                  />
                )}
              />
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='Deskripsi Proyek'
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    {...field}
                  />
                )}
              />
              <Controller
                name='priority'
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty fullWidth sx={{ mb: 2 }}>
                    <MenuItem value='' disabled>
                      Pilih Prioritas
                    </MenuItem>
                    <MenuItem value='Penting'>Penting</MenuItem>
                    <MenuItem value='Sedang'>Sedang</MenuItem>
                    <MenuItem value='Biasa'>Biasa</MenuItem>
                  </Select>
                )}
              />
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty fullWidth sx={{ mb: 2 }}>
                    <MenuItem value='' disabled>
                      Pilih Status
                    </MenuItem>
                    <MenuItem value='Proses'>Proses</MenuItem>
                    <MenuItem value='Selesai'>Selesai</MenuItem>
                  </Select>
                )}
              />
              <Controller
                name='target_date'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label='Tanggal Selesai'
                    renderInput={(params) => (
                      <TextField {...params} fullWidth sx={{ mb: 2 }} />
                    )}
                  />
                )}
              />
              <div className='flex justify-between mt-2'>
                <Button color='error' variant='contained' onClick={handleClose}>
                  Batalkan
                </Button>
                <Button type='submit' variant='contained' color='primary'>
                  Tambah Proyek
                </Button>
              </div>
            </Box>
          </LocalizationProvider>
        </Modal>

        <TextField
          variant='outlined'
          placeholder='Cari Proyek'
          fullWidth
          sx={{ mb: 3 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{ mb: 3, bgcolor: '#56B971' }}
          onClick={handleOpen}>
          Tambah Proyek
        </Button>
        <StickyHeadTable
          columns={columns}
          rows={filteredProjects}
          withIndex={true}
          onActionClick={(row) => handleViewDetail(row)}
        />
      </div>
    </div>
  );
}

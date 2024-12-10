import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  useGetMerksQuery,
  useGetUnitMeasuresQuery,
  useCreateMaterialMutation,
} from '../../../graphql/Inventory.generated'; // Adjust the path to where your queries are defined
import { modalStyle } from '../../../theme';

interface MaterialModalProps {
  open: boolean;
  onClose: () => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ open, onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      merk: '',
      deskripsi: '',
      kategori: '',
      satuanUnit: '',
      satuanMinimumUnit: '',
      konversi: '',
    },
  });

  const {
    data: merksData,
    loading: merksLoading,
    error: merksError,
  } = useGetMerksQuery();
  const {
    data: unitMeasuresData,
    loading: unitMeasuresLoading,
    error: unitMeasuresError,
  } = useGetUnitMeasuresQuery();

  const [createMaterialMutation, { loading: createLoading }] =
    useCreateMaterialMutation();

  const handleCloseModal = () => {
    reset(); // Reset form when modal closes
    onClose();
  };

  const onSubmit = async (data: any) => {
    try {
      await createMaterialMutation({
        variables: {
          data: {
            name: data.name,
            merk: data.merk,
            description: data.deskripsi,
            unit_measure: data.satuanUnit,
            minimum_unit_measure: data.satuanMinimumUnit,
            conversion: parseFloat(data.konversi),
            item_category: data.kategori,
          },
        },
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error creating material:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={modalStyle}>
        <h1 className='text-2xl font-bold mb-4'>Tambah Jenis Material</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Nama harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Name'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Merk Field */}
          <Controller
            name='merk'
            control={control}
            rules={{ required: 'Merk harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Merk'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.merk}
                helperText={errors.merk?.message}
                disabled={merksLoading || merksError}>
                {merksLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : merksError ? (
                  <MenuItem disabled>Error loading options</MenuItem>
                ) : (
                  merksData?.merks.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Deskripsi Field */}
          <Controller
            name='deskripsi'
            control={control}
            rules={{ required: 'Deskripsi harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Deskripsi'
                variant='outlined'
                margin='normal'
                multiline
                fullWidth
                error={!!errors.deskripsi}
                helperText={errors.deskripsi?.message}
              />
            )}
          />

          {/* Kategori Field */}
          <Controller
            name='kategori'
            control={control}
            rules={{ required: 'Kategori harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Kategori'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.kategori}
                helperText={errors.kategori?.message}
              />
            )}
          />

          {/* Satuan Unit Field */}
          <Controller
            name='satuanUnit'
            control={control}
            rules={{ required: 'Satuan Unit harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Satuan Unit'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.satuanUnit}
                helperText={errors.satuanUnit?.message}
                disabled={unitMeasuresLoading || unitMeasuresError}>
                {unitMeasuresLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : unitMeasuresError ? (
                  <MenuItem disabled>Error loading options</MenuItem>
                ) : (
                  unitMeasuresData?.unitMeasures.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Satuan Minimum Unit Field */}
          <Controller
            name='satuanMinimumUnit'
            control={control}
            rules={{ required: 'Satuan Minimum Unit harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label='Satuan Minimum Unit'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.satuanMinimumUnit}
                helperText={errors.satuanMinimumUnit?.message}
                disabled={unitMeasuresLoading || unitMeasuresError}>
                {unitMeasuresLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : unitMeasuresError ? (
                  <MenuItem disabled>Error loading options</MenuItem>
                ) : (
                  unitMeasuresData?.unitMeasures.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Konversi Field */}
          <Controller
            name='konversi'
            control={control}
            rules={{ required: 'Konversi harus diisi' }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Konversi'
                variant='outlined'
                margin='normal'
                fullWidth
                error={!!errors.konversi}
                helperText={errors.konversi?.message}
              />
            )}
          />

          {/* Buttons */}
          <div className='flex justify-between mt-4'>
            <Button
              variant='contained'
              color='error'
              onClick={handleCloseModal}
              sx={{ width: '48%' }}>
              Batalkan
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='success'
              sx={{ width: '48%' }}
              disabled={createLoading}>
              {createLoading ? <CircularProgress size={24} /> : 'Tambahkan'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default MaterialModal;

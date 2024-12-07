import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Modal,
  Typography,
} from '@mui/material';
import { modalStyle } from '../../../theme';

interface DetailSectionProps {
  data: {
    name: string;
    location: string;
    description: string;
    status: string;
    priority: string;
    created_at: string;
    target_date: string;
    finished_at: string;
  };
}

const DetailSection: React.FC<DetailSectionProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: props.data,
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <div className='text-4xl font-bold mb-2'>Detail Project</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Description'
              variant='outlined'
              fullWidth
              margin='normal'
              multiline={true}
            />
          )}
        />
        <Controller
          name='location'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Location'
              variant='outlined'
              fullWidth
              margin='normal'
            />
          )}
        />
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  fullWidth
                  size='small'
                  sx={{ mb: 2 }}
                  label='Status'>
                  <MenuItem value='' disabled>
                    Pilih Status
                  </MenuItem>
                  <MenuItem value='Proses'>Proses</MenuItem>
                  <MenuItem value='Selesai'>Selesai</MenuItem>
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name='priority'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  fullWidth
                  size='small'
                  sx={{ mb: 2 }}
                  label='Priority'>
                  <MenuItem value='' disabled>
                    Pilih Prioritas
                  </MenuItem>
                  <MenuItem value='Penting'>Penting</MenuItem>
                  <MenuItem value='Sedang'>Sedang</MenuItem>
                  <MenuItem value='Biasa'>Biasa</MenuItem>
                </Select>
              )}
            />
          </div>
        </div>

        <div>
          <Controller
            name='created_at'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Created At'
                variant='outlined'
                size='small'
                fullWidth
                margin='normal'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='target_date'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Target Date'
                variant='outlined'
                size='small'
                fullWidth
                margin='normal'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='finished_at'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size='small'
                label='Finished At'
                variant='outlined'
                fullWidth
                margin='normal'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className='flex mt-4 justify-between'>
          <Button
            variant='contained'
            color='error'
            sx={{ width: '200px' }}
            onClick={handleOpen}>
            Request Closing
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ width: '200px' }}
            onClick={() => console.log(props.data)}>
            Save
          </Button>
        </div>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={modalStyle}>
          <h1 className='text-2xl font-bold'>Request Closing</h1>
          <h3 className='mt-4'>Deskripsi Penutupan</h3>
          <TextField
            id='outlined-basic'
            label='Description'
            variant='outlined'
            sx={{ width: '800px' }}
            margin='normal'
            multiline={true}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default DetailSection;

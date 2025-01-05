import React from 'react'
import { Autocomplete, Box, Button, InputAdornment, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';

interface PurchasingMaterialInputProps {
  materialLoading: boolean,
  materialData: any,
  handleAddPurchasingMaterial: (material: any, quantity: number, price: any) => void
}

interface InputDataValues {
  material: string,
  qty: number,
  price: number
}

const PurchasingMaterialInput: React.FC<PurchasingMaterialInputProps> = ({ materialData, materialLoading, handleAddPurchasingMaterial }) => {

  const { handleSubmit, control, formState: { errors }, reset } = useForm<InputDataValues>({
    defaultValues: {
      material: '',
      qty: 0,
      price: 0
    },
  });

  const handleAddMaterial = (data: InputDataValues) => {
    handleAddPurchasingMaterial(data.material, data.qty, data.price);
  }

  return (
    <Box>
      <Controller
        name="material" control={control} rules={{ required: 'Barang tidak boleh kosong' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            disablePortal

            options={materialLoading || !materialData ? [] : materialData.getAllMaterials.map((mt: any) => {
              return { label: `${mt.name} (${mt.conversion} x ${mt.minimum_unit_measure.name}) - ${mt.merk.name}`, value: mt._id }
            })}
            sx={{ width: "100%", mb: 1 }}
            onChange={(_, data) => onChange(data)}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params} label="Barang"
                error={!!error} helperText={error ? error.message : null}
                color="secondary" size="small"
              />
            )}
          />
        )}
      />
      <div className='flex justify-end'>
        <Controller
          name="qty" control={control} rules={{
            required: 'Kuantitas tidak boleh kosong',
            validate: (value) => value > 0 || 'Kuantitas harus lebih dari 0'
          }}
          render={({ field }) => (<TextField
            type="number"
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1, mr: 0.5 }} label="Kuantitas" size='small' variant="outlined"
            error={!!errors.qty} helperText={errors.qty ? errors.qty.message : ''}
          />)}
        />
        <Controller
          name="price" control={control} rules={{
            required: 'Harga tidak boleh kosong',
            validate: (value) => value > 0 || 'Harga harus lebih dari 0'
          }}
          render={({ field }) => (<TextField
            type="number"
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Harga" size='small' variant="outlined"
            error={!!errors.price} helperText={errors.price ? errors.price.message : ''}
          />)}
        />
      </div>
      <Button
        onClick={handleSubmit(handleAddMaterial)}
        variant="contained"
        color="success"
        sx={{ width: "100%" }}
      >
        Tambah ke List
      </Button>
    </Box>
  )
}

export default PurchasingMaterialInput

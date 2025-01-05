import React from 'react'
import { Autocomplete, Box, Button, InputAdornment, MenuItem, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import { CategoryType } from '../../../types/staticData.types';
import { GetCategoriesDocument } from '../../../graphql/category.generated';
import { useQuery } from '@apollo/client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface PurchasingToolInputProps {
  skuLoading: boolean,
  skuData: any,
  skuError: any,
  handleAddPurchasingTool: (data: ToolDetailPurchasingInput) => void
}

export interface ToolDetailPurchasingInput {
  description: string,
  warranty_number: string,
  warranty_expired_date: Date,
  status: string,
  status_name: string
  price: number,
  sku: string
  sku_name: string
}

const initialInputState = {
  description: "",
  warranty_number: "",
  status: "",
  price: 0,
  sku: ""
}

const PurchasingToolInput: React.FC<PurchasingToolInputProps> = ({ skuLoading, skuData, skuError, handleAddPurchasingTool }) => {
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.TOOL_STATUS] },
      requiresAuth: true
    }
  })
  const { handleSubmit, control, formState: { errors }, reset } = useForm<ToolDetailPurchasingInput>({
    defaultValues: initialInputState,
  });

  const handleAddTool = (data: ToolDetailPurchasingInput) => {
    data.sku_name = skuData?.getAllSkus.find((sku: any) => sku._id == data.sku)?.name || "";
    handleAddPurchasingTool(data);
  }

  return (
    <Box>
      <>
        <Controller
          name="description" control={control}
          render={({ field }) => (<TextField
            {...field} color="secondary"
            sx={{ width: "100%", mb: 1 }} label="Description" size='small' variant="outlined"
            error={!!errors.description} helperText={errors.description ? errors.description.message : ''}
          />)}
        />
        <div className="flex">
          <Controller
            name="sku" control={control} rules={{ required: 'Skill tidak boleh kosong' }}
            render={({ field }) => (
              <TextField
                {...field} color="secondary"
                select sx={{ width: "100%", mb: 1, mr: 0.5 }} label="Sku" size="small" variant="outlined"
                error={!!errors.sku}
                helperText={errors.sku ? errors.sku.message : ''}
              >
                {!skuLoading && !skuError && skuData.getAllSkus.map((value: any, index: number) => {
                  return <MenuItem key={index} value={value._id}>
                    <div>{value.name} - {value.merk.name}</div>
                  </MenuItem>
                })}
              </TextField>
            )}
          />
          <Controller
            name="price" control={control} rules={{
              required: 'Harga tidak boleh kosong',
              validate: (value) => value >= 0 || 'Harga tidak valid'
            }}
            render={({ field }) => (<TextField
              type="number"
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1, ml: 0.5 }} label="Harga" size='small' variant="outlined"
              error={!!errors.price} helperText={errors.price ? errors.price.message : ''}
              InputProps={{ startAdornment: (<InputAdornment position="start">Rp.</InputAdornment>), }}
            />)}
          />
        </div>
        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="warranty_expired_date" control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Tgl. Garansi (Exp)"
                  sx={{ mb: 1, mr: 0.5 }}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.format('YYYY-MM-DD') || null)}
                  slotProps={{
                    textField: {
                      error: !!fieldState.error,
                      helperText: fieldState.error ? fieldState.error.message : null,
                      size: 'small',
                      fullWidth: true,
                      color: "secondary"
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <Controller
            name="warranty_number" control={control}
            render={({ field }) => (<TextField
              {...field} color="secondary"
              sx={{ width: "100%", mb: 1, ml: 0.5 }} label="No. Garansi" size='small' variant="outlined"
              error={!!errors.warranty_number} helperText={errors.warranty_number ? errors.warranty_number.message : ''}
            />)}
          />
        </div>

        <Controller
          name="status" control={control} rules={{ required: 'Status alat tidak boleh kosong' }}
          render={({ field }) => (
            <TextField
              {...field} color="secondary"
              select sx={{ width: "100%", mb: 1 }} label="Status Alat" size="small" variant="outlined"
              error={!!errors.status}
              helperText={errors.status ? errors.status.message : ''}
            >
              {!categoryLoading && !categoryError && categoryData.getCategories.map((value: any, index: number) => {
                return <MenuItem key={index} value={value._id}>
                  <div className="badge whitespace-nowrap p-3 gap-2">{value.name}</div>
                </MenuItem>
              })}
            </TextField>
          )}
        />
        <Button variant="contained" color="success" onClick={handleSubmit(handleAddTool)} style={{ width: "100%" }}>Tambah ke List</Button>
      </>
    </Box>
  )
}

export default PurchasingToolInput

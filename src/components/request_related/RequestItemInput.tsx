import { useQuery } from "@apollo/client"
import { itemDetail, RequestItem_ItemType, RequestItem_ItemTypeValues } from "../../types/staticData.types"
import { GetAllMaterialsDocument, GetAllSkusDocument } from "../../graphql/inventory.generated"
import { Autocomplete, Box, Button, InputAdornment, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"

interface RequestItemInputProps {
  itemDetail: itemDetail[],
  setItemDetail: React.Dispatch<React.SetStateAction<itemDetail[]>>,
  isEmpty: boolean
}

const initialValues = {
  item: "",
  quantity: 0,
  item_type: RequestItem_ItemTypeValues[0],
}

const RequestItemInput: React.FC<RequestItemInputProps> = ({ itemDetail, setItemDetail, isEmpty }) => {
  let { data: materialData, loading: materialLoading, error: materialError, refetch: materialRefetch } = useQuery(GetAllMaterialsDocument, { variables: { requiresAuth: true } })
  let { data: skuData, loading: skuLoading, error: skuError, refetch: skuRefetch } = useQuery(GetAllSkusDocument, { variables: { requiresAuth: true } })
  const { handleSubmit, control, watch, setValue, formState: { errors }, reset } = useForm<itemDetail>({
    defaultValues: initialValues,
  });

  const getItemOptions = (type: any) => {
    if (type === RequestItem_ItemType.MATERIAL) {
      return materialLoading || !materialData ? [] : materialData.getAllMaterials.map((mt: any) => {
        return { label: `${mt.name} (${mt.conversion} x ${mt.minimum_unit_measure.name}) - ${mt.merk.name}`, value: mt._id }
      })
    } else if (type === RequestItem_ItemType.TOOL) {
      return skuLoading || !skuData ? [] : skuData.getAllSkus.map((sk: any) => {
        return { label: `${sk.name} - ${sk.merk.name}`, value: sk._id }
      })
    }

    return []
  }

  const handleAdd = (data: itemDetail) => {
    let newData: itemDetail = {
      item: (data.item as any).value,
      quantity: data.quantity,
      item_type: data.item_type,
      item_name: (data.item as any).label
    };
    itemDetail.push(newData);
    setItemDetail([...itemDetail]);
    reset(initialValues);
  }

  const handleRemoveButton = (index: number) => {
    const updatedItemDetail = [...itemDetail];
    updatedItemDetail.splice(index, 1);
    setItemDetail(updatedItemDetail);
  }

  const handleQuantityChange = (index: number, value: number) => {
    const updatedItemDetail = [...itemDetail];
    updatedItemDetail[index].quantity = value;
    setItemDetail(updatedItemDetail);
  }

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {/* FIELD START */}
      <Controller
        name="item" control={control} rules={{ required: 'Barang tidak boleh kosong' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            disablePortal

            options={getItemOptions(watch("item_type"))}

            onChange={(_, data) => onChange(data)}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params} label="Barang" sx={{ width: "100%", mb: 1 }}
                error={!!error} helperText={error ? error.message : null}
                color="secondary" size="small"
              />
            )}
          />
        )}
      />
      <div className="flex">
        <Controller
          name="item_type" control={control} rules={{ required: 'Tipe barang tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal value={value} options={RequestItem_ItemTypeValues}
              onChange={(_, data) => {
                setValue("item", "");
                onChange(data)
              }}
              sx={{ width: "100%", mr: 0.5 }}
              renderInput={(params) => (
                <TextField
                  {...params} label="Tipe Barang"
                  error={!!error} helperText={error ? error.message : null}
                  color="secondary" size="small"
                />
              )}
            />
          )}
        />
        <Controller
          name="quantity" control={control} rules={{
            required: 'Kuantitas tidak boleh kosong',
            validate: (value) => value > 0 || 'Kuantitas harus minimal 0'
          }}
          render={({ field }) => (<TextField
            type="number"
            {...field} color="secondary"
            sx={{ width: "100%", ml: 0.5 }} label="Kuantitas" size='small' variant="outlined"
            error={!!errors.quantity} helperText={errors.quantity ? errors.quantity.message : ''}
          />)}
        />
      </div>
      <div className="flex justify-end">
        <Button variant="contained" color="secondary" sx={{ my: 1 }} onClick={handleSubmit(handleAdd)} >Tambah</Button>
      </div>
      {/* FIELD END */}

      {/* TABLE */}
      <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
        {isEmpty && <span className="text-error">Anda perlu memberikan minimal satu barang yang akan dimasukan untuk submit </span>}
        <table className="table table-xs border-2">
          <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0 }}>
            <tr>
              <td align="center">Barang</td>
              <td align="center">Kuantitas </td>
              <td align="center">Tipe Barang</td>
              <td className="text-center">Action</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemDetail.length > 0 ? itemDetail.map((item, index) => (
              <tr key={index}>
                <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.item_name}</td>
                <td className="text-sm" align="center"><TextField type="Number" value={item.quantity} size="small" sx={{ width: 100 }}
                  onChange={(e) => { if(Number(e.target.value) > 0) handleQuantityChange(index, Number(e.target.value)) }}
                ></TextField></td>
                <td className="text-sm" align="center">{item.item_type}</td>
                <td className="text-sm text-center">
                  <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                    onClick={() => { handleRemoveButton(index) }}
                  >
                    Batalkan
                  </Button>
                </td>
              </tr>
            )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak ada data dalam tabel. Silakan tambahkan material sebelum submit.</td></tr>}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}
export default RequestItemInput

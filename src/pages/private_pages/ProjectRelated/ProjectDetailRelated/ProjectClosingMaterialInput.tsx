import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client"
import { GetAllMaterialsDocument, GetAllSkusDocument, GetAllWarehousesDocument } from "../../../../graphql/inventory.generated"
import { Autocomplete, Box, Button, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { itemDetail, RequestItem_ItemType, RequestItem_ItemTypeValues } from "../../../../types/staticData.types"
import { modalStyle } from "../../../../theme"
import { UpdateProjectClosingDocument } from "../../../../graphql/project_closing.generated"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../../../../app/reducers/snackbarSlice"
import { GetBadReqMsg } from "../../../../utils/helpers/ErrorMessageHelper"
import { FindAllProjectsQuery, FindProjectByIdQueryVariables } from "../../../../graphql/project.generated"

interface ProjectClosingMaterialInputProps {
  itemDetail: itemDetail[],
  setItemDetail: React.Dispatch<React.SetStateAction<itemDetail[]>>,
  refetchProject: (variables?: FindProjectByIdQueryVariables) => Promise<ApolloQueryResult<FindAllProjectsQuery>>,
  projectName: string,
  projectId: string
}

const initialValues = {
  item: "",
  quantity: 0,
  item_type: RequestItem_ItemTypeValues[0],
}

const ProjectClosingMaterialInput: React.FC<ProjectClosingMaterialInputProps> = ({ itemDetail, setItemDetail, refetchProject, projectName, projectId }) => {
  let { data: materialData, loading: materialLoading, error: materialError, refetch: materialRefetch } = useQuery(GetAllMaterialsDocument, { variables: { requiresAuth: true } })
  let { data: allWHData, loading: allWHLoading, error: allWHError, refetch: allWHRefetch } = useQuery(GetAllWarehousesDocument, {
    variables: {
      filter: { status: true },
      requiresAuth: true
    }
  })
  const { handleSubmit, control, watch, setValue, formState: { errors }, reset } = useForm<itemDetail>({
    defaultValues: initialValues,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => { setOpenModal(false); }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => {
    setWarehouseToError("")
    if (!warehouseTo) {
      setWarehouseToError("Warehouse tujuan perpindahan barang sisa harus diisi")
      return;
    }
    setOpenModal(true);
  }


  const [warehouseTo, setWarehouseTo] = useState<any>(null);
  const [warehouseToError, setWarehouseToError] = useState("");

  const [updateProjectClosing] = useMutation(UpdateProjectClosingDocument)
  const dispatch = useDispatch();

  const getItemOptions = (type: any) => {
    return materialLoading || !materialData ? [] : materialData.getAllMaterials.map((mt: any) => {
      return { label: `${mt.name} (${mt.conversion} x ${mt.minimum_unit_measure.name}) - ${mt.merk.name}`, value: mt._id }
    })
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

  const handleSubmitConfirm = async () => {
    setIsSubmitting(true)
    try {
      await updateProjectClosing({
        variables: {
          updateProjectClosingInput: {
            material_left: itemDetail.map((item) => { return { material: item.item, qty: Number(item.quantity) } }),
            warehouse_to: warehouseTo.value || ""
          },
          id: projectId,
          requiresAuth: true
        },
      })
      await refetchProject()
      handleCloseModal()
      dispatch(openSnackbar({ severity: "success", message: "Berhasil memberikan data sisa material" }))
    } catch (err: any) {
      let msg = GetBadReqMsg("Gagal memberikan data sisa material, silakan coba lagi nanti", err)
      dispatch(openSnackbar({ severity: "error", message: String(msg) }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>BERIKAN DATA BARANG SISA PADA PROYEK ANDA</Typography>
      {/* FIELD START */}
      <div className="flex">
        <Controller
          name="item" control={control} rules={{ required: 'Barang tidak boleh kosong' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              disablePortal

              options={getItemOptions(watch("item_type"))}
              sx={{ width: "100%", mr: 0.5 }}
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
      <Autocomplete
        disablePortal
        options={allWHLoading || !allWHData ? [] : allWHData.getAllWarehouses.map((wh: any) => { return { label: `${wh.name} ( ${wh.address} }`, value: wh._id } })}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          
          setWarehouseTo(newValue);
        }}
        value={warehouseTo}
        renderInput={(params) => (
          <TextField
            {...params} label="Gudang Tujuan" sx={{ width: "100%", mb: 1 }}
            error={warehouseToError !== ""} helperText={warehouseToError}
            color="secondary" size="small"
          />
        )}
      />
      {/* FIELD END */}

      {/* TABLE */}
      <Box overflow={"auto"} maxHeight={300} sx={{ mb: 3 }}>
        <table className="table table-xs border-2">
          <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <td align="center">Barang</td>
              <td align="center">Kuantitas </td>
              <td className="text-center">Action</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {itemDetail.length > 0 ? itemDetail.map((item, index) => (
              <tr key={index}>
                <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.item_name}</td>
                <td className="text-sm" align="center"><TextField type="Number" value={item.quantity} size="small" sx={{ width: 100 }}
                  onChange={(e) => { if (Number(e.target.value) > 0) handleQuantityChange(index, Number(e.target.value)) }}
                ></TextField></td>
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
        <div className="flex justify-end mt-2">
          <Button variant="contained" color="success" onClick={() => {
            handleOpenModal()
          }}>Submit Material Sisa</Button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={() => {
              modalStyle.width = 800
              return modalStyle
            }}>
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}><b>Konfirmasi data sisa material</b></Typography>
              <span className="alert bg-warning p-2 text-base my-3">
                <p>Konfirmasi dan pastikan data sisa material untuk proyek <b>{projectName}</b> telah sesuai</p>
              </span>
              <Typography variant="h6" sx={{ textTransform: "capitalize", mb: 1 }}><b>Warehouse Tujuan: </b>{warehouseTo?.label || ""}</Typography>
              <table className="table table-xs border-2">
                <thead className="bg-secondary text-white font-normal text-base" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <tr>
                    <td align="center">Barang</td>
                    <td align="center">Kuantitas </td>
                    <td className="text-center">Action</td>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itemDetail.length > 0 ? itemDetail.map((item, index) => (
                    <tr key={index}>
                      <td className="text-sm" align="center" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.item_name}</td>
                      <td className="text-sm" align="center"><TextField type="Number" value={item.quantity} size="small" sx={{ width: 100 }}
                        onChange={(e) => { if (Number(e.target.value) > 0) handleQuantityChange(index, Number(e.target.value)) }}
                      ></TextField></td>
                      <td className="text-sm text-center">
                        <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}
                          onClick={() => { handleRemoveButton(index) }}
                        >
                          Batalkan
                        </Button>
                      </td>
                    </tr>
                  )) : <tr className="p-4"><td colSpan={4} className="p-4 text-sm" style={{ textAlign: "center" }}>Tidak terdapat material sisa.</td></tr>}
                </tbody>
              </table>
              <div className="flex justify-between mt-2">
                <Button variant="contained" color="error" onClick={() => {handleCloseModal()}} >Kembali</Button>
                <Button variant="contained" color="success" onClick={() => {handleSubmitConfirm()}}>Konfirmasi & Submit</Button>
              </div>
            </Box>
          </Modal>
        </div>
      </Box>
    </Box>
  )
}
export default ProjectClosingMaterialInput

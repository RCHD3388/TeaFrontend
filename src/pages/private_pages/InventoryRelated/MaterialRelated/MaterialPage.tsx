import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { GetAllMaterialsDocument, GetAllMerksDocument, GetAllSkusDocument } from "../../../../graphql/inventory.generated";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { CategoryType } from "../../../../types/staticData.types";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../../components/global_features/StickyHeadTable";
import AddSku from "../../../../components/inventory_related/AddSku";
import AddMaterial from "../../../../components/inventory_related/AddMaterial";
import EditMaterialModal from "../../../../components/inventory_related/EditMaterialModal";


interface RowData {
  _id: string
  id: string
  name: string
  description: string
  status: string
  conversion: number
  merk: {
    _id: string
    name: string
  }
  unit_measure: {
    _id: string
    name: string
  }
  minimum_unit_measure: {
    _id: string
    name: string
  }
  item_category: {
    _id: string
    name: string
  }
}

const MaterialPage: React.FC = () => {

  let { data, loading, refetch } = useQuery(GetAllMaterialsDocument, { variables: { requiresAuth: true } })
  const { data: merkData, loading: merkLoading, error: merkError, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.ITEM] },
      requiresAuth: true
    }
  })
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("")
  const [merkFilter, setMerkFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => { setOpenEditModal(true) }
  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'id', label: "ID", minWidth: 50, align: "center", format: (value) => String(value) },
    { id: 'name', label: "Nama", minWidth: 50, align: "center", format: (value) => String(value) },
    {
      id: 'status', label: "Status", minWidth: 50, align: "center",
      renderComponent: (row) => {
        if (row.status === "Active") return (<div className="badge badge-success text-white whitespace-nowrap p-3 gap-2">{row.status}</div>)
        if (row.status === "Inactive") return (<div className="badge badge-warning whitespace-nowrap p-3 gap-2">{row.status}</div>)
      },
    },
    { id: 'conversion', label: "Konversi", minWidth: 50, align: "center" },
    { id: 'unit_measure', label: "Satuan", minWidth: 50, align: "center", format: (value) => value.name },
    { id: 'minimum_unit_measure', label: "Satuan Minimum", minWidth: 50, align: "center", format: (value) => value.name },
    {
      id: 'merk', label: "Merk", minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{row.merk.name}</div>) },
    },
    {
      id: 'item_category', label: "Kategori", minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{row.item_category.name}</div>) },
    },
    {
      id: 'action', label: 'Action', actionLabel: 'Detail/Edit', align: "center", buttonColor: (row) => 'secondary',
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    setSelectedRow(row)
    handleOpenEditModal()
  }

  useEffect(() => {
    if (merkData) {
      refetchMerk()
    }
  }, [merkData, refetchMerk])

  useEffect(() => {
    if (categoryData) {
      refetchCategory()
    }
  }, [categoryData, refetchCategory])

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold mb-1">Daftar Material</div>
      <div className="flex justify-end">
        <AddMaterial refetchMaterials={refetch} />
      </div>

      <Box display={"flex"} flexWrap={"wrap"}>
        <TextField
          color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
          onChange={(e) => { setNameFilter(e.target.value) }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon></SearchIcon>,
            },
          }}
        />
        <Autocomplete
          disablePortal
          options={merkLoading ? [] : merkData.getAllMerks.map((mk: any) => { return mk.name })}
          sx={{ width: 300, mb: 1, mr: 1 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setMerkFilter(newValue || "")
          }}
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Merk Material" />}
        />
        <Autocomplete
          disablePortal
          options={categoryLoading ? [] : categoryData.getCategories.map((ct: any) => { return ct.name })}
          sx={{ width: 300, mb: 1, mr: 1 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setCategoryFilter(newValue || "")
          }}
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Kategori Material" />}
        />
      </Box>

      {!loading && <div>
        <StickyHeadTable
          columns={columns}
          rows={data?.getAllMaterials.filter((matr: any) => {
            let condition = matr.name.toLowerCase().includes(nameFilter.toLowerCase())
              && matr.merk.name.includes(merkFilter) && matr.item_category.name.includes(categoryFilter)
            return condition
          }) ?? []}
          withIndex={true}
          onActionClick={handleActionTable}
        />
      </div>}
      <EditMaterialModal
        row={selectedRow}
        refetchMaterials={refetch}
        openModal={openEditModal}
        handleOpenModal={handleOpenEditModal}
        handleCloseModal={handleCloseEditModal}
      />
    </div>
  )
}
export default MaterialPage;
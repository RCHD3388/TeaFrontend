import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { GetAllMerksDocument, GetAllSkusDocument } from "../../../../graphql/inventory.generated";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { CategoryType } from "../../../../types/staticData.types";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../../components/global_features/StickyHeadTable";
import AddSku from "../../../../components/inventory_related/AddSku";


interface RowData {
  _id: string,
  name: string,
  description: string
  merk: {
    _id: string,
    name: string
  },
  item_category: {
    _id: string,
    name: string
  }
}

const ToolSkuPage: React.FC = () => {

  let { data, loading, error, refetch } = useQuery(GetAllSkusDocument, { variables: { requiresAuth: true } })
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

  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'name', label: "Nama", minWidth: 50, align: "center", format: (value) => String(value) },
    { id: 'description', label: "Deskripsi", minWidth: 50, align: "center", format: (value) => value.length == 0 ? <div className="text-error">Belum ada deskripsi</div> : value },
    {
      id: 'merk', label: "Merk", minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{row.merk.name}</div>) },
    },
    {
      id: 'item_category', label: "Kategori", minWidth: 50, align: "center",
      renderComponent: (row) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{row.item_category.name}</div>) },
    },
    {
      id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
    },
  ]

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/inventory/sku/${row._id}`)
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
      <div className="text-2xl font-bold mb-1">Daftar Satuan Unit</div>
      <div className="flex justify-end">
        <AddSku refetchSkus={refetch} />
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
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Merk Sku" />}
        />
        <Autocomplete
          disablePortal
          options={categoryLoading ? [] : categoryData.getCategories.map((ct: any) => { return ct.name })}
          sx={{ width: 300, mb: 1, mr: 1 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            setCategoryFilter(newValue || "")
          }}
          renderInput={(params) => <TextField color="secondary" {...params} size="small" label="Kategori Barang" />}
        />
      </Box>

      {!loading && !error &&
        data?.getAllSkus.length <= 0 ?
        <div className="flex justify-center items-center p-5 bg-accent shadow-md">
          PERUSAHAAN BELUM MEMILIKI DATA PERALATAN
        </div> 
        :
        <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllSkus.filter((sku: any) => {
              let condition = sku.name.toLowerCase().includes(nameFilter.toLowerCase())
                && sku.merk.name.includes(merkFilter) && sku.item_category.name.includes(categoryFilter)
              return condition
            }) ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>}
    </div>
  )
}
export default ToolSkuPage;
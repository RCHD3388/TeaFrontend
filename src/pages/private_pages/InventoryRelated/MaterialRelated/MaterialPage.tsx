import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { GetAllMaterialsDocument, GetAllMerksDocument, GetAllSkusDocument } from "../../../../graphql/inventory.generated";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { CategoryType } from "../../../../types/staticData.types";
import StickyHeadTable from "../../../../components/global_features/StickyHeadTable";
import AddSku from "../../../../components/inventory_related/AddSku";
import AddMaterial from "../../../../components/inventory_related/AddMaterial";
import EditMaterialModal from "../../../../components/inventory_related/EditMaterialModal";
import { GridColDef } from "@mui/x-data-grid";


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

  let { data, loading, error, refetch } = useQuery(GetAllMaterialsDocument, { variables: { requiresAuth: true } })
  const { data: merkData, loading: merkLoading, error: merkError, refetch: refetchMerk } = useQuery(GetAllMerksDocument, { variables: { requiresAuth: true } })
  const { data: categoryData, loading: categoryLoading, error: categoryError, refetch: refetchCategory } = useQuery(GetCategoriesDocument, {
    variables: {
      categoryFilter: { filter: [CategoryType.ITEM] },
      requiresAuth: true
    }
  })

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => { setOpenEditModal(true) }
  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const handleActionTable = (row: RowData) => {
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

  const columns: GridColDef<RowData>[] = [
    { field: 'index', headerName: "ID", width: 100, type: "string" },
    { field: 'name', headerName: 'Nama', minWidth: 150, flex: 1, type: "string" },
    {
      field: 'status', headerName: 'Status', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: ['Active', 'Inactive'],
      renderCell: (params) => (
        params.row.status === 'Active' ?
          <div className="badge badge-success text-white whitespace-nowrap p-3 gap-2">{params.row.status}</div> :
          <div className="badge badge-warning whitespace-nowrap p-3 gap-2">{params.row.status}</div>
      )
    },
    {
      field: 'conversion', headerName: 'Satuan', minWidth: 150, type: "string", flex: 1, 
      filterable: false, sortable: false,
      renderCell: (params) => {return <>
        {params.row.unit_measure.name} ({params.row.conversion}{params.row.minimum_unit_measure.name})
      </>}
    },
    {
      field: 'merk', headerName: 'Merk', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: merkData?.getAllMerks.map((merk: any) => merk.name) || [],
      renderCell: (params) => <div className="badge whitespace-nowrap p-3 gap-2">{params.row.merk.name}</div>
    },
    {
      field: 'item_category', headerName: 'Kategori', minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: categoryData?.getCategories.map((cat: any) => cat.name) || [],
      renderCell: (params) => <div className="badge whitespace-nowrap p-3 gap-2">{params.row.item_category.name}</div>
    },
    {
      field: 'action', headerName: 'Action', minWidth: 150, flex: 1, sortable: false, filterable: false,
      renderCell: (params) => (<Button variant='contained' color='secondary' sx={{ textTransform: 'none' }}
        onClick={() => { handleActionTable(params.row) }}> Detail / Ubah </Button>
      ),
    }
  ]

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold mb-1">Daftar Material</div>
      <div className="flex justify-end">
        <AddMaterial refetchMaterials={refetch} />
      </div>

      {!loading && !error &&
        data?.getAllMaterials.length <= 0 ?
        <div className="flex justify-center items-center p-5 bg-accent shadow-md">
          PERUSAHAAN BELUM MEMILIKI DATA MATERIAL
        </div>
        :
        <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllMaterials ?? []}
            csvname="material_data"     
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
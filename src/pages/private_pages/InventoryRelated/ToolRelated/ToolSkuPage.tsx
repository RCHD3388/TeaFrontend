import { Autocomplete, Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { GetAllMerksDocument, GetAllSkusDocument } from "../../../../graphql/inventory.generated";
import { GetCategoriesDocument } from "../../../../graphql/category.generated";
import { CategoryType } from "../../../../types/staticData.types";
import StickyHeadTable from "../../../../components/global_features/StickyHeadTable";
import AddSku from "../../../../components/inventory_related/AddSku";
import { GridColDef } from "@mui/x-data-grid";


interface RowData {
  _id: string,
  name: string,
  description: string
  merk: {
    _id: string,
    name: string
  },
  status: string,
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

  const handleActionTable = (row: RowData) => {
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

  const columns: GridColDef<RowData>[] = [
    { field: "index", headerName: "No", type: "number", flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, type: "string", flex: 2 },
    {
      field: "description", headerName: "Description", minWidth: 200, type: "string", flex: 2,
      renderCell: (params: any) => {
        let value = params.row.description;
        return value.length == 0 ? <div className="text-error">Belum ada deskripsi</div> : value
      }
    },
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
      field: 'merk', headerName: "Merk", minWidth: 150, type: "singleSelect", flex: 1,
      valueOptions: merkData?.getAllMerks.map((merk: any) => ({ label: merk.name, value: merk._id })) || [],
      renderCell: (params) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{params.row.merk.name}</div>) },
      valueFormatter: (value, row) => row.merk.name
    },
    {
      field: 'item_category', headerName: "Kategori", minWidth: 150, type: "singleSelect", flex: 1,
      renderCell: (params) => { return (<div className="badge whitespace-nowrap p-3 gap-2">{params.row.item_category.name}</div>) },
      valueFormatter: (value, row) => row.item_category.name
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
      <div className="text-2xl font-bold mb-1">Daftar Satuan Unit</div>
      <div className="flex justify-end">
        <AddSku refetchSkus={refetch} />
      </div>

      {!loading && !error &&
        data?.getAllSkus.length <= 0 ?
        <div className="flex justify-center items-center p-5 bg-accent shadow-md">
          PERUSAHAAN BELUM MEMILIKI DATA PERALATAN
        </div>
        :
        <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllSkus ?? []}
            withIndex={true}
            csvname={"sku_data"}
          />
        </div>}
    </div>
  )
}
export default ToolSkuPage;
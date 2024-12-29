import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import StickyHeadTable from "../../global_features/StickyHeadTable";
import { GetWarehouseMaterialsDocument } from "../../../graphql/inventoryItem.generated";
import { GridColDef } from "@mui/x-data-grid";
import { formatDateToLong } from "../../../utils/service/FormatService";
import EditMaterialModal from "../EditMaterialModal";
import { RootState } from "../../../app/store";
import { selectUser } from "../../../app/reducers/userSlice";
import { EmployeeRoleType } from "../../../types/staticData.types";

interface RowData {
  _id: String
  remain: Number
  price: Number
  date: Date
  material: {
    _id: String
    name: String
    conversion: Number
    merk: {
      _id: String
      name: String
    }
    minimum_unit_measure: {
      _id: String
      name: String
    }
    unit_measure: {
      _id: String
      name: String
    }
    item_category: {
      _id: String
      name: String
    }
    id: String
  }
}

interface MaterialTableProps {
  warehouseId: String | undefined
}

const MaterialTable: React.FC<MaterialTableProps> = ({ warehouseId }) => {
  let { data, loading, error, refetch } = useQuery(GetWarehouseMaterialsDocument, {
    variables: {
      warehouse_id: warehouseId,
      requiresAuth: true
    }
  });
  const user = useSelector((state: RootState) => selectUser(state))
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => { setOpenEditModal(true) }
  const handleCloseEditModal = () => { setOpenEditModal(false) }
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const handleActionTable = (row: RowData) => {
    setSelectedRow(row)
    handleOpenEditModal()
  }

  const columns: GridColDef[] = [
    { field: 'index', type: 'number', headerName: "No", minWidth: 50 },
    {
      field: 'material', headerName: 'Material', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{params.row.material.name} ({params.row.material.merk.name})</>
      )
    },
    {
      field: 'detail', headerName: 'Satuan Ukuran', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{params.row.material.unit_measure.name} ({params.row.material.conversion} x {params.row.material.minimum_unit_measure.name})</>
      )
    },
    {
      field: 'kategori_barang', headerName: 'Kategori Barang', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{params.row.material.item_category.name}</>
      )
    },
    {
      field: 'terakhir_diperbarui', headerName: 'Terakhir Diperbarui', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{formatDateToLong(params.row.date)}</>
      )
    },
  ]

  const specialColumns: GridColDef[] = [...columns,     {
    field: 'action', headerName: 'Action', minWidth: 150, flex: 1, sortable: false, filterable: false,
    renderCell: (params) => (<Button variant='contained' color='secondary' sx={{ textTransform: 'none' }}
      onClick={() => { handleActionTable(params.row.material) }}> Detail / Ubah </Button>
    ),
  }];

  return (<>
    <StickyHeadTable
      columns={user && user.loggedIn && user.role !== EmployeeRoleType.MANDOR ? specialColumns : columns}
      rows={data?.getWarehouseMaterials || []}
      csvname="project_data"
    />
    {user && user.loggedIn && user.role !== EmployeeRoleType.MANDOR &&<EditMaterialModal
      row={selectedRow}
      refetchMaterials={refetch}
      openModal={openEditModal}
      handleOpenModal={handleOpenEditModal}
      handleCloseModal={handleCloseEditModal}
    />}
  </>)
}

export default MaterialTable;
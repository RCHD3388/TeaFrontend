import { ApolloError, ApolloQueryResult } from "@apollo/client";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import StickyHeadTable from "../../global_features/StickyHeadTable";
import { GetWarehouseMaterialsQuery, GetWarehouseMaterialsQueryVariables } from "../../../graphql/inventoryItem.generated";
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
  data: any,
  loading: boolean,
  error: ApolloError | undefined,
  refetch: (variables?: GetWarehouseMaterialsQueryVariables) => Promise<ApolloQueryResult<GetWarehouseMaterialsQuery>>;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ warehouseId, data, loading, error, refetch }) => {

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
    { field: 'index', type: 'number', headerName: "No", align: "right", minWidth: 50 },
    {
      field: 'material', headerName: 'Material', minWidth: 150, align: "center", type: "string", flex: 1,
      renderCell: (params) => (
        <>{params.row.material.name} ({params.row.material.merk.name})</>
      )
    },
    {
      field: 'quantity', headerName: 'Jumlah', minWidth: 100, maxWidth: 100, type: "string", align: 'right', flex: 1,
      renderCell: (params) => ( <>{params.row.remain}</>)
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
        <div className="badge whitespace-nowrap p-3 gap-2">{params.row.material.item_category.name}</div>
      )
    },
    {
      field: 'terakhir_diperbarui', headerName: 'Terakhir Diperbarui', minWidth: 150, type: "string", flex: 1,
      renderCell: (params) => (
        <>{formatDateToLong(params.row.date)}</>
      )
    },
  ]

  const specialColumns: GridColDef[] = [...columns, {
    field: 'action', headerName: 'Action', minWidth: 150, flex: 1, sortable: false, filterable: false,
    renderCell: (params) => (<Button variant='contained' color='secondary' sx={{ textTransform: 'none' }}
      onClick={() => { handleActionTable(params.row.material) }}> Detail / Ubah </Button>
    ),
  }];

  return (<>
    {loading ? <div className="flex justify-center items-center" style={{ width: "100%" }}><CircularProgress color="secondary" /></div> :
      <StickyHeadTable
        columns={user && user.loggedIn && user.role !== EmployeeRoleType.MANDOR ? specialColumns : columns}
        rows={data?.getWarehouseMaterials || []}
        csvname="project_material_stock"
      />
    }
    {user && user.loggedIn && user.role !== EmployeeRoleType.MANDOR && <EditMaterialModal
      row={selectedRow}
      refetchMaterials={refetch}
      openModal={openEditModal}
      handleOpenModal={handleOpenEditModal}
      handleCloseModal={handleCloseEditModal}
    />}
  </>)
}

export default MaterialTable;
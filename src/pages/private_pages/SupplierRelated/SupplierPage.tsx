import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddSupplier from "../../../components/supplier_related/AddSupplier";
import { GetAllSuppliersDocument } from "../../../graphql/supplier.generated";
import { useQuery } from "@apollo/client";
import StickyHeadTable, { StickyHeadTableColumn } from "../../../components/global_features/StickyHeadTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface RowData {
  _id: string,
  name: string,
  person: {
    phone_number: string,
    address: string,
    email: string
  }
  status: string
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: "Supplier", minWidth: 50, align: "center" },
  { id: 'phone_number', label: 'Nomer Telepon', minWidth: 100, align: "center",
    renderComponent: (row) => {return (<>{row.person.phone_number}</>)}
  },
  { id: 'email', label: 'Email', minWidth: 50, align: "center",
    renderComponent: (row) => {return (<>{row.person.email}</>)}
  },
  { id: 'address', label: 'Alamat', minWidth: 100, align: "center",
    renderComponent: (row) => {return (<>{row.person.address}</>)}
  },
  {
    id: 'status', label: 'Status', minWidth: 50, align: "center",
    renderComponent: (row) => {
      return (<>
        {row.status == "Active" ?
          <div className="badge badge-success text-white gap-2">Active</div> :
          <div className="badge badge-warning gap-2">Inactive</div>}
      </>)
    }
  },
  {
    id: 'action', label: 'Action', actionLabel: 'Detail', align: "center", buttonColor: (row) => 'secondary',
  },
]

export default function SupplierPage() {
  let { data, loading, refetch } = useQuery(GetAllSuppliersDocument, { variables: { requiresAuth: true } })
  const navigate = useNavigate()

  const handleActionTable = (row: RowData, column: StickyHeadTableColumn<RowData>) => {
    navigate(`/appuser/supplier/${row._id}`)
    refetch()
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Supplier Perusahaan</div>
        <div className="flex justify-end"> <AddSupplier refetchSupplier={refetch} /> </div>

        {!loading && <div>
          <StickyHeadTable
            columns={columns}
            rows={data?.getAllSuppliers ?? []}
            withIndex={true}
            onActionClick={handleActionTable}
          />
        </div>}
      </div>
    </div>
  );
}
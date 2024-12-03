import * as React from 'react';
import StickyHeadTable, { StickyHeadTableColumn } from '../../components/global_features/StickyHeadTable';
import { Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetCategoriesDocument } from '../../graphql/category.generated';

interface RowData {
  name: string;
  description: string;
  type: string;
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: 'Nama', minWidth: 50, align: "center" },
  { id: 'description', label: 'Deskripsi', minWidth: 200, align: "center" },
  { id: 'type', label: 'Status', minWidth: 50, align: "center" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Edit',
    align: "center",
    buttonColor: (row) => 'secondary'
  },
];

export default function CategoryPage() {
  let { data, loading, refetch } = useQuery(GetCategoriesDocument);

  function handleAddCategory() {
    console.log("add category")
  }

  function handleEdit(row: RowData, column: StickyHeadTableColumn<RowData>) {
    refetch()
  }

  return (
    <div className="p-5" style={{ height: "100%" }}>
      <div className="flex flex-col" style={{ maxHeight: "100%" }}>
        {/* page header title */}
        <div className="text-4xl font-bold mb-2">Kategori Data Perusahaan</div>
        {/* main content */}
        <Button
          variant="contained"
          color='secondary'
          style={{ marginBottom: "1rem" }}
          onClick={() => { handleAddCategory() }}
        >Tambah Kategori</Button>
        {!loading && <StickyHeadTable
          columns={columns}
          rows={data.getCategories}
          withIndex={true}
          onActionClick={handleEdit}
        />}
      </div>
    </div>
  );
}
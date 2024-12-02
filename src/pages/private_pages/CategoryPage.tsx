import * as React from 'react';
import StickyHeadTable, { StickyHeadTableColumn } from '../../components/global_features/StickyHeadTable';
import { Button } from '@mui/material';

interface RowData {
  name: string;
  description: string;
  type: string;
}

const columns: StickyHeadTableColumn<RowData>[] = [
  { id: 'name', label: 'Nama', minWidth: 50 },
  { id: 'description', label: 'Deskripsi', minWidth: 200, align: "center" },
  { id: 'type', label: 'Status', minWidth: 50, align: "right" },
  {
    id: 'action',
    label: 'Action',
    actionLabel: 'Edit', 
    align: "center",
    buttonColor: (row) => 'secondary'
  },
];

const rows: RowData[] = [];

export default function CategoryPage() {
  
  function handleAddCategory(){
    console.log("add category")
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
          style={{marginBottom: "1rem"}} 
          onClick={() => {handleAddCategory()}}
        >Tambah Kategori</Button>
        <StickyHeadTable
          columns={columns}
          rows={rows}
          withIndex={true}
        />
      </div>
    </div>
  );
}
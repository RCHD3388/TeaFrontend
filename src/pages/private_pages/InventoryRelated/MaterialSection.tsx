import React, { useState } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import MaterialModal from './MaterialModal';
import StickyHeadTable, {
  StickyHeadTableColumn,
} from '../../../components/global_features/StickyHeadTable';
import { useQuery } from '@apollo/client';
import { GetMaterialsDocument } from '../../../graphql/Inventory.generated';

interface RowData {
  name: string;
  deskripsi: string;
  merk: string;
  satuan: string;
  satuan_minimum: string;
  konversi: number;
  kategori: string;
}

const MaterialSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  // GraphQL query for materials
  const { data, loading, error, refetch } = useQuery(GetMaterialsDocument);

  // Define table columns
  const columns: StickyHeadTableColumn<RowData>[] = [
    { id: 'name', label: 'Nama Material', minWidth: 50, align: 'center' },
    { id: 'deskripsi', label: 'Deskripsi', minWidth: 50, align: 'center' },
    { id: 'merk', label: 'Merk', minWidth: 50, align: 'center' },
    { id: 'satuan', label: 'Satuan', minWidth: 50, align: 'center' },
    {
      id: 'satuan_minimum',
      label: 'Satuan Minimum',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'konversi',
      label: 'Konversi',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'kategori',
      label: 'Kategori',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'action',
      label: 'Detail',
      actionLabel: 'Lihat Detail',
      align: 'center',
      buttonColor: () => 'primary',
    },
  ];

  // Open and close modal handlers
  const handleAddMaterial = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Map GraphQL data to table rows
  const rows: RowData[] =
    data?.materials.map((material: any) => ({
      name: material.name,
      deskripsi: material.description,
      merk: material.merk.name || '-',
      satuan: material.unit_measure.name || '-',
      satuan_minimum: material.minimum_unit_measure.name || '-',
      konversi: material.conversion || 0,
      kategori: material.item_category || '-',
    })) || [];

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>List Material Terdaftar</h1>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleAddMaterial()}>
          Tambah Material
        </Button>
      </div>

      {/* Material Modal */}
      <MaterialModal open={open} onClose={handleClose} />

      {/* Table or Loading/Error Handling */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>
          Failed to load materials: {error.message}
        </Alert>
      ) : (
        <StickyHeadTable
          columns={columns}
          rows={rows}
          withIndex={true}
          onActionClick={(row) => console.log(row)}
        />
      )}
    </div>
  );
};

export default MaterialSection;

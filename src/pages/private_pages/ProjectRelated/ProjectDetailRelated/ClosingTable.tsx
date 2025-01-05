import React from 'react';
import { FindAllRequestClosingQuery, FindAllRequestClosingQueryVariables } from '../../../../graphql/project_closing.generated';
import { ApolloQueryResult } from '@apollo/client';
import StickyHeadTable from '../../../../components/global_features/StickyHeadTable';
import { GridColDef } from '@mui/x-data-grid';
import { formatDateToLong, RequestStatusColors } from '../../../../utils/service/FormatService';
import { Box, Button, Typography } from '@mui/material';
import { RequestStatusType } from '../../../../types/staticData.types';
import { useNavigate } from 'react-router-dom';

interface ClosingTableProps {
  data: any
  refetch: (variables?: FindAllRequestClosingQueryVariables) => Promise<ApolloQueryResult<FindAllRequestClosingQuery>>
}
interface RowData {
  _id: string;
  title: string;
  description: string;
  requested_at: Date;
  requested_by: {
    person: {
      name: String,
      email: String
    }
  };
  requested_from: {
    name: string;
    location: string;
  };
  status: string;
  handled_date: Date;
}

const ClosingTable: React.FC<ClosingTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const columns: GridColDef<RowData>[] = [
    { field: 'index', headerName: 'ID', type: 'number', width: 100 },
    { field: 'title', headerName: 'Judul Permintaan', width: 200 },
    {
      field: 'requested_at',
      headerName: 'Diajukan Pada',
      width: 200,
      renderCell: (params) => {
        return formatDateToLong(params.row.requested_at.toString());
      },
    },
    {
      field: 'requested_by',
      headerName: 'Diajukan Oleh',
      width: 200,
      renderCell: (params) => {
        return `${params.row.requested_by.person.name} (${params.row.requested_by.person.email})`;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`badge ${RequestStatusColors[params.row.status as RequestStatusType]}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: 'action', headerName: 'Aksi', width: 100,
      renderCell: (params) => {
        return (
          <Button
            variant="contained" color="secondary"
            onClick={() => {
              navigate(`/appuser/request/closing/${params.row._id}`);
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6"><b>Daftar Permintaan Penutupan</b></Typography>

      {data && <StickyHeadTable
        tableSx={{ height: 300 }}
        columns={columns}
        rows={data?.findAllRequestClosing ?? []}
        withtoolbar={false}
      />}
    </Box>
  );
}

export default ClosingTable;


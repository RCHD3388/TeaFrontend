import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { theme } from '../../theme';

interface TableProps<T> {
  columns: GridColDef[];
  rows: T[];
  tableSx?: object;
  csvname?: string;
  withtoolbar?: boolean;
  withIndex?: boolean
}

export default function StickyHeadTable<T extends object>({
  columns,
  rows,
  tableSx = { maxHeight: 600 },
  csvname,
  withtoolbar = true,
  withIndex = true
}: TableProps<T>) {
  let toolbarOption = withtoolbar ? {
    toolbar: () => (
      <GridToolbar sx={{ backgroundColor: theme.palette.secondary.main }}
        csvOptions={{
          fileName: csvname || "datacsv",
          fields: columns.filter((c) => !c.field.includes('action')).map((c) => c.field),
          utf8WithBom: true,
          delimiter: ';'
        }}
      />
    ),
  } : {}

  return (
    <div>
      <Paper sx={{ ...tableSx, width: '100%', overflow: 'auto' }}>
        <DataGrid
          rows={rows ? 
            withIndex ? rows.map((row, index) => ({ ...row, index: index + 1 })) : rows 
            : []}
          sx={{ zIndex: 0 }}
          columns={columns}
          slots={toolbarOption}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50, 100]}
          getRowId={(row) => row._id}
        />
      </Paper>
    </div>
  );
}

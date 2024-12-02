import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

export interface StickyHeadTableColumn<T> {
  id: keyof T | 'action' | "no";
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  actionLabel?: string; // Label default untuk tombol di kolom action
  buttonLabel?: (row: T) => string; // Fungsi untuk label tombol dinamis
  buttonStyle?: (row: T) => React.CSSProperties; // Styling dinamis berdasarkan row
  buttonColor?: (row: T) => 'primary' | 'secondary'; // Dinamis warna tombol
  renderComponent?: (row: T) => React.ReactNode; // Komponen yang dirender di kolom tertentu
}

interface TableProps<T> {
  columns: StickyHeadTableColumn<T>[];
  rows: T[];
  withIndex?: boolean;
  onActionClick?: (row: T, column: StickyHeadTableColumn<T>) => void; // Handler untuk action
}

export default function StickyHeadTable<T extends object>({
  columns,
  rows,
  withIndex = false,
  onActionClick,
}: TableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="flexible table">
          <TableHead>
            <TableRow>
              {withIndex &&
                <TableCell
                  key="no"
                  align="left"
                >
                  No
                </TableCell>
              }
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {withIndex &&
                    <TableCell key="no" align="left">
                      {rowIndex + 1}
                    </TableCell>
                  }
                  {columns.map((column) => {
                    if (column.id === 'action' && column.actionLabel) {
                      const buttonStyle = column.buttonStyle ? column.buttonStyle(row) : {};
                      const buttonColor = column.buttonColor ? column.buttonColor(row) : 'primary';
                      const buttonLabel = column.buttonLabel ? column.buttonLabel(row) : column.actionLabel;

                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            variant="contained"
                            color={buttonColor}
                            style={buttonStyle}
                            onClick={() => onActionClick && onActionClick(row, column)}
                          >
                            {buttonLabel}
                          </Button>
                        </TableCell>
                      );
                    }

                    // Cek jika kolom memiliki renderComponent
                    if (column.renderComponent) {
                      return (
                        <TableCell key={String(column.id)} align={column.align}>
                          {column.renderComponent(row)} {/* Render komponen kustom dengan row sebagai parameter */}
                        </TableCell>
                      );
                    }

                    const value = row[column.id as keyof T];
                    return (
                      <TableCell key={String(column.id)} align={column.align}>
                        {column.format && value !== undefined
                          ? column.format(value)
                          : value !== undefined
                            ? String(value)
                            : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

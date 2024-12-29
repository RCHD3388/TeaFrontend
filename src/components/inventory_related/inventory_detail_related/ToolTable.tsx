import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, TablePagination, TextField } from '@mui/material';
import { GetWarehouseToolsDocument } from '../../../graphql/inventoryItem.generated';
import { useQuery } from '@apollo/client';
import { formatDateToLong } from '../../../utils/service/FormatService';
import styled from '@emotion/styled';
import { theme } from '../../../theme';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableRow = styled(TableRow)(({ }) => ({
  backgroundColor: theme.palette.action.hover,
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ToolData {
  _id: String
  id: String,
  status: String,
  date: Date,
}
interface RowData {
  sku_id: String,
  sku_name: String,
  sku_status: String,
  sku_merk: String,
  sku_item_category: String,
  tool: Array<ToolData>
}

function Row(props: { row: RowData, indexNumber: number }) {
  const { row, indexNumber } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell> {indexNumber} </TableCell>
        <TableCell> {row.sku_name} </TableCell>
        <TableCell> {row.sku_merk} </TableCell>
        <TableCell> {row.sku_status} </TableCell>
        <TableCell> {row.sku_item_category} </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Daftar Peralatan
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID Unik</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Tanggal masuk</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Lihat Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tool.map((detail, index) => (
                    <StyledTableRow key={index}>
                      <TableCell component="th" scope="row">
                        {detail.id}
                      </TableCell>
                      <TableCell>{detail.status}</TableCell>
                      <TableCell align="center">{formatDateToLong(detail.date.toString())}</TableCell>
                      <TableCell align="center">
                        <Button variant='contained' color='secondary' size='small'> Detail </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface ToolTableProps {
  warehouseId: String | undefined
}

const ToolTable: React.FC<ToolTableProps> = ({ warehouseId }) => {
  let { data, loading, error, refetch } = useQuery(GetWarehouseToolsDocument, {
    variables: {
      warehouse_id: warehouseId,
      requiresAuth: true
    }
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<RowData[]>([])
  const [nameFilter, setNameFilter] = React.useState("")
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getTableRows = (data: { getWarehouseTools?: any[] }) => {
    if (!data?.getWarehouseTools) return [];

    const groupedBySKU = data.getWarehouseTools.reduce<Record<string, RowData>>(
      (acc, { date, tool }) => {
        const { sku, status } = tool;
        const skuId = sku._id;
        // Jika row utk skuId belum ada, inisialisasi lebih dulu
        acc[skuId] ||= {
          sku_id: skuId,
          sku_name: sku.name,
          sku_status: sku.status,
          sku_merk: sku.merk?.name || "",
          sku_item_category: sku.item_category?.name || "",
          tool: [],
        };

        // Tambahkan data tool ke array tool[] 
        acc[skuId].tool.push({
          _id: tool._id,
          id: tool.id,
          status: status?.name || "",
          date,
        });

        return acc;
      },
      {}
    );

    // Konversi object hasil reduce menjadi array
    return Object.values(groupedBySKU);
  };

  React.useEffect(() => {
    if (data) {
      let result_data = getTableRows(data);
      setRows(result_data)
    }
  }, [data])

  return (
    <>
      <TextField
        color="secondary" sx={{ mb: 1, mr: 1 }} label="Pencarian" size='small' variant="outlined"
        onChange={(e) => { setNameFilter(e.target.value) }}
        slotProps={{
          input: {
            startAdornment: <SearchIcon></SearchIcon>,
          },
        }}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table aria-label="collapsible table" stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Nama</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Merk</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Kategori</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.filter((row) => row.sku_name.toLowerCase().includes(nameFilter.toLowerCase())).map((row, index) => (
                <Row key={index} row={row} indexNumber={index + 1} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </>
  );
}

export default ToolTable;
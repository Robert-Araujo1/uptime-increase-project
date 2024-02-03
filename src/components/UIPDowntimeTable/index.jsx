import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import UIPTableToolbar from './UIPTableToolbar';
import { StyledTableCell, StyledTableRow } from './tableStyles';
import StatusSelection from './StatusSelection';
import i18next from '../../i18n/i18n';

function createData(customer, machinePin, location, downtimeDays, dtc) {
  return { customer, machinePin, location, downtimeDays, dtc };
}

const rows = [
  createData('Customer 1', '1BZ524KAVJD000000', 'Recife, PE', 6, 'Nenhum'),
  createData(
    'Customer 2',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 3',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 4',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
];

export default function UIPDowntimeTable() {
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper>
      <UIPTableToolbar />

      <TableContainer component={Paper} sx={{ height: 370, marginTop: 1 }}>
        <Table size='small' aria-label='a downtime table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {i18next.t('home.dashboard.customerCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.machinePinCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.locationCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.downtimeDaysCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.failureCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.statusCol')}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {i18next.t('home.dashboard.noteCol')}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow
                key={row.customer}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component='th' scope='row' width='30%'>
                  {row.customer}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {row.machinePin}
                </StyledTableCell>
                <StyledTableCell align='center'>{row.location}</StyledTableCell>
                <StyledTableCell align='center' width='20%'>
                  {row.downtimeDays}
                </StyledTableCell>
                <StyledTableCell align='center'>{row.dtc}</StyledTableCell>
                <StyledTableCell align='center'>
                  <StatusSelection />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handlePageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

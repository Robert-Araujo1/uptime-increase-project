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
import TablePaginationActions from './utils/TablePaginationActions';
import UIPTableToolbar from './components/UIPTableToolbar';
import { StyledTableCell, StyledTableRow } from './utils/tableStyles';
import StatusSelection from './utils/StatusSelection';
import i18next from '../../i18n/i18n';
import generateRandomMachines from '../../assets/data/machines/machines';
import UIPPolygonMarker from './components/UIPPolygonMarker';
import { columnNames } from './constants';
import { TableFilterContext } from '../../contexts/dashboard';

function createData(
  customer,
  machinePin,
  location,
  downtimeDays,
  dtc,
  insertDate
) {
  return { customer, machinePin, location, downtimeDays, dtc, insertDate };
}

const machines = generateRandomMachines();

const machinesList = machines.map((machine) =>
  createData(
    machine[0],
    machine[1],
    machine[2],
    machine[3],
    machine[4],
    machine[5]
  )
);

export default function UIPDowntimeTable() {
  const [rows, setRows] = React.useState(machinesList);
  const [filter, setFilter] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    if (filter) {
      const filteredRows = machinesList.filter(
        (row) =>
          row.machinePin.toLowerCase().includes(filter.search.toLowerCase()) ||
          row.customer.toLowerCase().includes(filter.search.toLowerCase()) ||
          row.location.toLowerCase().includes(filter.search.toLowerCase())
      );

      // Avoid pagination error on table
      if (page > 0 && filteredRows.length > rowsPerPage) {
        setPage(0);
      }

      setRows(filteredRows);
    }
  }, [filter]);

  return (
    <TableFilterContext.Provider value={{ filter, setFilter }}>
      <Paper>
        <UIPTableToolbar />
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table size='small' aria-label='a downtime table'>
            <TableHead>
              <TableRow>
                {columnNames.map((columnName, index) => (
                  <StyledTableCell
                    key={index}
                    align={index === 0 ? 'left' : 'center'}>
                    {columnName}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <StyledTableRow
                  key={row.machinePin}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    sx={{ minWidth: '14rem' }}>
                    <div className='first-column'>
                      <span>{row.customer}</span>
                      {index == 0 || index == 3 ? (
                        <UIPPolygonMarker text={'Manual'} />
                      ) : (
                        <UIPPolygonMarker text={'Auto'} />
                      )}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.machinePin}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.location}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.downtimeDays}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.insertDate}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{row.dtc}</StyledTableCell>
                  <StyledTableCell align='center'>
                    <StatusSelection />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <IconButton
                      aria-label='edit'
                      onClick={() => console.log(filter)}>
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
                  labelDisplayedRows={displayedRowsText}
                  onPageChange={handlePageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </TableFilterContext.Provider>
  );
}

function displayedRowsText(page) {
  return `${page.from}-${page.to === -1 ? page.count : page.to} 
  ${i18next.t('home.dashboard.prepositionTablePagination')} 
  ${page.count}`;
}

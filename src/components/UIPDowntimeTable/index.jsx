import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './utils/TablePaginationActions';
import UIPTableToolbar from './components/UIPTableToolbar';
import { StyledTableCell, StyledTableRow } from './utils/tableStyles';
import StatusSelection from './utils/StatusSelection';
import i18next from '../../i18n/i18n';
import UIPPolygonMarker from './components/UIPPolygonMarker';
import { columnNames } from './constants';
import { TableFilterContext } from '../../contexts/dashboard';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import getMachines from '../../services/getMachines';

export default function UIPDowntimeTable() {
  const [machinesList, setMachinesList] = useState([]);
  const [rows, setRows] = useState(machinesList);
  const [filter, setFilter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [loadingTable, setLoadingTable] = useState(true);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const toggleModalVisible = () => setOpen((prev) => !prev);

  useEffect(() => {
    async function fetchMachines() {
      const machines = await getMachines();
      setMachinesList(machines);
      setRows(machines);
      setLoadingTable(false);
    }
    fetchMachines();
  }, []);

  useEffect(() => {
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
        <TableContainer
          component={Paper}
          sx={{ marginTop: 1, maxHeight: 615 }}
          data-testid='machines-table'>
          {loadingTable ? (
            <LoadingTableSkeleton />
          ) : (
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
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      sx={{ minWidth: '14rem' }}>
                      <div className='first-column'>
                        <span>{row.customer}</span>
                        <UIPPolygonMarker text={'Auto'} />
                        {/* {index == 0 || index == 3 ? (
                        <UIPPolygonMarker text={'Manual'} />
                      ) : (
                        <UIPPolygonMarker text={'Auto'} />
                      )} */}
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
                    <StyledTableCell align='center'>
                      <StatusSelection />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <IconButton
                        aria-label='more-actions'
                        onClick={toggleModalVisible}>
                        <MoreVertIcon />
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
          )}
        </TableContainer>
      </Paper>
      <Modal open={open} onClose={toggleModalVisible}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant='h6'>
            {i18next.t('home.machines.machineData.title')}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                dayOfWeekFormatter={(_day, weekday) => weekday.format('ddd')}
                disableFuture
                disableHighlightToday
                minDate={dayjs('2024-02-11')}
                maxDate={dayjs('2024-02-17')}
                slots={{ day: ServerDay }}
                onChange={(value) => setSelectedDate(value.toString())}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Modal>
    </TableFilterContext.Provider>
  );
}

const LoadingTableSkeleton = () => {
  return (
    <Box mx={3} my={3} height={590}>
      <Skeleton variant='rounded' height={'10%'} sx={{ my: 3 }} />
      <Box sx={{ my: 1, height: '7%' }}>
        <Skeleton variant='rounded' height='100%' />
      </Box>
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
      <Skeleton variant='rounded' height={'7%'} sx={{ my: 1 }} />
    </Box>
  );
};

const highlightedDays = [
  dayjs('2024-02-11').toString(),
  dayjs('2024-02-12').toString(),
  dayjs('2024-02-13').toString(),
  dayjs('2024-02-16').toString(),
  dayjs('2024-02-17').toString(),
];

function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(day.toString()) >= 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isSelected ? (
        <AlertSeverityDot
          color={
            day.date() == 11
              ? 'dodgerblue'
              : day.date() == 12
                ? 'orange'
                : 'red'
          }
        />
      ) : undefined}
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Box>
  );
}

const AlertSeverityDot = ({ color }) => {
  return (
    <div className='severity-dtc-dot' style={{ background: color }}>
      <div></div>
    </div>
  );
};

function displayedRowsText(page) {
  return `${page.from}-${page.to === -1 ? page.count : page.to} 
  ${i18next.t('home.machines.table.prepositionTablePagination')} 
  ${page.count}`;
}

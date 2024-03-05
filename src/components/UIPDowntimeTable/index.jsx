import * as React from 'react';
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
import generateRandomMachines from '../../assets/data/machines/machines';
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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function createData(customer, machinePin, location, downtimeDays, insertDate) {
  return { customer, machinePin, location, downtimeDays, insertDate };
}

const machines = generateRandomMachines();

const machinesList = machines.map((machine) =>
  createData(machine[0], machine[1], machine[2], machine[3], machine[4])
);

export default function UIPDowntimeTable() {
  const [rows, setRows] = React.useState(machinesList);
  const [filter, setFilter] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(undefined);
  const [value, onChange] = React.useState(undefined);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const toggleModalVisible = () => setOpen((prev) => !prev);

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
                  <StyledTableCell align='center'>
                    <StatusSelection />
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {/* <IconButton
                      aria-label='edit'
                      onClick={() => console.log('edit')}>
                      <EditIcon />
                    </IconButton> */}
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
          <Typography variant='h6'>Histórico do equipamento</Typography>
          <Box sx={{ display: 'flex' }}>
            {/* <Calendar
              minDate={new Date(2024, 2, 11)}
              maxDate={new Date(2024, 2, 17)}
              selectRange
              onChange={onChange}
              value={value}
            /> */}
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
            {/* <Box>
              <Typography>Período selecionado</Typography>
              <Typography>{selectedDate}</Typography>
            </Box> */}
          </Box>
        </Box>
      </Modal>
    </TableFilterContext.Provider>
  );
}

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
  ${i18next.t('home.dashboard.prepositionTablePagination')} 
  ${page.count}`;
}

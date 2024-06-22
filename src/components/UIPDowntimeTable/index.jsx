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
import CloseIcon from '@mui/icons-material/Close';
import ReportIcon from '@mui/icons-material/Report';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './utils/TablePaginationActions';
import UIPTableToolbar from './components/UIPTableToolbar';
import { StyledTableCell, StyledTableRow } from './utils/tableStyles';
import StatusSelection from './utils/StatusSelection';
import i18next from '../../i18n/i18n';
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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import getMachineCategoryIcon from '../../utils/getMachineCategoryIcon';

export default function UIPDowntimeTable({ machines }) {
  const [machinesList, setMachinesList] = useState([]);
  const [rows, setRows] = useState(machinesList);
  const [filter, setFilter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [loadingTable, setLoadingTable] = useState(true);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [dtcs, setDtcs] = useState([]);
  const [machineSelected, setMachineSelected] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (row) => {
    if (row.machinePin == id) {
      navigate('/home/machines');
      return;
    }
    navigate(`/home/machines/${row.machinePin}`);
  };

  const toggleModalVisible = (row) => {
    if (row.hasOwnProperty('machinePin')) {
      var allDtcs = [];
      row.operations.forEach((operation) =>
        operation.dtcs.length > 0 ? allDtcs.push(operation.dtcs) : undefined
      );
      setHighlightedDays(
        row.operations.map((operation) => dayjs(operation.timestamp).toString())
      );
      setDtcs(allDtcs);
      setMachineSelected(row);
      navigate(`/home/machines/${row.machinePin}`);
    }
    setSelectedDate(undefined);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (typeof machines == 'object' && machines.length > 0) {
      setMachinesList(machines);
      setRows(machines);
      setLoadingTable(false);
    } else if (machines.hasOwnProperty('errorMessage')) {
      alert(`Error on get table data: ${machines.errorMessage}`);
    }
  }, [machines]);

  useEffect(() => {
    if (filter) {
      const filteredRows = machinesList.filter(
        (row) =>
          row.machinePin.toLowerCase().includes(filter.search.toLowerCase()) ||
          row.customer.toLowerCase().includes(filter.search.toLowerCase())
      );

      // Avoid pagination error on table
      if (page > 0 && filteredRows.length > rowsPerPage) {
        setPage(0);
      }

      setRows(filteredRows);
    }
  }, [filter]);

  if (!loadingTable && (machines == undefined || machines == [])) {
    return <h1>Error. There aren't machines avaiable to show.</h1>;
  }

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
            <Table
              size='small'
              aria-label='a downtime table'
              className='downtime-table'>
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
                    selected={row.machinePin == id}
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}>
                    {Object.entries(row).map(
                      ([key, value], index) =>
                        ['customer', 'machinePin', 'engineHours'].includes(
                          key
                        ) && (
                          <StyledTableCell
                            onClick={() => handleRowClick(row)}
                            key={index}
                            align={index > 0 ? 'center' : 'left'}>
                            {value}
                          </StyledTableCell>
                        )
                    )}
                    <StyledTableCell
                      align='center'
                      onClick={() => handleRowClick(row)}>
                      {row.hasDtcs ? (
                        <b style={{ color: 'red' }}>Sim</b>
                      ) : (
                        'Não'
                      )}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <StatusSelection />
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        toggleModalVisible(row);
                      }}
                      align='center'>
                      <IconButton aria-label='more-actions'>
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
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginBottom={2}>
            <Typography variant='h6'>
              {i18next.t('home.machines.machineData.title')}
            </Typography>
            <IconButton onClick={toggleModalVisible}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                dayOfWeekFormatter={(_day, weekday) => weekday.format('ddd')}
                disableFuture
                disableHighlightToday
                minDate={dayjs(highlightedDays[0])}
                maxDate={dayjs(highlightedDays[highlightedDays.length - 1])}
                slots={{
                  day: (props) => (
                    <ServerDay
                      dtcs={dtcs}
                      highlightedDays={highlightedDays}
                      {...props}
                    />
                  ),
                }}
                onChange={(value) =>
                  setSelectedDate(dayjs(value).format('DD/MM/YYYY'))
                }
              />
            </LocalizationProvider>
            {machineSelected.hasOwnProperty('category') && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                  marginX: 1,
                  maxWidth: 300,
                }}>
                <Box sx={{ display: 'flex', marginBottom: 2 }}>
                  <img
                    src={getMachineCategoryIcon(machineSelected.category)}
                    height={40}
                    width={40}
                    style={{ marginRight: 14 }}
                  />
                  <Box>
                    <Typography style={{ fontWeight: 'bold' }}>
                      {machineSelected.customer}
                    </Typography>
                    <Typography style={{ fontSize: 14 }}>
                      {machineSelected.machinePin}
                    </Typography>
                  </Box>
                </Box>
                {selectedDate && (
                  <Typography>Alertas - {selectedDate}</Typography>
                )}
                {machineSelected.operations?.map(
                  ({ dtcs }) =>
                    dtcs.length > 0 &&
                    dtcs.map(
                      (dtc, index) =>
                        dayjs(dtc.timestamp).format('DD/MM/YYYY') ==
                          selectedDate && (
                          <Box key={index} display='flex'>
                            <ReportIcon
                              fontSize='small'
                              color={
                                dtc.severity == 'INFO' || dtc.severity == 'LOW'
                                  ? 'primary'
                                  : dtc.severity == 'MEDIUM'
                                    ? 'warning'
                                    : dtc.severity == 'HIGH'
                                      ? 'error'
                                      : 'action'
                              }
                            />
                            <Typography fontSize={13}>
                              {dtc.description}
                            </Typography>
                          </Box>
                        )
                    )
                )}
              </Box>
            )}
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

function ServerDay(props) {
  const { day, outsideCurrentMonth, highlightedDays, dtcs, ...other } = props;
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.toString()) >= 0;
  let dtcOnDay = [];
  dtcs.forEach((dtc) =>
    dtc.map((alert) => {
      if (
        dayjs(alert.timestamp).toISOString().substring(0, 10) ==
        day.toISOString().substring(0, 10)
      ) {
        dtcOnDay.push(alert);
      }
    })
  );
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
          severity={
            dtcOnDay.length > 0 &&
            day.toISOString().substring(0, 10) ==
              dayjs(dtcOnDay[0].timestamp).toISOString().substring(0, 10)
              ? dtcs[0][0].severity
              : undefined
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

const AlertSeverityDot = ({ severity }) => {
  let color;
  switch (severity) {
    case 'INFO':
    case 'LOW':
      color = 'blue';
      break;
    case 'HIGH':
      color = 'red';
      break;
    case 'MEDIUM':
      color = 'orange';
      break;
    default:
      color = '';
      break;
  }
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

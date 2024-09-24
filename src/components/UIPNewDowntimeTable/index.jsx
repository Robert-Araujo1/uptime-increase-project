import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ReportIcon from '@mui/icons-material/Report';
import ServiceStatus from './components/ServiceStatus';
import dayjs from 'dayjs';
import LeadSignal from './utils/LeadSignal';
import ServerDay from './utils/ServerDay';
import i18next from '../../i18n/i18n';
import getMachineCategoryIcon from '../../utils/getMachineCategoryIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

export default function UIPNewDowntimeTable({ rows }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [machineSelected, setMachineSelected] = useState({});
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [dtcs, setDtcs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const { id } = useParams();

  const columns = [
    {
      field: 'LastServiceStatus',
      headerName: 'Status de atendimento',
      width: 170,
      display: 'flex',
      renderCell: ({ value }) => <ServiceStatus status={value} />,
    },
    { field: 'CustomerName', headerName: 'Cliente', width: 230 },
    {
      field: 'MachineVin',
      headerName: 'Chassi',
      width: 190,
    },
    {
      field: 'MachineEngineHours',
      headerName: 'Horas do Motor',
      width: 190,
      type: 'number',
      valueGetter: ({ value }) => value.Value,
    },
    {
      field: 'IdentifiedIn',
      headerName: 'Descoberto em',
      width: 150,
      valueGetter: ({ value }) => dayjs(value).format('DD/MM/YYYY'),
    },
    {
      field: 'HasDtcs',
      headerName: 'Alertas',
      width: 120,
      valueGetter: ({ value }) => (value ? 'Sim' : 'Não'),
    },
    {
      field: 'leadSignal',
      headerName: 'Sinal',
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: ({ row }) => <LeadSignal machine={row} />,
    },
    {
      field: 'Actions',
      headerName: 'Ações',
      width: 90,
      filterable: false,
      sortable: false,
      renderCell: () => (
        <IconButton
          sx={{ color: 'var(--light-text)' }}
          aria-label='more-actions'
          onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const toggleModalVisible = (row) => {
    if (row.hasOwnProperty('MachineVin')) {
      var allDtcs = [];
      row.MachineOperations.forEach((operation) =>
        operation.dtcs.length > 0 ? allDtcs.push(operation.dtcs) : undefined
      );
      setHighlightedDays(
        row.MachineOperations.map((operation) =>
          dayjs(operation.timestamp).toString()
        )
      );
      setDtcs(allDtcs);
      setMachineSelected(row);
      navigate(`/home/machines/${row.MachineVin}`);
    }
    setSelectedDate(undefined);
    setOpenModal((prev) => !prev);
  };

  const handleRowClick = (row) => {
    if (row.MachineVin == id) {
      navigate('/home/machines');
      return;
    }
    navigate(`/home/machines/${row.MachineVin}`);
  };

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.OrderId}
          onRowClick={({ row }) => {
            handleRowClick(row);
            setMachineSelected(row);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            background: 'var(--dark-background-2)',
            color: 'var(--light-text)',
            cursor: 'pointer',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
          }}
          onRowSelectionModelChange={(selection) =>
            selectedRow[0] == selection[0]
              ? setSelectedRow([])
              : setSelectedRow(selection)
          }
          rowSelectionModel={selectedRow}
          hideFooterSelectedRowCount
          pageSizeOptions={[10]}
        />
      </Box>
      <Modal open={openModal} onClose={toggleModalVisible}>
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
            {machineSelected.hasOwnProperty('MachineCategory') && (
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
                    src={getMachineCategoryIcon(
                      machineSelected.MachineCategory
                    )}
                    height={40}
                    width={40}
                    style={{ marginRight: 14 }}
                  />
                  <Box>
                    <Typography style={{ fontWeight: 'bold' }}>
                      {machineSelected.CustomerName}
                    </Typography>
                    <Typography style={{ fontSize: 14 }}>
                      {machineSelected.MachineVin}
                    </Typography>
                  </Box>
                </Box>
                {selectedDate && (
                  <Typography>Alertas - {selectedDate}</Typography>
                )}
                {machineSelected.MachineOperations?.map(
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
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            toggleModalVisible(machineSelected);
            setAnchorEl(null);
          }}>
          Ver histórico da máquina
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          Iniciar atendimento
        </MenuItem>
      </Menu>
    </>
  );
}

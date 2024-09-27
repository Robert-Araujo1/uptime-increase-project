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
import timezone from 'dayjs/plugin/timezone';
import Snackbar from '@mui/material/Snackbar';
import utc from 'dayjs/plugin/utc';
import UIPAccordion from '../UIPAccordion';
import UIPCustomModalInput from '../UIPCustomModalInput';
import { MuiTelInput } from 'mui-tel-input';
import { downtimeReasons, contactTypes } from './utils/constants';
import { validateToken } from '../../services/authentication';
import { updateOrder } from '../../services/uipApi';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import CustomToolbar from './components/CustomToolbar';
import UIPCustomSelectInput from '../UIPCustomSelectInput';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function UIPNewDowntimeTable({ rows }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [machineSelected, setMachineSelected] = useState({});
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [dtcs, setDtcs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('success');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openCompleteServiceModal, setOpenCompleteServiceModal] =
    useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [contactType, setContactType] = useState('');
  const [downtimeReason, setDowntimeReason] = useState('');

  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const { id } = useParams();
  const apiRef = useGridApiRef();

  const columns = [
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
      field: 'MachineCity',
      headerName: 'Cidade',
      width: 190,
    },
    {
      field: 'MachineState',
      headerName: 'Estado',
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
      navigate(`/home/machines/${row.OrderId}`);
    }
    setSelectedDate(undefined);
    setOpenModal((prev) => !prev);
  };

  const handleRowClick = (row) => {
    if (row.OrderId == id) {
      navigate('/home/machines');
      return;
    }
    navigate(`/home/machines/${row.OrderId}`);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (id == undefined) {
      localStorage.removeItem('selectedRow');
      return;
    }
    setSelectedRow([id]);
  }, []);

  return (
    <>
      <Box sx={{ height: '85dvh', width: '100%' }}>
        <DataGrid
          loading={rows.length == 0}
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          getRowId={(row) => row.OrderId}
          onCellClick={({ row, field }) => {
            sessionStorage.setItem('fieldClicked', field);
            if (
              field != 'Actions' ||
              selectedRow.length == 0 ||
              selectedRow[0] !== row.OrderId
            ) {
              handleRowClick(row);
              setMachineSelected(row);
            }

            if (
              field == 'Actions' &&
              Object.values(machineSelected).length == 0
            ) {
              setMachineSelected(row);
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
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
          onRowSelectionModelChange={(selection) => {
            const fieldClicked = sessionStorage.getItem('fieldClicked');
            if (selectedRow[0] == selection[0] && fieldClicked != 'Actions') {
              setSelectedRow([]);
              localStorage.removeItem('selectedRow');
              return;
            }
            setSelectedRow(selection);
            localStorage.setItem('selectedRow', JSON.stringify(selection));
          }}
          rowSelectionModel={selectedRow}
          hideFooterSelectedRowCount
          pageSizeOptions={[20]}
          slots={{
            toolbar: CustomToolbar,
          }}
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
      <Modal
        open={openCompleteServiceModal}
        onClose={() => setOpenCompleteServiceModal(false)}>
        <Box
          sx={{
            width: '90%',
            maxWidth: 600,
            height: '75dvh',
            backgroundColor: 'var(--dark-bg-modal)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            overflow: 'auto',
            p: 2,
            borderRadius: 2,
          }}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            flexWrap={'wrap-reverse'}
            marginBottom={2}>
            <Typography variant='h6' style={{ color: 'var(--light-text)' }}>
              Concluir atendimento
            </Typography>
            <IconButton
              sx={{ color: 'var(--light-text)' }}
              onClick={() => setOpenCompleteServiceModal((prev) => !prev)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box my={1} component='form'>
            <UIPAccordion title='Informações da Máquina'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: 1,
                }}>
                <img
                  width={51}
                  height={51}
                  src={
                    machineSelected?.MachineCategory &&
                    getMachineCategoryIcon(machineSelected.MachineCategory)
                  }
                />
                <Typography sx={{ px: 2 }}>
                  {machineSelected?.MachineVin}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Organização: {machineSelected?.CustomerName}
                </Typography>
                <Typography>
                  Localização:{' '}
                  {`${machineSelected?.MachineCity} - ${machineSelected?.MachineStateAcronym}`}
                </Typography>
              </Box>
            </UIPAccordion>
            <UIPAccordion defaultExpanded title='Informações do Cliente'>
              <UIPCustomModalInput
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
                label='Nome'
                id='customer-contact-name'
              />
              <MuiTelInput
                value={phoneNumber}
                onChange={(newPhone) => setPhoneNumber(newPhone)}
                size='small'
                id='phone-contact-name'
                defaultCountry='BR'
                label='Telefone'
                required
                fullWidth
                InputLabelProps={{
                  style: { color: 'var(--light-text)' },
                }}
                inputProps={{
                  style: { color: 'var(--light-text)' },
                }}
                sx={{ marginBottom: 3 }}
              />
              <UIPCustomSelectInput
                items={contactTypes}
                label='Tipo de Contato'
                onChange={(event) => setContactType(event.target.value.type)}
              />
            </UIPAccordion>
            <UIPAccordion defaultExpanded title='Informações do Atendimento'>
              <UIPCustomSelectInput
                items={downtimeReasons}
                label='Motivo da inatividade da máquina'
                onChange={(event) => setDowntimeReason(event.target.value.type)}
              />
              <UIPCustomModalInput
                label='Descrição do atendimento'
                id='observations-complete-service'
                height={100}
                multiline
                maxLength={150}
                onChange={handleDescriptionChange}
                helperText={`${description.length}/150 caracteres`}
                sx={{
                  '.MuiFormHelperText-root': {
                    color: 'var(--light-text)',
                    textAlign: 'right',
                  },
                }}
              />
            </UIPAccordion>
            <Box sx={{ textAlign: 'right', my: 2 }}>
              <Button
                color='success'
                variant='contained'
                onClick={async () => {
                  if (
                    customerName == '' ||
                    phoneNumber == '' ||
                    contactType == '' ||
                    downtimeReason == '' ||
                    description == ''
                  ) {
                    setMessageSnackbar(
                      'Preencha todos os campos obrigatórios.'
                    );
                    setSeveritySnackbar('error');
                    setOpenSnackbar(true);
                    return;
                  }
                  handleService(
                    apiRef,
                    setOpenBackdrop,
                    setAnchorEl,
                    setMessageSnackbar,
                    setSeveritySnackbar,
                    setOpenSnackbar,
                    setMachineSelected,
                    'completed',
                    machineSelected,
                    customerName,
                    phoneNumber,
                    description,
                    contactType,
                    downtimeReason
                  );
                  setOpenCompleteServiceModal(false);
                }}>
                Concluir
              </Button>
              <Button
                onClick={() => setOpenCompleteServiceModal(false)}
                sx={{ marginLeft: 2 }}
                color='error'
                variant='contained'>
                Cancelar
              </Button>
            </Box>
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
        {machineSelected.LastServiceStatus == 'not-started' ? (
          <MenuItem
            onClick={async () =>
              handleService(
                apiRef,
                setOpenBackdrop,
                setAnchorEl,
                setMessageSnackbar,
                setSeveritySnackbar,
                setOpenSnackbar,
                setMachineSelected,
                'in-progress',
                machineSelected
              )
            }>
            Iniciar atendimento
          </MenuItem>
        ) : machineSelected.LastServiceStatus == 'in-progress' ? (
          <MenuItem
            onClick={() => {
              setOpenCompleteServiceModal(true);
              setAnchorEl(null);
            }}>
            Encerrar atendimento
          </MenuItem>
        ) : undefined}
      </Menu>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={4000}>
        <Alert
          severity={severitySnackbar}
          variant='filled'
          onClose={() => setOpenSnackbar(false)}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
      <Backdrop
        open={openBackdrop}
        sx={(theme) => ({ color: '#fff', zIndex: 9999 })}>
        <CircularProgress color='info' />
      </Backdrop>
    </>
  );
}

const handleService = async (
  apiRef,
  setOpenBackdrop,
  setAnchorEl,
  setMessageSnackbar,
  setSeveritySnackbar,
  setOpenSnackbar,
  setMachineSelected,
  status,
  machineSelected,
  customerName = undefined,
  phoneNumber = undefined,
  description = undefined,
  contactType = undefined,
  downtimeReason = undefined
) => {
  setAnchorEl(null);
  setOpenBackdrop(true);
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('email');
  const validation = await validateToken(accessToken);
  let groups;

  if (user == undefined) {
    setMessageSnackbar('User unknown. Please, relogin.');
    setSeveritySnackbar('error');
    setOpenSnackbar(true);
    return;
  }

  if (
    validation &&
    typeof validation === 'object' &&
    validation.hasOwnProperty('cognito:groups')
  ) {
    groups = validation['cognito:groups'];
    try {
      let order;
      if (status == 'in-progress') {
        order = {
          OrderId: machineSelected.OrderId,
          CustomerName: machineSelected.CustomerName,
          LastServiceStatus: status,
          LastServiceStatusTimestamp: dayjs()
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DDTHH:mm:ss.SSS'),
          User: user,
          Role: groups,
        };
      } else if (status == 'completed') {
        order = {
          OrderId: machineSelected.OrderId,
          CustomerName: machineSelected.CustomerName,
          LastServiceStatus: status,
          LastServiceStatusTimestamp: dayjs()
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DDTHH:mm:ss.SSS'),
          User: user,
          Role: groups,
          ContactName: customerName,
          ContactType: contactType,
          ContactPhone: phoneNumber,
          DowntimeReason: downtimeReason,
          LastServiceStatusDescription: description,
        };
      } else {
        console.error('Status not recognized');
        return;
      }
      const response = await updateOrder(order);

      if (response?.statusCode == 200) {
        apiRef.current.updateRows([
          {
            OrderId: machineSelected.OrderId,
            LastServiceStatus: status,
          },
        ]);
        setMachineSelected((prev) => ({
          ...prev,
          LastServiceStatus: status,
        }));
        setMessageSnackbar(
          `O status da máquina ${machineSelected?.MachineVin || undefined} foi alterado para "Em atendimento"`
        );
        setSeveritySnackbar('success');
      } else if (response?.statusCode == 403) {
        setMessageSnackbar(
          `O equipamento ${machineSelected?.MachineVin || undefined} já está em atendimento`
        );
        setSeveritySnackbar('info');
      } else {
        setMessageSnackbar(
          `Ocorreu um erro ao tentar alterar o status da máquina ${machineSelected?.MachineVin || undefined}`
        );
        setSeveritySnackbar('error');
        console.error(response);
      }
      setOpenSnackbar(true);
      setOpenBackdrop(false);
    } catch (error) {
      setMessageSnackbar(
        `Ocorreu um erro ao tentar alterar o status da máquina ${machineSelected?.MachineVin || undefined}`
      );
      setSeveritySnackbar('error');
      setOpenBackdrop(false);
      console.error(error);
    }
  }
};

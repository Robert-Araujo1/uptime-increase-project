import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ServiceStatus from './components/ServiceStatus';
import dayjs from 'dayjs';
import LeadSignal from './components/LeadSignal';
import timezone from 'dayjs/plugin/timezone';
import Snackbar from '@mui/material/Snackbar';
import utc from 'dayjs/plugin/utc';
import { validateToken } from '../../services/authentication';
import { updateOrder } from '../../services/uipApi';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Alert, Backdrop, CircularProgress, Typography } from '@mui/material';
import CustomToolbar from './components/CustomToolbar';
import { initialState } from './utils/props';
import styles from './utils/styles';
import MachineHistoryModal from './components/MachineHistoryModal';
import CompleteServiceModal from './components/CompleteServiceModal';
import ThreeDotsActions from './components/ThreeDotsActions';
import HistoryModal from '../UIPWorkshopTable/components/HistoryModal';
import HistoryAccordion from '../UIPWorkshopTable/components/HistoryModal/HistoryAccordion';
import UIPCustomModalInput from '../UIPCustomModalInput';
import { inputProps } from '../UIPWorkshopTable/components/HistoryModal/utils/props';
import translateDowntimeReason from './utils/translateDowntimeReason';

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
  const [openHistoryModal, setOpenHistoryModal] = useState(false);

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
      renderCell: ({ row }) =>
        row?.LastServiceStatus !== 'completed' && <LeadSignal machine={row} />,
    },
    {
      field: 'FinishedType',
      headerName: 'Tipo de Finalização',
      width: 250,
      valueGetter: ({ row }) =>
        translateDowntimeReason(row?.ServiceStatuses[1]?.DowntimeReason),
    },
  ];

  const toggleModalVisible = (row) => {
    if (row.hasOwnProperty('MachineVin')) {
      var allDtcs = [];
      row.MachineOperations.forEach((operation) =>
        operation?.dtcs?.length > 0 ? allDtcs.push(operation.dtcs) : undefined
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

  const handleCellClick = ({ row, field }) => {
    sessionStorage.setItem('fieldClicked', field);
    if (
      field != 'Actions' ||
      selectedRow.length == 0 ||
      selectedRow[0] !== row.OrderId
    ) {
      handleRowClick(row);
      setMachineSelected(row);
    }

    if (field == 'Actions' && Object.values(machineSelected).length == 0) {
      setMachineSelected(row);
    }
  };

  const handleRowSelectionModelChange = (selection) => {
    const fieldClicked = sessionStorage.getItem('fieldClicked');
    if (selectedRow[0] == selection[0] && fieldClicked != 'Actions') {
      setSelectedRow([]);
      localStorage.removeItem('selectedRow');
      return;
    }
    setSelectedRow(selection);
    localStorage.setItem('selectedRow', JSON.stringify(selection));
  };

  const handleMenuItemClick = () => {
    toggleModalVisible(machineSelected);
    setAnchorEl(null);
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
          onCellClick={handleCellClick}
          initialState={initialState}
          sx={styles.dataGrid}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={selectedRow}
          hideFooterSelectedRowCount
          pageSizeOptions={[20]}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
      <MachineHistoryModal
        openModal={openModal}
        onClose={toggleModalVisible}
        highlightedDays={highlightedDays}
        dtcs={dtcs}
        setSelectedDate={setSelectedDate}
        machineSelected={machineSelected}
        selectedDate={selectedDate}
      />
      <CompleteServiceModal
        openModal={openCompleteServiceModal}
        machineSelected={machineSelected}
        setMessageSnackbar={setMessageSnackbar}
        setSeveritySnackbar={setSeveritySnackbar}
        setOpenSnackbar={setOpenSnackbar}
        apiRef={apiRef}
        setOpenBackdrop={setOpenBackdrop}
        setAnchorEl={setAnchorEl}
        setMachineSelected={setMachineSelected}
        setOpenCompleteServiceModal={setOpenCompleteServiceModal}
      />
      <ThreeDotsActions
        openMenu={openMenu}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleMenuItemClick={handleMenuItemClick}
        machineSelected={machineSelected}
        apiRef={apiRef}
        setOpenBackdrop={setOpenBackdrop}
        setMessageSnackbar={setMessageSnackbar}
        setSeveritySnackbar={setSeveritySnackbar}
        setOpenSnackbar={setOpenSnackbar}
        setMachineSelected={setMachineSelected}
        setOpenCompleteServiceModal={setOpenCompleteServiceModal}
        setOpenHistoryModal={setOpenHistoryModal}
      />
      <HistoryModal
        open={openHistoryModal}
        setOpen={setOpenHistoryModal}
        row={machineSelected}>
        {machineSelected?.ServiceStatuses?.toReversed().map((status, index) => (
          <HistoryAccordion
            key={index}
            timestamp={status.Timestamp}
            status={status.Status}
            User={status.User}>
            {status.hasOwnProperty('Description') && (
              <>
                <UIPCustomModalInput
                  label='Descrição do Atendimento'
                  disabled
                  multiline
                  variant='standard'
                  required={false}
                  InputProps={inputProps}
                  value={status.Description}
                />
                <Box sx={styles.serviceHistoryModal.tagContainer}>
                  <Typography sx={styles.modal.title}>
                    Motivo da Inatividade
                  </Typography>
                  <Box sx={styles.serviceHistoryModal.tag}>
                    <Box sx={styles.serviceHistoryModal.circle}></Box>
                    <Typography sx={styles.serviceHistoryModal.tagTitle}>
                      {translateDowntimeReason(
                        machineSelected?.ServiceStatuses[1]?.DowntimeReason
                      )}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </HistoryAccordion>
        ))}
      </HistoryModal>
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

export const handleService = async (
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

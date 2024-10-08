import dayjs from 'dayjs';
import handleDate from '../utils/handleDate';
import ServiceStatus from '../../UIPNewDowntimeTable/components/ServiceStatus';
import handleStoppedDays from '../utils/handleStoppedDays';
import { failureItems, companyItems, locationItems } from './items';
import handleArrayOfTypes from '../utils/handleArrayOfTypes';

export default [
  {
    field: 'LastServiceStatus',
    headerName: 'Status',
    width: 190,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ value }) => <ServiceStatus status={value} />,
  },
  {
    field: 'Company',
    headerName: 'Empresa',
    width: 280,
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => handleArrayOfTypes(companyItems, value),
  },
  {
    field: 'CreatedAt',
    headerName: 'Adicionado em',
    width: 170,
    type: 'datetime',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => handleDate(value),
  },
  {
    field: 'CustomerName',
    headerName: 'Cliente',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },

  {
    field: 'MachineStoppedSince',
    headerName: 'Data da Parada',
    width: 160,
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => dayjs(value).toDate(),
  },
  {
    field: 'ExpectedDateToFinish',
    headerName: 'Data Prevista para Liberação',
    width: 210,
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => dayjs(value).toDate(),
  },
  {
    field: 'StoppedDays',
    headerName: 'Dias Parados',
    width: 150,
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ row }) => handleStoppedDays(row),
  },
  {
    field: 'LastFailureType',
    headerName: 'Tipo da Falha',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => handleArrayOfTypes(failureItems, value),
  },
  {
    field: 'LastServiceDescription',
    headerName: 'Última Atualização do Serviço',
    width: 160,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'LastServiceStatusTimestamp',
    headerName: 'Data da Última Atualização',
    width: 200,
    type: 'datetime',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => handleDate(value),
  },
  {
    field: 'DaysSinceLastUpdate',
    headerName: 'Dias Desde a Última Atualização',
    width: 190,
    type: 'datetime',
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ row }) =>
      dayjs().diff(dayjs(row.LastServiceStatusTimestamp), 'days'),
  },
  {
    field: 'MachineVin',
    headerName: 'Chassi',
    width: 190,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'MachineEngineHours',
    headerName: 'Horímetro',
    width: 160,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'MachineLocation',
    headerName: 'Local da Máquina',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: ({ value }) => handleArrayOfTypes(locationItems, value),
  },
];

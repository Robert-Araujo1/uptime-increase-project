import { GridColDef } from '@mui/x-data-grid';
import isRecentDate from '../../utils/isRecentDate';

const columns: GridColDef[] = [
  {
    field: 'CustomerName',
    headerName: 'Cliente',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'MachineVin',
    headerName: 'Chassi',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'MachineEngineHours',
    headerName: 'Horímetro',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'MachineCity',
    headerName: 'Cidade',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'MachineState',
    headerName: 'Estado',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'MachineLocationTimestamp',
    headerName: 'Localização Atualizada Em',
    width: 250,
    valueGetter: ({ row }) => isRecentDate(row.MachineLocationTimestamp)[0],
    align: 'center',
    headerAlign: 'center',
  },
];

export default columns;

import { GridColDef } from '@mui/x-data-grid';
import isRecentDate from '../../utils/isRecentDate';

const columns: GridColDef[] = [
  {
    field: 'CustomerName',
    headerName: 'Cliente',
    width: 150,
  },
  {
    field: 'MachineVin',
    headerName: 'Chassi',
    width: 200,
  },
  {
    field: 'MachineEngineHours',
    headerName: 'Horímetro',
    width: 150,
  },
  {
    field: 'MachineCity',
    headerName: 'Cidade',
    width: 150,
  },
  {
    field: 'MachineState',
    headerName: 'Estado',
    width: 150,
  },
  {
    field: 'MachineLocationTimestamp',
    headerName: 'Localização Atualizada Em',
    width: 250,
    valueGetter: ({ row }) => isRecentDate(row.MachineLocationTimestamp),
  },
];

export default columns;

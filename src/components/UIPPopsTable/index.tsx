import { DataGrid } from '@mui/x-data-grid';
import { initialState } from '../UIPNewDowntimeTable/utils/props';
import columns from './columns';
import Box from '@mui/material/Box';
import styles from '../UIPNewDowntimeTable/utils/styles';

interface PopsRow {
  CustomerName: string;
  MachineLocationTimestamp: string;
  MachineCity: string;
  MachineState: string;
  MachineEngineHours: number;
  MachineVin: string;
}

export default function ({ rows }: { rows: PopsRow[] }) {
  return (
    <Box sx={{ height: '85dvh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.MachineVin}
        initialState={initialState}
        pageSizeOptions={[20]}
        sx={styles.dataGrid}
      />
    </Box>
  );
}

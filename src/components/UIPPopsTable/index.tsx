import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { initialState } from '../UIPNewDowntimeTable/utils/props';
import { useState } from 'react';
import columns from './columns';
import Box from '@mui/material/Box';
import PopsForms from './PopsForms';
import Button from '@mui/material/Button';
import FeedIcon from '@mui/icons-material/Feed';

interface PopsRow {
  CustomerName: string;
  MachineLocationTimestamp: string;
  MachineCity: string;
  MachineState: string;
  MachineEngineHours: number;
  MachineVin: string;
}

export default function ({ rows }: { rows: PopsRow[] }) {
  const [openPopsForm, setOpenPopsForm] = useState(false);
  const [machineDetails, setMachineDetails] = useState<any>(undefined);
  const [isRowSelected, setIsRowSelected] = useState(false);
  return (
    <Box sx={{ height: '85dvh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.MachineVin}
        initialState={initialState}
        onRowClick={({ row }) => {
          setIsRowSelected(true);
          setMachineDetails(row);
        }}
        slots={{
          toolbar: () =>
            machineDetails &&
            isRowSelected && (
              <PopsTableToolbar setOpenPopsForm={setOpenPopsForm} />
            ),
        }}
        pageSizeOptions={[20]}
        sx={{
          background: 'var(--dark-background-3)',
          color: 'var(--light-text)',
          cursor: 'pointer',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
        }}
      />
      <PopsForms
        open={openPopsForm}
        handleClose={() => setOpenPopsForm(false)}
        machineDetails={machineDetails}
      />
    </Box>
  );
}

const PopsTableToolbar = ({ setOpenPopsForm }: { setOpenPopsForm: any }) => {
  return (
    <Box textAlign='center' mt={1} mx={2}>
      <Button
        variant='contained'
        sx={{ background: '#EDAC23', color: 'black' }}
        color='inherit'
        startIcon={<FeedIcon />}
        onClick={() => setOpenPopsForm(true)}>
        Preencher formulário
      </Button>
    </Box>
  );
};

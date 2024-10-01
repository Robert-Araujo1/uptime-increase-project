import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import columns from './constants/columns';
import CustomToolbar from './components/CustomToolbar';
import AddEquipModal from './components/AddEquipModal';
import styles from './styles';
import { initialState } from './constants/props';
export default function () {
  const [openAddEquipModal, setOpenAddEquipModal] = useState(true);

  return (
    <>
      <Box sx={{ height: '85dvh', width: '100%', marginTop: 2 }}>
        <DataGrid
          pageSizeOptions={[5]}
          sx={styles.dataGrid}
          getRowId={(row) => row.OrderId}
          rows={[]}
          columns={columns}
          slots={{
            toolbar: () => (
              <CustomToolbar setOpenAddEquipModal={setOpenAddEquipModal} />
            ),
          }}
          initialState={initialState}
        />
      </Box>
      <AddEquipModal
        openAddEquipModal={openAddEquipModal}
        setOpenAddEquipModal={setOpenAddEquipModal}
      />
    </>
  );
}

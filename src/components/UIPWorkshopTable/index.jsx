import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import columns from './constants/columns';
import CustomToolbar from './components/CustomToolbar';
import CustomModal from './components/CustomModal';
import handleAddFormSubmit from './components/CustomModal/utils/handleAddFormSubmit';
import handleEditFormSubmit from './components/CustomModal/utils/handleEditFormSubmit';
import styles from './styles';
import { initialState } from './constants/props';
import { getWMOrders } from '../../services/uipApi';
import { useGridApiRef } from '@mui/x-data-grid';

export default function () {
  const [openAddEquipModal, setOpenAddEquipModal] = useState(false);
  const [openEditEquipModal, setOpenEditEquipModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const apiRef = useGridApiRef();

  const dataGridSlots = {
    toolbar: () => (
      <CustomToolbar
        selectedRow={selectedRow}
        setOpenAddEquipModal={setOpenAddEquipModal}
        setOpenEditEquipModal={setOpenEditEquipModal}
        apiRef={apiRef}
      />
    ),
  };

  const handleSelectionRow = ({ row }) => {
    setSelectedRow(row);
  };

  useEffect(() => {
    getWMOrders()
      .then((data) => {
        if (data) {
          const dataJson = JSON.parse(data.body);
          setRows(dataJson);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Box sx={{ height: '85dvh', width: '100%', marginTop: 2 }}>
        <DataGrid
          apiRef={apiRef}
          pageSizeOptions={[5]}
          sx={styles.dataGrid}
          getRowId={(row) => row.OrderId}
          rows={rows}
          loading={rows.length === 0}
          columns={columns}
          slots={dataGridSlots}
          initialState={initialState}
          onRowClick={handleSelectionRow}
        />
      </Box>
      <CustomModal
        title='Adicionar Equipamento'
        openModal={openAddEquipModal}
        setOpenModal={setOpenAddEquipModal}
        handleFormSubmit={handleAddFormSubmit}
      />
      <CustomModal
        title='Editar Equipamento'
        openModal={openEditEquipModal}
        setOpenModal={setOpenEditEquipModal}
        handleFormSubmit={handleEditFormSubmit}
      />
    </>
  );
}

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import columns from './constants/columns';
import CustomToolbar from './components/CustomToolbar';
import CustomModal from './components/CustomModal';
import styles from './styles';
import { initialState } from './constants/props';
import { createWMOrder, editWMOrder, getWMOrders } from '../../services/uipApi';
import { useGridApiRef } from '@mui/x-data-grid';

export default function () {
  const [openAddEquipModal, setOpenAddEquipModal] = useState(false);
  const [openEditEquipModal, setOpenEditEquipModal] = useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const apiRef = useGridApiRef();

  const dataGridSlots = {
    toolbar: () => (
      <CustomToolbar
        selectedRow={selectedRow}
        setOpenAddEquipModal={setOpenAddEquipModal}
        setOpenEditEquipModal={setOpenEditEquipModal}
        setOpenUpdateStatusModal={setOpenUpdateStatusModal}
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
          sx={styles.dataGrid}
          pageSizeOptions={[20]}
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
        service={createWMOrder}
      />
      <CustomModal
        title='Editar Equipamento'
        openModal={openEditEquipModal}
        setOpenModal={setOpenEditEquipModal}
        service={editWMOrder}
      />
      <CustomModal
        title={'Atualizar Status'}
        openModal={openUpdateStatusModal}
        setOpenModal={setOpenUpdateStatusModal}
        service={editWMOrder}
      />
    </>
  );
}

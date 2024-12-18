import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import columns from './constants/columns';
import CustomToolbar from './components/CustomToolbar';
import CustomModal from './components/CustomModal';
import HistoryModal from './components/HistoryModal';
import HistoryAccordion from './components/HistoryModal/HistoryAccordion';
import styles from './styles';
import { initialState } from './constants/props';
import { createWMOrder, editWMOrder, getWMOrders } from '../../services/uipApi';
import { useGridApiRef } from '@mui/x-data-grid';
import UpdatedFields from './components/HistoryModal/UpdatedFields';
import UIPCustomModalInput from '../UIPCustomModalInput';
import { inputProps } from './components/HistoryModal/utils/props';

export default function () {
  const [openAddEquipModal, setOpenAddEquipModal] = useState(false);
  const [openEditEquipModal, setOpenEditEquipModal] = useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
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
        setOpenHistoryModal={setOpenHistoryModal}
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
      <HistoryModal
        open={openHistoryModal}
        setOpen={setOpenHistoryModal}
        row={selectedRow}>
        {selectedRow?.ServiceStatuses?.toReversed().map(
          ({ Timestamp, Status, Type, ...others }, index) => (
            <HistoryAccordion
              key={index}
              timestamp={Timestamp}
              status={Status}
              type={Type}
              {...others}>
              {Type !== 'NEW ENTRY' && (
                <Typography sx={styles.historyAccordion.detailsTitle1}>
                  Alterações
                </Typography>
              )}
              {Type == 'NEW ENTRY' && (
                <UIPCustomModalInput
                  label='Descrição do Serviço'
                  disabled
                  multiline
                  variant='standard'
                  required={false}
                  InputProps={inputProps}
                  value={others?.Description}
                />
              )}
              <Box>
                {others?.UpdatedFields?.map((field, index) => (
                  <UpdatedFields key={index} field={field} />
                ))}
              </Box>
            </HistoryAccordion>
          )
        )}
      </HistoryModal>
    </>
  );
}

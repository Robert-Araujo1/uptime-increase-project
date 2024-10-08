import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { addWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import FeedIcon from '@mui/icons-material/Feed';

export default function ({
  setOpenAddEquipModal,
  setOpenEditEquipModal,
  setOpenUpdateStatusModal,
  setOpenHistoryModal,
  selectedRow,
  apiRef,
}) {
  const dispatch = useDispatch();

  const handleOpenAddEquipModal = () => {
    setOpenAddEquipModal(true);
  };

  const handleEditEquipModal = () => {
    if (selectedRow) {
      dispatch(addWMOrder(selectedRow));
      setOpenEditEquipModal(true);
    }
  };

  const handleUpdateStatusModal = () => {
    if (selectedRow) {
      dispatch(addWMOrder(selectedRow));
      setOpenUpdateStatusModal(true);
    }
  };

  const handleHistoryModal = () => {
    setOpenHistoryModal(true);
  };
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Box>
        <Button
          color='primary'
          variant='text'
          onClick={handleOpenAddEquipModal}>
          <Add />
          Adicionar Equipamento
        </Button>
        <GridToolbarExport
          csvOptions={{
            utf8WithBom: true,
            delimiter: ';',
          }}
        />
      </Box>
      {apiRef.current.getSelectedRows().size == 1 && (
        <Box>
          <Button
            onClick={handleHistoryModal}
            sx={{ marginRight: 1 }}
            color='success'
            variant='contained'>
            <FeedIcon sx={{ marginRight: 1 }} />
            Histórico
          </Button>
          <Button
            onClick={handleUpdateStatusModal}
            sx={{ marginRight: 1 }}
            color='warning'
            variant='contained'>
            <UpdateIcon />
            Atualizar Status
          </Button>
          <Button
            onClick={handleEditEquipModal}
            sx={{ marginRight: 1 }}
            color='primary'
            variant='contained'>
            <EditIcon />
            Editar
          </Button>
          <Button
            color='error'
            variant='contained'
            onClick={() =>
              alert(
                'Funcionalidade ainda não implementada. Contate o desenvolvedor.'
              )
            }>
            <DeleteIcon />
            Excluir
          </Button>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

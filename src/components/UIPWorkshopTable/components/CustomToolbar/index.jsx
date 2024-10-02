import { GridToolbarContainer } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { addWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';

export default function ({
  setOpenAddEquipModal,
  setOpenEditEquipModal,
  selectedRow,
  apiRef,
}) {
  console.log();
  const dispatch = useDispatch();

  const handleOpenAddEquipModal = () => {
    setOpenAddEquipModal(true);
  };

  const handleEditEquipModal = () => {
    if (selectedRow) {
      dispatch(addWMOrder(selectedRow));
    }
    setOpenEditEquipModal(true);
  };
  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <Button color='primary' variant='text' onClick={handleOpenAddEquipModal}>
        <Add />
        Adicionar Equipamento
      </Button>
      {apiRef.current.getSelectedRows().size == 1 && (
        <Box>
          <Button sx={{ marginRight: 1 }} color='warning' variant='contained'>
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
          <Button color='error' variant='contained'>
            <DeleteIcon />
            Excluir
          </Button>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

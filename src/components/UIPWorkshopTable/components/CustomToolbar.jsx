import { GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
export default function ({ setOpenAddEquipModal }) {
  const handleOpenAddEquipModal = () => {
    setOpenAddEquipModal(true);
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' variant='text' onClick={handleOpenAddEquipModal}>
        <Add />
        Adicionar Equipamento
      </Button>
    </GridToolbarContainer>
  );
}

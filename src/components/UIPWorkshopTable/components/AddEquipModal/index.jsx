import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../../styles';
import Header from './Header';
import StoppedReasonAccordion from './StoppedReasonAccordion';
import MachineAccordion from './MachineAccordion';
import ResponsibleAccordion from './ResponsibleAccordion';
import Button from '@mui/material/Button';
import 'dayjs/locale/pt-br';

export default function ({ openAddEquipModal, setOpenAddEquipModal }) {
  const handleClose = () => {
    setOpenAddEquipModal(false);
  };

  return (
    <Modal open={openAddEquipModal} onClose={handleClose}>
      <Box sx={styles.addEquipModal.container} component='form'>
        <Header handleClose={handleClose} />
        <ResponsibleAccordion />
        <MachineAccordion />
        <StoppedReasonAccordion />
        <DoubleButtons handleClose={handleClose} />
      </Box>
    </Modal>
  );
}

const DoubleButtons = ({ handleClose }) => (
  <Box sx={{ textAlign: 'right', my: 2 }}>
    <Button
      sx={{ marginRight: 2 }}
      type='submit'
      color='success'
      variant='contained'>
      Concluir
    </Button>
    <Button color='error' variant='contained' onClick={handleClose}>
      Cancelar
    </Button>
  </Box>
);

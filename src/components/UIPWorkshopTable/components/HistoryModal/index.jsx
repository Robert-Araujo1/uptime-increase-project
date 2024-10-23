import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../../styles';
import Header from '../CustomModal/Header';

export default function ({ open, setOpen, row, children }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.CustomModal.container}>
        <Header title='Histórico do atendimento' handleClose={handleClose} />
        <RowInfo row={row} />
        {children}
      </Box>
    </Modal>
  );
}

export const RowInfo = ({ row }) => (
  <Box mb={2}>
    <Typography sx={styles.CustomModal.title}>
      {'Cliente: ' + row?.CustomerName}
    </Typography>
    <Typography sx={styles.CustomModal.title}>
      {'Chassi: ' + row?.MachineVin}
    </Typography>
  </Box>
);

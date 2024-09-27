import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles';

export default ({ handleClose }) => (
  <Box sx={styles.addEquipModal.header}>
    <Typography variant='h6' sx={styles.addEquipModal.title}>
      Adicionar Equipamento
    </Typography>
    <IconButton sx={styles.addEquipModal.title} onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  </Box>
);

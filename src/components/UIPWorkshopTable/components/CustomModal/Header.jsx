import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles';

export default ({ handleClose, title }) => (
  <Box sx={styles.CustomModal.header}>
    <Typography variant='h6' sx={styles.CustomModal.title}>
      {title}
    </Typography>
    <IconButton sx={styles.CustomModal.title} onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  </Box>
);

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default ({ handleClose, loading }) => {
  return (
    <Box sx={{ textAlign: 'right', my: 2 }}>
      <Button
        sx={{ marginRight: 2 }}
        color='success'
        variant='contained'
        disabled={loading}
        type='submit'>
        {loading && <CircularProgress size={20} sx={{ marginRight: 1 }} />}
        Concluir
      </Button>
      <Button color='error' variant='contained' onClick={handleClose}>
        Cancelar
      </Button>
    </Box>
  );
};

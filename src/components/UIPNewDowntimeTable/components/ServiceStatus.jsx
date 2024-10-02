import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ({ status }) {
  const statusInfo = handleStatus(status);
  return (
    <Paper
      elevation={2}
      sx={{
        width: 200,
        height: 27,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: statusInfo.color,
      }}>
      <Typography
        sx={{
          textAlign: 'center',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          fontSize: 14,
          color: status === 'not-started' ? '#000' : '#fff',
        }}>
        {statusInfo.text}
      </Typography>
    </Paper>
  );
}

const handleStatus = (status) => {
  switch (status) {
    case 'not-started':
      return { color: '#FFD700', text: 'Não iniciado' };
    case 'in-progress':
      return { color: '#1a73e8', text: 'Em atendimento' };
    case 'completed':
      return { color: '#32CD32', text: 'Concluído' };
    case 'pending':
      return { color: '#FF4500', text: 'Pendente' };
    case 'repairing':
      return { color: '#FF8C00', text: 'Reparando' };
    case 'waiting-parts':
      return { color: '#1a73e8', text: 'Aguardando peça' };
    default:
      return { color: '#7d7d7d', text: status };
  }
};

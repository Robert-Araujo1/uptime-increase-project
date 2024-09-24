import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ({ status }) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 200,
        height: 27,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          status === 'not-started'
            ? '#FFD700'
            : status === 'in-progress'
              ? '#1a73e8'
              : status === 'completed'
                ? '#32CD32'
                : '#7d7d7d',
      }}>
      <Typography
        sx={{
          textAlign: 'center',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          fontSize: 14,
          color: status === 'not-started' ? '#000' : '#fff',
        }}>
        {status === 'not-started'
          ? 'Não iniciado'
          : status === 'in-progress'
            ? 'Em andamento'
            : status === 'completed'
              ? 'Concluído'
              : status}
      </Typography>
    </Paper>
  );
}

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../styles';

export default ({ insights }) => {
  return (
    <div className='row mt-4'>
      {Object.entries(insights?.StoppedMachinesByCompany).map(
        ([key, value], index) => (
          <div key={index} className='col-md mb-2'>
            <Card sx={styles.cardContainer}>
              <CardContent>
                <Typography variant='h7' component='div'>
                  {key.split('_')[1]}
                </Typography>
                <Box sx={styles.cardInfo}>
                  <Typography component='span' fontSize={18}>
                    {value}
                  </Typography>
                  <Typography component='span' fontSize={12}>
                    Máquinas paradas
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  );
};

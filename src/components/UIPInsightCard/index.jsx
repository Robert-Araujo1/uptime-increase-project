import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import selectIconStyle from './selectIconStyle';
import { Bar } from 'react-chartjs-2';

export default function ({
  cardTitle,
  iconStyle,
  cardValue,
  servicesStatuses,
}) {
  const [gradientBackground, icon] = selectIconStyle(iconStyle);

  return (
    <Card
      sx={{
        maxWidth: '100%',
        minWidth: 250,
        marginBottom: 2,
        borderRadius: '1rem',
        boxShadow: 'var(--dark-shadow)',
        background: 'var(--dark-background-2)',
      }}>
      <CardContent>
        <UIPCardIcon background={gradientBackground} icon={icon} />
        <Typography
          sx={{ fontSize: 14, textAlign: 'end', color: 'var(--light-text)' }}
          gutterBottom>
          {cardTitle}
        </Typography>
        <Typography
          fontWeight='bold'
          variant='h6'
          component='div'
          sx={{ textAlign: 'end', color: 'var(--light-text)' }}>
          {cardValue}
        </Typography>
        <hr style={{ color: 'var(--light-text)' }} />
        <Box display='flex' alignItems='end' justifyContent='space-between'>
          <Box display='flex' flexDirection='column' px={2}>
            <Box>
              <CustomLabel value='Concluídos' />{' '}
              <CustomValue value={servicesStatuses?.completed} />
            </Box>
            <Box>
              <CustomLabel value='Em atendimento' />{' '}
              <CustomValue value={servicesStatuses?.inProgress} />
            </Box>
            <Box>
              <CustomLabel value='Pendentes' />{' '}
              <CustomValue value={servicesStatuses?.notStarted} />
            </Box>
          </Box>
          <Box width={140}>
            <Bar
              height={90}
              options={{
                responsive: true,
                scales: { y: { display: false }, x: { display: false } },
                plugins: { legend: { display: false } },
              }}
              data={{
                labels: [''],
                datasets: [
                  {
                    label: 'Concluídos',
                    data: [servicesStatuses?.completed],
                    backgroundColor: '#32cd32',
                    pointRadius: 5,
                  },
                  {
                    label: 'Em atendimento',
                    data: [servicesStatuses?.inProgress],
                    backgroundColor: '#1a73e8',
                    pointRadius: 5,
                  },
                  {
                    label: 'Pendentes',
                    data: [servicesStatuses?.notStarted],
                    backgroundColor: '#FFD700',
                    pointRadius: 5,
                  },
                ],
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const CustomValue = ({ value }) => {
  return (
    <Typography
      sx={{ color: 'var(--light-text)' }}
      component='span'
      fontWeight='lighter'
      fontSize='small'>
      {value}
    </Typography>
  );
};

const CustomLabel = ({ value }) => {
  return (
    <Typography
      component='span'
      color={
        value === 'Concluídos'
          ? '#32CD32'
          : value === 'Em atendimento'
            ? '#1a73e8'
            : '#FFD700'
      }
      fontWeight='bold'
      fontSize='small'>
      {`${value}:`}
    </Typography>
  );
};

const UIPCardIcon = ({ background, icon }) => {
  return (
    <Box
      position={'absolute'}
      mt={-3}
      width='3.5rem'
      height='3.5rem'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        borderRadius: '0.3rem',
        boxShadow: 'var(--dark-shadow)',
        background: background,
      }}>
      <div
        style={{
          width: '2.8rem',
          height: '2.8rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </div>
    </Box>
  );
};

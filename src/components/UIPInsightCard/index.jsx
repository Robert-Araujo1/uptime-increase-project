import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import selectIconStyle from './selectIconStyle';
import i18next from '../../i18n/i18n';

export default function ({ cardTitle, iconStyle, cardValue }) {
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
        <Box px={2}>
          <ValueTypo value='+0%' />{' '}
          <LabelTypo
            label={i18next.t('home.dashboard.completedCardStatisticLabel')}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

const LabelTypo = ({ label }) => {
  return (
    <Typography
      sx={{ color: 'var(--light-text)' }}
      component='span'
      fontWeight='lighter'
      fontSize='small'>
      {label}
    </Typography>
  );
};

const ValueTypo = ({ value }) => {
  return (
    <Typography
      component='span'
      color='green'
      fontWeight='bold'
      fontSize='small'>
      &nbsp;{value}
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

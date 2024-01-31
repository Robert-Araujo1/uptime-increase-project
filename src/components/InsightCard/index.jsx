import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function ({ cardTitle, iconStyle }) {
  let gradientBackground;
  let icon;

  switch (iconStyle) {
    case 'started':
      gradientBackground =
        'linear-gradient(150deg, rgba(148,218,185,1) 0%, rgba(25,135,84,1) 100%)';
      icon = (
        <AssignmentTurnedInIcon sx={{ color: '#ffffff' }} fontSize='medium' />
      );
      break;
    case 'in-progress':
      gradientBackground =
        'linear-gradient(150deg, rgba(171,202,246,1) 0%, rgba(13,110,253,1) 100%)';
      icon = <WatchLaterIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'not-started':
      gradientBackground =
        'linear-gradient(150deg, rgba(240,163,171,1) 0%, rgba(220,53,69,1) 100%)';
      icon = <AssignmentLateIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'total':
      gradientBackground =
        'linear-gradient(150deg, rgba(246,222,148,1) 0%, rgba(255,193,7,1) 100%)';
      icon = <ConstructionIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    default:
      break;
  }

  return (
    <Card
      sx={{
        maxWidth: '100%',
        minWidth: 250,
        marginBottom: 2,
        boxShadow: '3px 3px 10px 0 rgba(136, 152, 170, .15) !important',
      }}>
      <CardContent>
        <UIPCardIcon background={gradientBackground} icon={icon} />
        <Typography
          sx={{ fontSize: 14, textAlign: 'end' }}
          color='text.secondary'
          gutterBottom>
          {cardTitle}
        </Typography>
        <Typography variant='h6' component='div' sx={{ textAlign: 'end' }}>
          {'cardValue'}
        </Typography>
      </CardContent>
    </Card>
  );
}

const UIPCardIcon = ({ background, icon }) => {
  return (
    <Box
      position={'absolute'}
      mt={-3}
      width='3rem'
      height='3rem'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        borderRadius: '0.3rem',
        boxShadow: '3px 3px 10px 0 rgba(136, 152, 170, .15) !important',

        background: background,
      }}>
      {icon}
    </Box>
  );
};

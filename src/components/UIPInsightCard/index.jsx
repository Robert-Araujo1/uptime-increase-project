import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import selectIconStyle from './selectIconStyle';

export default function ({ cardTitle, iconStyle }) {
  const [gradientBackground, icon] = selectIconStyle(iconStyle);

  return (
    <Card
      sx={{
        maxWidth: '100%',
        minWidth: 250,
        marginBottom: 2,
        boxShadow: '3px 3px 6px 0 rgba(136, 152, 170, .25) !important',
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
        boxShadow: '4px 4px 10px 0 rgba(136, 152, 170, 0.3) !important',

        background: background,
      }}>
      {icon}
    </Box>
  );
};

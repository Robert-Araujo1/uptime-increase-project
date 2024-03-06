import React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UIPChart({ chart, background, title, text }) {
  return (
    <Card sx={{ height: 390 }}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection={'column'}>
        {React.useMemo(() => (
          <Box
            height={300}
            sx={{
              width: '100%',
              borderRadius: '0.3rem',
              boxShadow: '4px 4px 10px 0 rgba(136, 152, 170, 0.3) !important',
              background: background,
            }}>
            {chart}
          </Box>
        ))}
        <Box pt={2} pb={1} px={2} width={'100%'}>
          <Typography
            variant='h7'
            color={'#2D4A5D'}
            fontWeight={'bold'}
            textTransform={'capitalize'}>
            {title}
          </Typography>
          <br />
          <Typography
            variant='div'
            color={'#A2A2A2'}
            fontWeight={'light'}
            fontSize={14}>
            {text}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

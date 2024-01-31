import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ({ cardTitle }) {
  return (
    <Card sx={{ maxWidth: 300, marginBottom: 2, marginInline: 2 }}>
      <CardContent>
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

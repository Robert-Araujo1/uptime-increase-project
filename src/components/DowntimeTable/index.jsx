import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(customer, machinePin, location, downtimeDays, dtc) {
  return { customer, machinePin, location, downtimeDays, dtc };
}

const rows = [
  createData('Customer 1', '1BZ524KAVJD000000', 'Recife, PE', 6, 'Nenhum'),
  createData(
    'Customer 2',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
];

export default function () {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a downtime table'>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align='right'>Machine PIN</TableCell>
            <TableCell align='right'>Localização</TableCell>
            <TableCell align='right'>Downtime days</TableCell>
            <TableCell align='right'>DTC</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.customer}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.customer}
              </TableCell>
              <TableCell align='right'>{row.machinePin}</TableCell>
              <TableCell align='right'>{row.location}</TableCell>
              <TableCell align='right'>{row.downtimeDays}</TableCell>
              <TableCell align='right'>{row.dtc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

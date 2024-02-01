import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Box from '@mui/material/Box';

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
    <Paper>
      <Box>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='h7'
            id='tableTitle'
            component='div'
            fontWeight='bold'>
            Machines
          </Typography>
          <Tooltip title='Filter List'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Box>

      <TableContainer component={Paper} sx={{ height: 300 }}>
        <Table size='small' aria-label='a downtime table'>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align='center'>Machine PIN</TableCell>
              <TableCell align='center'>Localização</TableCell>
              <TableCell align='center'>Downtime days</TableCell>
              <TableCell align='center'>DTC</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Note</TableCell>
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
                <TableCell align='center'>{row.machinePin}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>
                <TableCell align='center'>{row.downtimeDays}</TableCell>
                <TableCell align='center'>{row.dtc}</TableCell>
                <TableCell align='center'>
                  <StatusSelection />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const StatusSelection = () => {
  return (
    <div class='dropdow'>
      <a
        class='btn btn-secondary dropdown-toggle btn-sm'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        Selecione o status
      </a>

      <ul class='dropdown-menu dropdown-menu-lg-end'>
        <li>
          <a class='dropdown-item' href='#'>
            Atendido
          </a>
        </li>
        <li>
          <a class='dropdown-item' href='#'>
            Em atendimento
          </a>
        </li>
        <li>
          <a class='dropdown-item' href='#'>
            Não atendido
          </a>
        </li>
      </ul>
    </div>
  );
};

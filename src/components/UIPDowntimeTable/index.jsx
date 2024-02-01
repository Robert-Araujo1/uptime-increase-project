import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

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
  createData(
    'Customer 3',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 4',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 5',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 6',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
  createData(
    'Customer 7',
    '1BZ310PXHJD000000',
    'Maceió, AL',
    5,
    'AMARELO TCU 000525.00'
  ),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bolder',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UIPDowntimeTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [page, setPage] = React.useState(0);
  const open = Boolean(anchorEl);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
          <Box>
            <TextField
              variant='outlined'
              label='Pesquisar'
              size='small'
              sx={{ marginX: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title='Filtro'>
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Mais'>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Adicionar equipamento</MenuItem>
            <MenuItem onClick={handleClose}>Exportar</MenuItem>
          </Menu>
        </Toolbar>
      </Box>

      <TableContainer component={Paper} sx={{ height: 370, marginTop: 1 }}>
        <Table size='small' aria-label='a downtime table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell align='center'>Machine PIN</StyledTableCell>
              <StyledTableCell align='center'>Localização</StyledTableCell>
              <StyledTableCell align='center'>Downtime days</StyledTableCell>
              <StyledTableCell align='center'>DTC</StyledTableCell>
              <StyledTableCell align='center'>Status</StyledTableCell>
              <StyledTableCell align='center'>Note</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow
                key={row.customer}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' width='30%'>
                  {row.customer}
                </TableCell>
                <TableCell align='center'>{row.machinePin}</TableCell>
                <TableCell align='center'>{row.location}</TableCell>
                <TableCell align='center' width='20%'>
                  {row.downtimeDays}
                </TableCell>
                <TableCell align='center'>{row.dtc}</TableCell>
                <TableCell align='center'>
                  <StatusSelection />
                </TableCell>
                <TableCell align='center'>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={7}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handlePageChange}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bolder',
    color: 'var(--light-text)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'var(--light-text)',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: 'var(--dark-selection)',
  },
}));

import { useState, useContext } from 'react';
import {
  TableFilterContext,
  ToggleFilterContext,
} from '../../../contexts/dashboard';
import { dateFilterItems, statusFilterItems } from '../constants';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import i18next from '../../../i18n/i18n';
import TextField from '@mui/material/TextField';
import FilterSelect from './FilterSelect';
import FilterMultipleSelect from './FilterMultipleSelect';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from 'react-router-dom';

export default () => {
  const [display, setDisplay] = useState('none');

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <ToggleFilterContext.Provider value={{ display, setDisplay }}>
      <Box sx={{ background: 'var(--dark-background-2)' }}>
        <Toolbar sx={styles.ToolBar}>
          <Typography
            variant='h7'
            id='tableTitle'
            component='div'
            color={'var(--light-text)'}
            fontWeight='bold'>
            {i18next.t('home.machines.table.tableTitle')}
          </Typography>
          <Box>
            {id && (
              <Button
                size='small'
                startIcon={<ClearIcon />}
                color='error'
                onClick={() => navigate('/home/machines')}>
                Remover seleção
              </Button>
            )}
            <ToolbarOptions />
          </Box>
        </Toolbar>
        <Box sx={{ display: display, ...styles.Filters }}>
          <FilterOptions />
        </Box>
      </Box>
    </ToggleFilterContext.Provider>
  );
};

const ToolbarOptions = () => {
  const [filterBtnBg, setFilterBtnBg] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const { setDisplay } = useContext(ToggleFilterContext);
  const open = Boolean(anchorEl);

  const toggleSearchFieldVisibility = () => {
    setDisplay((prev) => (prev == 'flex' ? 'none' : 'flex'));
    setFilterBtnBg((prev) => (prev == '' ? 'var(--dark-selection)' : ''));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip
        title={i18next.t('home.machines.table.filterBtnName')}
        sx={{ marginX: 2, backgroundColor: filterBtnBg }}>
        <IconButton
          sx={{ color: 'var(--light-text)' }}
          onClick={toggleSearchFieldVisibility}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={i18next.t('home.machines.table.moreVertBtnName')}>
        <IconButton sx={{ color: 'var(--light-text)' }} onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          {i18next.t('home.machines.table.addEquipOption')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {i18next.t('home.machines.table.exportOption')}
        </MenuItem>
      </Menu>
    </>
  );
};

const FilterOptions = () => {
  const { setFilter } = useContext(TableFilterContext);

  return (
    <>
      <TextField
        className='search-input-table'
        label={i18next.t('home.machines.filter.searchLabel')}
        size='small'
        sx={{
          width: '95%',
          borderRadius: 1,
        }}
        InputLabelProps={{ style: { color: 'var(--light-text)' } }}
        inputProps={{ style: { color: 'var(--light-text)' } }}
        onChange={(event) => setFilter({ search: event.target.value })}
        data-testid='search-input'
      />
    </>
  );
};

const styles = {
  Filters: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginY: 1,
  },
  ToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};

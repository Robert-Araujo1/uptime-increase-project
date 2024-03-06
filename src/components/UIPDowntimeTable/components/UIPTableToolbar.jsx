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

export default () => {
  const [display, setDisplay] = useState('none');

  return (
    <ToggleFilterContext.Provider value={{ display, setDisplay }}>
      <Box>
        <Toolbar sx={styles.ToolBar}>
          <Typography
            variant='h7'
            id='tableTitle'
            component='div'
            fontWeight='bold'>
            {i18next.t('home.machines.table.tableTitle')}
          </Typography>
          <Box>
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
    setFilterBtnBg((prev) => (prev == '' ? 'rgba(0, 0, 0, .12)' : ''));
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
        <IconButton onClick={toggleSearchFieldVisibility}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={i18next.t('home.machines.table.moreVertBtnName')}>
        <IconButton onClick={handleClick}>
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
        label={i18next.t('home.machines.filter.searchLabel')}
        size='small'
        sx={{ width: '95%' }}
        onChange={(event) => setFilter({ search: event.target.value })}
      />
      <FilterSelect
        values={dateFilterItems}
        inputLabel={i18next.t('home.machines.filter.dateLabel')}
        labelId={'date-select-label'}
        selectId={'date-select'}
      />
      <FilterMultipleSelect
        values={statusFilterItems}
        inputLabel={i18next.t('home.machines.filter.statusLabel')}
        labelId={'status-select-label'}
        selectId={'status-select'}
      />
      <FilterMultipleSelect
        values={['Pernambuco', 'Alagoas', 'Sergipe', 'Bahia', 'Paraíba']}
        inputLabel={i18next.t('home.machines.filter.stateLabel')}
        labelId={'state-select-label'}
        selectId={'state-select'}
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

import { useState, useContext } from 'react';
import { TableFilterContext } from '../../../contexts/dashboard';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import i18next from '../../../i18n/i18n';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import FilterSelect from './FilterSelect';
import FilterMultipleSelect from './FilterMultipleSelect';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState('none');
  const [searchBtnBg, setSearchBtnBg] = useState('');

  const { filter, setFilter } = useContext(TableFilterContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleSearchFieldVisibility = () => {
    setDisplay((prev) => (prev == 'flex' ? 'none' : 'flex'));
    setSearchBtnBg((prev) => (prev == '' ? 'rgba(0, 0, 0, .12)' : ''));
  };

  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        <Typography
          variant='h7'
          id='tableTitle'
          component='div'
          fontWeight='bold'>
          {i18next.t('home.dashboard.tableTitle')}
        </Typography>
        <Box>
          <Tooltip
            title={i18next.t('home.dashboard.filterBtnName')}
            sx={{ marginX: 2, backgroundColor: searchBtnBg }}>
            <IconButton onClick={toggleSearchFieldVisibility}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={i18next.t('home.dashboard.moreVertBtnName')}>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            {i18next.t('home.dashboard.addEquipOption')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {i18next.t('home.dashboard.exportOption')}
          </MenuItem>
        </Menu>
      </Toolbar>
      <Box sx={{ display: display, ...stdStyle }}>
        <TextField
          label='Pesquisar'
          size='small'
          sx={{ width: '95%' }}
          onChange={(event) => setFilter({ search: event.target.value })}
        />
      </Box>
      <Box sx={{ display: display, ...stdStyle }}>
        <FilterSelect
          values={[
            'Em qualquer data',
            'Na última semana',
            'No último mês',
            'Nos últimos 6 meses',
            'Personalizado',
          ]}
          inputLabel={'Data'}
          labelId={'date-select-label'}
          selectId={'date-select'}
        />
        <FilterMultipleSelect
          values={['Concluídos', 'Em andamento', 'Não iniciados']}
          inputLabel={'Status'}
          labelId={'status-select-label'}
          selectId={'status-select'}
        />
        <FilterMultipleSelect
          values={['Pernambuco', 'Alagoas', 'Sergipe', 'Bahia', 'Paraíba']}
          inputLabel={'Estado'}
          labelId={'state-select-label'}
          selectId={'state-select'}
        />
      </Box>
    </Box>
  );
};

const stdStyle = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginY: 1,
};

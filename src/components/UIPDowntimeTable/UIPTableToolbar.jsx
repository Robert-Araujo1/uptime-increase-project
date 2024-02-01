import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        variant='h7'
        id='tableTitle'
        component='div'
        fontWeight='bold'>
        Machines
      </Typography>
      <Box>
        <Tooltip title='Filtro' sx={{ marginX: 2 }}>
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
  );
};

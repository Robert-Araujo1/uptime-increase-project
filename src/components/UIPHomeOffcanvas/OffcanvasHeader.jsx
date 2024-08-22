import { ToggleTheme } from '../../utils/themes';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default () => {
  return (
    <div className='offcanvas-header'>
      <h5
        className='offcanvas-title'
        id='homeOffcanvas'
        style={{ color: 'var(--light-text)' }}>
        Menu
      </h5>
      <ToggleTheme />
      <IconButton data-bs-dismiss='offcanvas' aria-label='Close'>
        <CloseIcon sx={{ color: 'var(--light-text)' }} />
      </IconButton>
    </div>
  );
};

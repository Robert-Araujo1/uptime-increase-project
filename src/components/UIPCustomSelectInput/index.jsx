import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles';

export default ({ items, label, ...props }) => {
  const inputProps = {
    sx: {
      color: 'var(--light-text)',
      accentColor: 'var(--light-text)',
      '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: 'var(--disabled-input-color)', // (default alpha is 0.38)
      },
    },
  };
  const InputLabelProps = {
    style: { color: 'var(--light-text)' },
    shrink: true,
  };

  return (
    <TextField
      required
      size='small'
      defaultValue={''}
      InputProps={inputProps}
      InputLabelProps={InputLabelProps}
      sx={styles.select}
      select
      label={label}
      {...props}>
      {items.map((item, index) => (
        <MenuItem key={index} value={item.type}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

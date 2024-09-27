import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles';

export default ({ items, label, ...props }) => {
  const inputProps = {
    style: { color: 'var(--light-text)', accentColor: 'var(--light-text)' },
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
        <MenuItem key={index} value={item}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

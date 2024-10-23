import TextField from '@mui/material/TextField';
export default ({ id, label, height = 20, maxLength = 100, ...props }) => (
  <TextField
    required
    fullWidth
    label={label}
    size='small'
    id={id}
    InputLabelProps={{ style: { color: 'var(--light-text)' }, shrink: true }}
    inputProps={{
      style: { color: 'var(--light-text)', height: height },
      maxLength: maxLength,
    }}
    sx={{ marginBottom: 3 }}
    {...props}
  />
);

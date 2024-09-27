import TextField from '@mui/material/TextField';
export default ({ id, label, height, maxLength, ...props }) => (
  <TextField
    required
    fullWidth
    label={label}
    size='small'
    id={id}
    InputLabelProps={{ style: { color: 'var(--light-text)' }, shrink: true }}
    inputProps={{
      style: { color: 'var(--light-text)', height: height || 20 },
      maxLength: maxLength || 100,
    }}
    sx={{ marginBottom: 3 }}
    {...props}
  />
);

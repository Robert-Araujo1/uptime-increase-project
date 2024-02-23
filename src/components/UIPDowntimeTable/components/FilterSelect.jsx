import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default ({ values, inputLabel, labelId, selectId }) => {
  const [statusSelected, setStatusSelected] = useState(values[0]);
  const handleChange = (event) => {
    setStatusSelected(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel id={labelId}>{inputLabel}</InputLabel>
      <Select
        label={inputLabel}
        value={statusSelected}
        labelId={labelId}
        id={selectId}
        size='small'
        sx={{ minWidth: 150 }}
        onChange={handleChange}>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

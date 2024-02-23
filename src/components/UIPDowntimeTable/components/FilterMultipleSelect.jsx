import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export default ({ values, inputLabel, labelId, selectId }) => {
  const [valuesSelected, setValuesSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value[value.length - 1] === 'all') {
      setValuesSelected(valuesSelected.length === values.length ? [] : values);
      return;
    }
    setValuesSelected(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel size='small' id={labelId}>
        {inputLabel}
      </InputLabel>
      <Select
        labelId={labelId}
        label={inputLabel}
        id={selectId}
        multiple
        value={valuesSelected}
        onChange={handleChange}
        size='small'
        renderValue={(selected) => selected.join(', ')}>
        <MenuItem value={'all'}>
          <Checkbox
            checked={
              values.length > 0 && valuesSelected.length === values.length
            }
            indeterminate={
              valuesSelected.length > 0 && valuesSelected.length < values.length
            }
          />
          <ListItemText primary={'Todos'} />
        </MenuItem>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={valuesSelected.indexOf(value) > -1} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

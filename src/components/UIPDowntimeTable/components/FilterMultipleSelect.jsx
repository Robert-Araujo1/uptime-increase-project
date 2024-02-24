import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import i18next from '../../../i18n/i18n';

export default ({ values, inputLabel, labelId, selectId }) => {
  const [valuesSelected, setValuesSelected] = useState(values);

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
    <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        renderValue={(selected) =>
          selected.length < 2
            ? selected
            : selected.length === values.length
              ? i18next.t('home.dashboard.filter.allItem')
              : i18next.t('home.dashboard.filter.severalItemsSelected')
        }>
        <MenuItem value={'all'}>
          <Checkbox
            checked={
              values.length > 0 && valuesSelected.length === values.length
            }
            indeterminate={
              valuesSelected.length > 0 && valuesSelected.length < values.length
            }
          />
          <ListItemText primary={i18next.t('home.dashboard.filter.allItem')} />
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

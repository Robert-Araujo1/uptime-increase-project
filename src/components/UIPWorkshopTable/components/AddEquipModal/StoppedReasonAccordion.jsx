import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { failureItems, statusItems } from '../../constants/items';
import Box from '@mui/material/Box';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import UIPAccordion from '../../../UIPAccordion';
import styles from '../../styles';
import { useState } from 'react';

export default () => {
  const [failure, setFailure] = useState('');
  const handleChange = (e) => setFailure(e.target.value.type);
  const handleDayOfWeek = (day) => {
    switch (day) {
      case 'Do':
      case '1':
        return 'D';
      case '2':
      case '2ª':
        return 'S';
      case '3':
      case '3ª':
        return 'T';
      case '4':
      case '4ª':
        return 'Q';
      case '5':
      case '5ª':
        return 'Q';
      case '6':
      case '6ª':
      case 'Sá':
        return 'S';
      default:
        return day;
    }
  };
  const datePickerProps = {
    textField: {
      size: 'small',
      InputLabelProps: {
        shrink: true,
        required: true,
        style: { color: 'var(--light-text)' },
      },
      InputProps: { style: { color: 'var(--light-text)' } },
    },
    openPickerButton: { style: { color: 'var(--light-text)' } },
  };

  return (
    <UIPAccordion defaultExpanded title='Informações da Parada'>
      <UIPCustomSelectInput items={statusItems} label='Status do Serviço' />
      <Box sx={styles.addEquipModal.pickers}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
          <DatePicker
            size='small'
            defaultValue={dayjs()}
            label='Data da Parada'
            dayOfWeekFormatter={handleDayOfWeek}
            slotProps={datePickerProps}
            disableFuture
          />
          <DatePicker
            size='small'
            label='Data Prevista para Liberação'
            dayOfWeekFormatter={handleDayOfWeek}
            slotProps={datePickerProps}
            disablePast
          />
        </LocalizationProvider>
      </Box>
      <Box sx={styles.addEquipModal.inlineInputs}>
        <UIPCustomSelectInput
          items={failureItems}
          label='Tipo da Falha'
          onChange={handleChange}
        />
        {failure === 'other' && (
          <UIPCustomModalInput
            label='Especifique a falha'
            id='other-failure-type-details'
            sx={{ marginLeft: 2 }}
          />
        )}
      </Box>
      <UIPCustomModalInput
        required={false}
        id='failure-description-input'
        label='Descrição da Falha'
        height={100}
        multiline
        helperText={'0/150 caracteres'}
        sx={styles.addEquipModal.inputModal}
      />
    </UIPAccordion>
  );
};

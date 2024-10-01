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
import handleDayOfWeek from './utils/handleDayOfWeek';
import { datePickerProps } from '../../constants/props';
import { useDispatch } from 'react-redux';
import { updateWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';
import { useState } from 'react';

export default () => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleServiceStatusChange = (e) => {
    const payload = { type: 'LastServiceStatus', value: e.target.value.type };
    dispatch(updateWMOrder(payload));
  };
  const handleMachineStoppedSinceChange = (e) => {
    const dt = e.format('YYYY-MM-DD');
    const payload = { type: 'MachineStoppedSince', value: dt };
    dispatch(updateWMOrder(payload));
  };
  const handleExpectedDateToFinish = (e) => {
    const tz = 'America/Sao_Paulo';
    const format = 'YYYY-MM-DDTHH:mm:ss.SSS';
    const ts = dayjs().tz(tz).format(format);

    const payload = { type: 'ExpectedDateToFinish', value: ts };
    dispatch(updateWMOrder(payload));
  };
  const handleFailureTypeChange = (e) => {
    const payload = { type: 'LastFailureType', value: e.target.value.type };
    dispatch(updateWMOrder(payload));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const payload = { type: 'LastServiceDescription', value: e.target.value };
    dispatch(updateWMOrder(payload));
  };

  return (
    <UIPAccordion defaultExpanded title='Informações da Parada'>
      <UIPCustomSelectInput
        items={statusItems}
        label='Status do Serviço'
        onChange={handleServiceStatusChange}
      />
      <Box sx={styles.addEquipModal.pickers}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
          <DatePicker
            size='small'
            label='Data da Parada'
            dayOfWeekFormatter={handleDayOfWeek}
            slotProps={datePickerProps}
            onChange={handleMachineStoppedSinceChange}
            disableFuture
          />
          <DatePicker
            size='small'
            onChange={handleExpectedDateToFinish}
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
          onChange={handleFailureTypeChange}
        />
      </Box>
      <UIPCustomModalInput
        id='failure-description-input'
        label='Descrição do Serviço'
        height={100}
        maxLength={150}
        multiline
        onChange={handleDescriptionChange}
        helperText={`${description.length}/150 caracteres`}
        sx={styles.addEquipModal.inputModal}
      />
    </UIPAccordion>
  );
};

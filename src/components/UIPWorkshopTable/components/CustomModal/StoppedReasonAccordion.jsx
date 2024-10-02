import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { failureItems, statusItems } from '../../constants/items';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import UIPAccordion from '../../../UIPAccordion';
import styles from '../../styles';
import handleDayOfWeek from './utils/handleDayOfWeek';
import { datePickerProps } from '../../constants/props';
import { useDispatch, useSelector } from 'react-redux';
import { updateWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';
import { useState } from 'react';
import CustomTooltip from './CustomTooltip';

export default ({ title }) => {
  const order = useSelector((state) => state.wmOrder.order);

  const [description, setDescription] = useState(
    order?.LastServiceDescription || ''
  );
  const dispatch = useDispatch();

  const handleServiceStatusChange = (e) => {
    const payload = { type: 'LastServiceStatus', value: e.target.value };
    dispatch(updateWMOrder(payload));
  };
  const handleMachineStoppedSinceChange = (e) => {
    if (e) {
      const dt = e.format('YYYY-MM-DD');
      const payload = { type: 'MachineStoppedSince', value: dt };
      dispatch(updateWMOrder(payload));
    }
  };
  const handleExpectedDateToFinish = (e) => {
    if (e) {
      const tz = 'America/Sao_Paulo';
      const format = 'YYYY-MM-DDTHH:mm:ss.SSS';
      const ts = e.tz(tz).format(format);

      const payload = { type: 'ExpectedDateToFinish', value: ts };
      dispatch(updateWMOrder(payload));
    }
  };
  const handleFailureTypeChange = (e) => {
    const payload = { type: 'LastFailureType', value: e.target.value };
    dispatch(updateWMOrder(payload));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const payload = { type: 'LastServiceDescription', value: e.target.value };
    dispatch(updateWMOrder(payload));
  };

  const handleDefaultDate = (value) => (value ? dayjs(value) : null);

  const tooltipTitle =
    title === 'Editar Equipamento'
      ? 'Para atualizar o status, selecione a opção "Atualizar Status" no menu superior da tabela.'
      : null;

  return (
    <UIPAccordion defaultExpanded title='Informações da Parada'>
      <CustomTooltip followCursor title={tooltipTitle}>
        <Box>
          <UIPCustomSelectInput
            items={statusItems}
            label='Status do Serviço'
            disabled={title === 'Editar Equipamento'}
            value={order?.LastServiceStatus ?? ''}
            onChange={handleServiceStatusChange}
          />
        </Box>
      </CustomTooltip>
      <Box sx={styles.CustomModal.pickers}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
          <DatePicker
            size='small'
            label='Data da Parada'
            dayOfWeekFormatter={handleDayOfWeek}
            defaultValue={handleDefaultDate(order?.MachineStoppedSince)}
            slotProps={datePickerProps}
            onChange={handleMachineStoppedSinceChange}
            disableFuture
          />
          <DatePicker
            size='small'
            onChange={handleExpectedDateToFinish}
            label='Data Prevista para Liberação'
            defaultValue={handleDefaultDate(order?.ExpectedDateToFinish)}
            dayOfWeekFormatter={handleDayOfWeek}
            slotProps={datePickerProps}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={styles.CustomModal.inlineInputs}>
        <UIPCustomSelectInput
          items={failureItems}
          value={order?.LastFailureType ?? ''}
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
        defaultValue={order?.LastServiceDescription || ''}
        onChange={handleDescriptionChange}
        helperText={`${description.length}/150 caracteres`}
        sx={styles.CustomModal.inputModal}
      />
    </UIPAccordion>
  );
};

import UIPAccordion from '../../../UIPAccordion';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import Box from '@mui/material/Box';
import styles from '../../styles';
import { locationItems } from '../../constants/items';
import { useDispatch, useSelector } from 'react-redux';
import { updateWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';

export default () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.wmOrder.order);

  const handleMachineVinChange = (e) => {
    dispatch(updateWMOrder({ type: 'MachineVin', value: e.target.value }));
  };
  const handleMachineEngineHoursChange = (e) => {
    dispatch(
      updateWMOrder({ type: 'MachineEngineHours', value: e.target.value })
    );
  };
  const handleLocationChange = (e) => {
    dispatch(updateWMOrder({ type: 'MachineLocation', value: e.target.value }));
  };
  const handleCustomerNameChange = (e) => {
    dispatch(updateWMOrder({ type: 'CustomerName', value: e.target.value }));
  };
  return (
    <UIPAccordion title='Informações do Equipamento' defaultExpanded>
      <Box sx={styles.CustomModal.inlineInputs}>
        <UIPCustomModalInput
          id='machine-vin-input'
          defaultValue={order?.MachineVin || ''}
          label='Chassi da Máquina'
          onChange={handleMachineVinChange}
          sx={{ marginRight: 2 }}
        />
        <UIPCustomModalInput
          id='machine-engine-hours-input'
          defaultValue={order?.MachineEngineHours || ''}
          label='Horímetro'
          onChange={handleMachineEngineHoursChange}
          type='number'
          fullWidth={false}
        />
      </Box>
      <UIPCustomSelectInput
        id='location-machine-select'
        value={order?.MachineLocation ?? ''}
        label='Local da Máquina'
        onChange={handleLocationChange}
        items={locationItems}
      />
      <UIPCustomModalInput
        id='customer-name-input'
        defaultValue={order?.CustomerName || ''}
        label='Nome do Cliente'
        onChange={handleCustomerNameChange}
      />
    </UIPAccordion>
  );
};

import UIPAccordion from '../../../UIPAccordion';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import Box from '@mui/material/Box';
import styles from '../../styles';
import { locationItems } from '../../constants/items';
export default () => {
  return (
    <UIPAccordion title='Informações do Equipamento' defaultExpanded>
      <Box sx={styles.addEquipModal.inlineInputs}>
        <UIPCustomModalInput
          id='machine-vin-input'
          label='Chassi da Máquina'
          sx={{ marginRight: 2 }}
        />
        <UIPCustomModalInput
          id='machine-engine-hours-input'
          label='Horímetro'
          type='number'
          fullWidth={false}
        />
      </Box>
      <UIPCustomSelectInput
        id='location-machine-select'
        label='Local da Máquina'
        items={locationItems}
      />
      <UIPCustomModalInput id='customer-name-input' label='Nome do Cliente' />
    </UIPAccordion>
  );
};

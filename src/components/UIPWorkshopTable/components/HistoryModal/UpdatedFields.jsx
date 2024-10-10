import translateFields from './utils/translateFields';
import translateItems from './utils/translateItems';
import styles from '../../styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import * as constants from '../../constants/items';

export default ({ field }) => {
  let fieldTypes = {};

  if (field.Field == 'LastFailureType') {
    fieldTypes = translateItems(constants.failureItems, field);
  } else if (field.Field == 'MachineLocation') {
    fieldTypes = translateItems(constants.locationItems, field);
  } else if (field.Field == 'LastServiceStatus') {
    fieldTypes = translateItems(constants.statusItems, field);
  } else if (field.Field == 'Responsible') {
    fieldTypes = translateItems(constants.responsibleItems, field);
  } else if (field.Field == 'Company') {
    fieldTypes = translateItems(constants.companyItems, field);
  } else if (
    field.Field == 'MachineStoppedSince' ||
    field.Field == 'ExpectedDateToFinish'
  ) {
    fieldTypes = {
      NewValue: dayjs(field.NewValue).format('DD/MM/YYYY'),
      OldValue: dayjs(field.OldValue).format('DD/MM/YYYY'),
    };
  } else if (field.Field == 'LastServiceStatusUserRole') {
    return null;
  }

  return (
    <Box
      sx={{
        borderRadius: 1,
        mb: 1,
        p: 1,
        textAlign: 'center',
        background: 'var(--dark-background-2)',
        border: '1px groove var(--gray-background)',
      }}>
      <Typography sx={styles.historyAccordion.detailsTitle2}>
        {translateFields(field.Field)}
      </Typography>
      <Divider
        variant='middle'
        sx={{ borderColor: 'var(--tooltip-background)', opacity: 0.25, mb: 1 }}
      />
      <Typography sx={styles.historyAccordion.oldValue}>
        {fieldTypes?.OldValue ?? field.OldValue}
      </Typography>
      <Typography sx={styles.historyAccordion.newValue}>
        {fieldTypes?.NewValue ?? field.NewValue}
      </Typography>
    </Box>
  );
};

import { useState } from 'react';
import { handleStatus } from '../../../UIPNewDowntimeTable/components/ServiceStatus';
import { inputProps } from './utils/props';
import dayjs from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import styles from '../../styles';

export default ({
  children,
  timestamp,
  status,
  type = undefined,
  ...others
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => setExpanded(!expanded);

  const ts = dayjs(timestamp).format('DD/MM/YYYY, HH:mm');
  const st = handleStatus(status);

  const expandIcon = expanded ? (
    <RemoveIcon sx={styles.CustomModal.title} />
  ) : (
    <AddIcon sx={styles.CustomModal.title} />
  );
  const situation = `${ts} - ${type == 'EDIT ENTRY' ? 'Edição de informações' : st.text}`;

  return (
    <Box sx={styles.historyAccordion.container}>
      <CircleIcon sx={{ color: st.color, ...styles.historyAccordion.circle }} />
      <Accordion sx={styles.historyAccordion.accordion} onChange={handleChange}>
        <AccordionSummary expandIcon={expandIcon}>
          <Typography sx={styles.CustomModal.title}>{situation}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UIPCustomModalInput
            label={'Usuário Responsável pela Alteração'}
            variant='standard'
            required={false}
            sx={{ marginBottom: 2 }}
            value={others?.User}
            disabled
            InputProps={inputProps}
          />
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

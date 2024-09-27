import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

export default ({ title, children, defaultExpanded }) => (
  <Accordion
    defaultExpanded={defaultExpanded || false}
    sx={{
      backgroundColor: 'var(--dark-background-2)',
      color: 'var(--light-text)',
    }}>
    <AccordionSummary
      expandIcon={<ExpandMore sx={{ color: 'var(--light-text)' }} />}>
      <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

import { SxProps } from '@mui/material';

interface PopsStyleProps {
  formsContainer: SxProps;
}

const styles: PopsStyleProps = {
  formsContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '70dvh',
    overflow: 'auto',
  },
};

export default styles;

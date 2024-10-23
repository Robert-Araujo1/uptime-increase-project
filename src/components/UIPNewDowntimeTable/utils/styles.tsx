import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

type ModalItemsProps = {
  container: SxProps;
  machine: SxProps;
  icon: CSSProperties;
  description?: SxProps;
};

type CustomModalProps = {
  header: SxProps;
  title: SxProps;
};

type ServiceHistoryModalProps = {
  tag: SxProps;
  circle: SxProps;
  tagContainer: SxProps;
  tagTitle: SxProps;
};

interface Styles {
  dataGrid: SxProps;
  modal: CustomModalProps;
  machineHistoryModal: ModalItemsProps;
  completeServiceModal: ModalItemsProps;
  serviceHistoryModal: ServiceHistoryModalProps;
}

const styles: Styles = {
  dataGrid: {
    background: 'var(--dark-background-2)',
    color: 'var(--light-text)',
    cursor: 'pointer',
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
      outline: 'none !important',
    },
  },
  modal: {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    title: {
      color: 'var(--light-text)',
    },
  },
  machineHistoryModal: {
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    },
    machine: {
      display: 'flex',
      flexDirection: 'column',
      padding: 2,
      marginX: 1,
      maxWidth: 300,
    },
    icon: {
      height: 40,
      width: 40,
      marginRight: 14,
    },
  },
  completeServiceModal: {
    container: {
      width: '90%',
      maxWidth: 600,
      height: '75dvh',
      backgroundColor: 'var(--dark-bg-modal)',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: 24,
      overflow: 'auto',
      p: 2,
      borderRadius: 2,
    },
    machine: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 1,
    },
    icon: {
      height: 51,
      width: 51,
    },
    description: {
      '.MuiFormHelperText-root': {
        color: 'var(--light-text)',
        textAlign: 'right',
      },
    },
  },
  serviceHistoryModal: {
    tagContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    tag: {
      background: '#187d99',
      color: '#94d8eb',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      px: 1,
      mb: 2,
    },
    circle: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.8)',
    },
    tagTitle: {
      width: '100%',
      textAlign: 'center',
      pr: 1,
      pl: 3,
    },
  },
};

export default styles;

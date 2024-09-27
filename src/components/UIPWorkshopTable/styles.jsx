export default {
  addEquipModal: {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap-reverse',
      marginBottom: 2,
    },
    title: { color: 'var(--light-text)' },
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
    inlineInputs: { display: 'flex', justifyContent: 'space-between' },
    inputModal: {
      '.MuiFormHelperText-root': {
        color: 'var(--light-text)',
        textAlign: 'right',
      },
    },
    pickers: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
  },
  dataGrid: {
    background: 'var(--dark-background-2)',
    color: 'var(--light-text)',
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
      outline: 'none !important',
    },
  },
};

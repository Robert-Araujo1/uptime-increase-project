export default {
  CustomModal: {
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
  historyAccordion: {
    container: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      mb: 2,
    },
    circle: { fontSize: 12, marginRight: 1 },
    accordion: { backgroundColor: 'var(--dark-background)', width: '100%' },
    detailsTitle1: {
      textAlign: 'center',
      mb: 2,
      fontSize: 17,
      color: 'var(--light-text)',
    },
    detailsTitle2: {
      textAlign: 'center',
      fontSize: 14,
      color: 'var(--light-text)',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    oldValue: { textDecoration: 'line-through', color: 'red' },
    newValue: { color: 'var(--hybrid-green)' },
  },
};

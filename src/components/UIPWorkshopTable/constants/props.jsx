export const datePickerProps = {
  textField: {
    size: 'small',
    required: true,
    InputLabelProps: {
      shrink: true,
      required: true,
      style: { color: 'var(--light-text)' },
    },
    InputProps: { style: { color: 'var(--light-text)' } },
  },
  openPickerButton: { style: { color: 'var(--light-text)' } },
};

export const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 20,
    },
  },
  sorting: {
    sortModel: [{ field: 'StoppedDays', sort: 'desc' }],
  },
};

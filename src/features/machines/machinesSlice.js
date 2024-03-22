import { createSlice } from '@reduxjs/toolkit';

export const machinesSlice = createSlice({
  name: 'machines',
  initialState: { value: [] },
  reducers: {
    updateMachines: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateMachines } = machinesSlice.actions;

export default machinesSlice.reducer;

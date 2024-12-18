import { createSlice } from '@reduxjs/toolkit';

export const popsMachinesSlice = createSlice({
  name: 'pops',
  initialState: { value: [] },
  reducers: {
    setPopsMachines: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPopsMachines } = popsMachinesSlice.actions;

export default popsMachinesSlice.reducer;

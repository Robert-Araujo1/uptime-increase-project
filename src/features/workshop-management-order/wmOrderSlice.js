import { createSlice } from '@reduxjs/toolkit';

export const wmOrderSlice = createSlice({
  name: 'wmOrder',
  initialState: { order: {} },
  reducers: {
    updateWMOrder: (state, action) => {
      const currentState = { ...state.order };
      currentState[action.payload.type] = action.payload.value;
      return { order: currentState };
    },
    clearWMOrder: () => {
      return { order: {} };
    },
  },
});

export const { updateWMOrder, clearWMOrder } = wmOrderSlice.actions;

export default wmOrderSlice.reducer;

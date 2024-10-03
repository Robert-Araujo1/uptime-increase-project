import { createSlice } from '@reduxjs/toolkit';

export const wmOrderSlice = createSlice({
  name: 'wmOrder',
  initialState: { order: {} },
  reducers: {
    addWMOrder: (state, action) => {
      return { order: action.payload };
    },
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

export const { updateWMOrder, clearWMOrder, addWMOrder } = wmOrderSlice.actions;

export default wmOrderSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from '../features/machines/machinesSlice';

export default configureStore({
  reducer: { machines: machinesReducer },
});

import { configureStore } from '@reduxjs/toolkit';
import machinesReducer from '../features/machines/machinesSlice';
import wmOrderReducer from '../features/workshop-management-order/wmOrderSlice';
import popsMachinesReducer from '../features/pops/popsMachinesSlice';
export default configureStore({
  reducer: {
    machines: machinesReducer,
    wmOrder: wmOrderReducer,
    pops: popsMachinesReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import stackReducer from '../features/stack/stackSlice';
import cellReducer from '../features/cell/cellSlice'

export const store = configureStore({
  reducer: {
    stack: stackReducer,
    cell: cellReducer,
  },
});

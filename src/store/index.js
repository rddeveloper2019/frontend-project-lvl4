import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './ChatSlice.js';

const store = configureStore({
  reducer: {
    chatstore: chatReducer,
  },
});

export default store;

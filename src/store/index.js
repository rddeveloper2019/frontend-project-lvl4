import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './ChatSlice.js';
import modalReducer from './ModalSlice.js';

const store = configureStore({
  reducer: {
    chatstore: chatReducer,
    modalstore: modalReducer,
  },
});

export default store;

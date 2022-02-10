import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './ChannelsSlice.js';
import modalReducer from './ModalSlice.js';
import messagesReducer from './MessagesSlice.js';

const store = configureStore({
  reducer: {
    channelsstore: channelsReducer,
    modalstore: modalReducer,
    messagesstore: messagesReducer,
  },
});

export default store;

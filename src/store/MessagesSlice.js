/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getCleaned from '../services/getCleaned.js';

const MessagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(getCleaned(action.payload));
    },
    fetchMessages: (state, action) => {
      const fetchedMessages = action.payload;
      state.messages = fetchedMessages.map(getCleaned);
    },
    removeMessages: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((msg) => msg.channelId !== id);
    },

  },

});

const { reducer } = MessagesSlice;
const { addMessage, removeMessages, fetchMessages } = MessagesSlice.actions;

export {
  addMessage, removeMessages, fetchMessages,
};
export default reducer;

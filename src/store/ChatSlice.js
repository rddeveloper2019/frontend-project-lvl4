/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenServices from '../services/tokenServices.js';
import pathes from '../routes.js';

const { getTokenFromLocal } = tokenServices;

const initChat = createAsyncThunk('chatstore/init', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      pathes.dataPath(), {
        headers: {
          Authorization: `Bearer ${getTokenFromLocal()}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Server Error!');
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const chatSlice = createSlice({
  name: 'chatstore',
  initialState: {
    channels: [],
    messages: [],
    users: [],
    currentChannelId: 1,
    channelsFetchState: null,
    channelsFetchError: null,

  },
  reducers: {
    sayHello: () => {
      console.log('Hello');
    },
  },

  extraReducers: {
    [initChat.pending]: (state) => {
      state.channelsFetchState = 'loading';
      state.channelsFetchError = null;
    },

    [initChat.fulfilled]: (state, action) => {
      const { channels, currentChannelId, messages } = action.payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.messages = messages;
      state.channelsFetchState = 'resolved';
      state.channelsFetchError = null;
    },
    [initChat.rejected]: (state, action) => {
      state.channelsFetchState = 'rejected';
      state.channelsFetchError = action.payload;
    },

  },

});

const { reducer } = chatSlice;
const { sayHello } = chatSlice.actions;

export { sayHello, initChat };
export default reducer;

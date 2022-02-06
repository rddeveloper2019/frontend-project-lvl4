/* eslint-disable max-len */
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
          Authorization: `Bearer ${getTokenFromLocal().token}`,
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
    currentChannelId: null,
    selectedChannelId: null,
    channelsFetchState: null,
    channelsFetchError: null,

  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    setSelectedChannel: (state, action) => {
      console.log(action);
      state.selectedChannelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addChannel: (state, action) => {
      console.log('addChannel slice: ', action.payload);
      state.channels.push(action.payload);
      state.currentChannelId = action.payload.id;
    },
    renameChannel: (state, action) => {
      const updatedChannel = action.payload;
      state.channels = state.channels.map((c) => {
        if (c.id === updatedChannel.id) {
          c.name = updatedChannel.name;
        }
        return c;
      });
    },

    removeChannel: (state, action) => {
      const { id } = action.payload;
      const generalChannel = state.channels.find((c) => c.name === 'general');

      if (state.currentChannelId === generalChannel.id) {
        state.currentChannelId = generalChannel.id;
      }

      state.messages = state.messages.filter((msg) => msg.channelId !== id);
      state.channels = state.channels.filter((c) => c.id !== id);
      console.log(action.payload);
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
const {
  setCurrentChannel, addMessage, addChannel, setSelectedChannel, renameChannel, removeChannel,
} = chatSlice.actions;

export {
  setCurrentChannel, initChat, addMessage, addChannel, setSelectedChannel, renameChannel, removeChannel,
};
export default reducer;

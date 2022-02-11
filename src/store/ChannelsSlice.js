/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pathes from '../routes.js';
import getCleaned from '../services/getCleaned.js';
import { fetchMessages } from './MessagesSlice.js';

export const initChat = createAsyncThunk('chatstore/init', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('chat-token'));
    const response = await axios.get(
      pathes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Network Error');
    }

    const { messages, ...channels } = response.data;
    dispatch(fetchMessages(messages));
    return channels;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const chatSlice = createSlice({
  name: 'channelsstore',
  initialState: {
    channels: [],
    currentChannelId: null,
    defaultChannelId: null,
    selectedChannelId: null,
    channelsFetchState: null,
    channelsFetchError: null,

  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    setSelectedChannel: (state, action) => {
      state.selectedChannelId = action.payload;
    },

    addChannel: (state, action) => {
      const { createdBy, ...restData } = action.payload;
      const data = JSON.parse(localStorage.getItem('chat-token'));
      if (data && data.username === createdBy) {
        state.currentChannelId = restData.id;
      }
      state.channels.push(getCleaned(restData));
    },
    renameChannel: (state, action) => {
      const updatedChannel = getCleaned(action.payload);
      state.channels = state.channels.map((c) => {
        if (c.id === updatedChannel.id) {
          c.name = updatedChannel.name;
        }
        return c;
      });
    },

    removeChannel: (state, action) => {
      const { id } = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = state.defaultChannelId;
      }
      state.channels = state.channels.filter((c) => c.id !== id);
    },
  },

  extraReducers: {
    [initChat.pending]: (state) => {
      state.channelsFetchState = 'loading';
      state.channelsFetchError = null;
    },

    [initChat.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels = channels.map(getCleaned);
      state.currentChannelId = currentChannelId;
      state.defaultChannelId = channels[0].id;

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
export const {
  setCurrentChannel, addChannel, setSelectedChannel, renameChannel, removeChannel,
} = chatSlice.actions;

export default reducer;

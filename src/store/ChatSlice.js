/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import filter from 'leo-profanity';
import pathes from '../routes.js';

filter.add(filter.getDictionary('ru'));
const getCleaned = (data) => {
  const { name } = data;
  if (name) {
    return { ...data, name: filter.clean(data.name) };
  }

  return { ...data, body: filter.clean(data.body) };
};

export const initChat = createAsyncThunk('chatstore/init', async (_, { rejectWithValue }) => {
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
    addMessage: (state, action) => {
      state.messages.push(getCleaned(action.payload));
    },
    addChannel: (state, action) => {
      state.channels.push(getCleaned(action.payload));
      state.currentChannelId = action.payload.id;
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
      state.messages = state.messages.filter((msg) => msg.channelId !== id);
      state.channels = state.channels.filter((c) => c.id !== id);
    },
  },

  extraReducers: {
    [initChat.pending]: (state) => {
      state.channelsFetchState = 'loading';
      state.channelsFetchError = null;
    },

    [initChat.fulfilled]: (state, action) => {
      const { channels, currentChannelId, messages } = action.payload;
      state.channels = channels.map(getCleaned);
      state.currentChannelId = currentChannelId;
      state.defaultChannelId = channels[0].id;

      state.messages = messages.map(getCleaned);
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
  setCurrentChannel, addMessage, addChannel, setSelectedChannel, renameChannel, removeChannel,
} = chatSlice.actions;

export default reducer;

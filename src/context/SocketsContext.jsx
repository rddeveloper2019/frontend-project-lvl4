import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { notify } from '../services/toastify.js';
import {
  addChannel, renameChannel, removeChannel,
} from '../store/ChannelsSlice';
import { addMessage, removeMessages } from '../store/MessagesSlice.js';

const SocketsContext = createContext(null);

const SocketsContextProvider = ({ children, socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const emitWithPromise = async (event, data, errorMessage = 'Network Error', cb = null) => {
    try {
      await socket.emit(event, data, ({ status }) => {
        if (status !== 'ok') {
          throw new Error(errorMessage);
        }
        if (cb) {
          cb();
        }
      });
    } catch (error) {
      notify(t('sockets.error'), 'error');
    }
  };

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
    socket.on('newChannel', (data) => {
      dispatch(addChannel(data));
    });

    socket.on('renameChannel', (data) => {
      dispatch(renameChannel(data));
    });
    socket.on('removeChannel', (data) => {
      dispatch(removeChannel(data));
      dispatch(removeMessages(data));
    });

    socket.on('connect_failed', () => {
      notify(t('sockets.error'), 'error');
    });

    socket.on('connect_error', () => {
      setTimeout(() => {
        notify(t('sockets.reconnect'), 'warning');
        socket.connect();
      }, 5000);
    });
  }, [dispatch, socket, t]);

  const value = {
    socket, emitWithPromise,
  };

  return (<SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>);
};

export { SocketsContext };
export default SocketsContextProvider;

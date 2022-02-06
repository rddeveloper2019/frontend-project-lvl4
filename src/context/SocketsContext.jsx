import React, { createContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  addMessage, addChannel, renameChannel, removeChannel,
} from '../store/ChatSlice';

const SocketsContext = createContext(null);

const SocketsContextProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const [onSocketError, setOnSocketError] = useState(null);

  const emitWithPromise = async (event, data, cb = null) => {
    setOnSocketError(null);
    try {
      await socket.emit(event, data, ({ status }) => {
        if (status !== 'ok') {
          setOnSocketError({ message: 'Connection Error!' });
        }
        if (cb) {
          dispatch(cb());
        }
      });
    } catch (error) {
      setOnSocketError({ message: error.message });
      if (cb) {
        dispatch(cb());
      }
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      setOnSocketError(null);
    });

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
    });

    socket.on('connect_error', () => {
      setOnSocketError({ message: 'Restoring connection...' });
      setTimeout(() => {
        socket.connect();
      }, 3000);
    });
  }, []);

  const value = { socket, emitWithPromise, onSocketError };

  return (<SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>);
};

export { SocketsContext };
export default SocketsContextProvider;

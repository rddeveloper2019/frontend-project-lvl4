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
    await socket.emit(event, data, ({ status }) => {
      if (status !== 'ok') {
        throw new Error('sockets.error');
      }
      if (cb) {
        cb();
      }
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      setOnSocketError(null);
    });

    socket.on('newMessage', (data) => {
      if (!data) {
        console.log('achtung!');
      }
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
      setOnSocketError('sockets.reconnect');
      setTimeout(() => {
        socket.connect();
      }, 5000);
    });
  }, []);

  const value = {
    socket, emitWithPromise, onSocketError, setOnSocketError,
  };

  return (<SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>);
};

export { SocketsContext };
export default SocketsContextProvider;

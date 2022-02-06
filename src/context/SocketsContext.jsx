import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage, addChannel } from '../store/ChatSlice';

const socket = io();

console.log(socket);

const SocketsContext = createContext(null);

const SocketsContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [onSocketError, setOnSocketError] = useState(null);

  const emitWithPromise = async (event, data) => {
    setOnSocketError(null);
    try {
      await socket.emit(event, data, ({ status }) => {
        if (status !== 'ok') {
          setOnSocketError({ message: 'Connection Error!' });
        }
      });
    } catch (error) {
      setOnSocketError({ message: error.message });
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

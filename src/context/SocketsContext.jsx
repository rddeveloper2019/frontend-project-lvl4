import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/ChatSlice';

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
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  const value = { socket, emitWithPromise, onSocketError };

  return (<SocketsContext.Provider value={value}>{children}</SocketsContext.Provider>);
};

export { SocketsContext };
export default SocketsContextProvider;

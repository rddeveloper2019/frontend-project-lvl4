import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/ChatSlice';

const socket = io('http://localhost:5000');
// socket.on('connect');
console.log(socket);

const SocketsContext = createContext(null);

const SocketsContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  return <SocketsContext.Provider value={{ socket }}>{children}</SocketsContext.Provider>;
};

export { SocketsContext };
export default SocketsContextProvider;

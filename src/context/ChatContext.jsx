import React, { createContext, useState } from 'react';

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = ({ username, token }) => {
    localStorage.setItem('chat-token', JSON.stringify(token));
    setCurrentUser(username);
  };

  const isAuth = () => {
    const token = JSON.parse(localStorage.getItem('chat-token'));

    return !!token;
  };

  const logout = () => {
    localStorage.removeItem('chat-token');
    setCurrentUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        login,
        isAuth,
        logout,
      }}
    >
      {children}

    </ChatContext.Provider>
  );
};
export { ChatContext };
export default ChatContextProvider;

import React, { createContext, useState } from 'react';

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const identifyError = (code) => {
    switch (code) {
      case 401: {
        return 'fetchErrors.unauthorized';
      }
      case 409: {
        return 'fetchErrors.conflict';
      }
      default: {
        return 'fetchErrors.default';
      }
    }
  };

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
        identifyError,
      }}
    >
      {children}

    </ChatContext.Provider>
  );
};
export { ChatContext };
export default ChatContextProvider;

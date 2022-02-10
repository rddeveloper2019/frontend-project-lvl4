import React, { createContext, useState } from 'react';

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = ({ username, token }) => {
    localStorage.setItem('chat-token', JSON.stringify({ token, username }));
    setCurrentUser(username);
  };

  const isAuth = () => {
    const data = JSON.parse(localStorage.getItem('chat-token'));
    if (data) {
      setCurrentUser(data.username);
    }
    return !!data;
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

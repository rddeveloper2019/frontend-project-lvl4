import React, { createContext, useState } from 'react';
import tokenServices from '../services/tokenServices.js';

const { setTokenToLocal, getTokenFromLocal, removeToken } = tokenServices;

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (loginData) => {
    const { username, token } = loginData;
    const localData = setTokenToLocal(token);
    setCurrentUser({ username, ...localData });
  };

  const isAuth = () => {
    const token = getTokenFromLocal();
    return !!token;
    // if (token) {
    //   return true;
    // }
    // return false;
  };

  const getCurrentUser = (field) => {
    if (currentUser) {
      switch (field) {
        case 'username':
          return currentUser.username;
        case 'id':
          return currentUser.userId;
        default:
          return {
            username: currentUser.username,
            userId: currentUser.userId,
          };
      }
    }
    return null;
  };

  const logout = (id) => {
    removeToken(id);
    setCurrentUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        getCurrentUser,
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

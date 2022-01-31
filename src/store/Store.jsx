import React, { createContext, useState } from 'react';
import tokenServices from '../services/tokenServices.js';

const { setTokenToLocal, getTokenFromLocal, removeToken } = tokenServices;

const ChatStore = createContext(null);

const ChatStoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (loginData) => {
    const { username, token } = loginData;
    const localData = setTokenToLocal(token);
    setCurrentUser({ username, ...localData });
  };

  const isAuth = (id) => {
    console.log(currentUser);
    const { token } = getTokenFromLocal(id);
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
    <ChatStore.Provider value={{
      getCurrentUser, login, isAuth, logout,
    }}
    >
      {children}
    </ChatStore.Provider>
  );
};
export { ChatStore };
export default ChatStoreProvider;

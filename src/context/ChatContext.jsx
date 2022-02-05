import React, { createContext, useState } from 'react';
import tokenServices from '../services/tokenServices.js';

const { setTokenToLocal, getTokenFromLocal, removeToken } = tokenServices;

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [onLoginError, setOnLoginError] = useState('');

  const identifyError = (message) => {
    switch (message) {
      case 'Request failed with status code 401': {
        setOnLoginError('Неверные имя пользователя или пароль');
        return 'Неверные имя пользователя или пароль';
      }
      default: {
        setOnLoginError('Ошибка сервера');
        return 'Ошибка сервера';
      }
    }
  };

  const login = async (loginData) => {
    const { username, token } = loginData;
    console.log(loginData);
    const localData = await setTokenToLocal({ username, token });
    setCurrentUser({ username, ...localData });
  };

  const initUserName = () => {
    const data = getTokenFromLocal();
    if (data) {
      setCurrentUser({ ...data });
    }
  };

  const isAuth = () => {
    const data = getTokenFromLocal();
    return !!data;
    // if (token) {
    //   return true;
    // }
    // return false;
  };

  const logout = (id) => {
    removeToken(id);
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
        onLoginError,
        initUserName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext };
export default ChatContextProvider;

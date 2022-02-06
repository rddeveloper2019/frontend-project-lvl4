import React, { createContext, useState } from 'react';
import tokenServices from '../services/tokenServices.js';

const { setTokenToLocal, getTokenFromLocal, removeToken } = tokenServices;

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [onLoginError, setOnLoginError] = useState('');

  const identifyError = (code) => {
    switch (code) {
      case 401: {
        setOnLoginError('Неверные имя пользователя или пароль');
        return 'Неверные имя пользователя или пароль';
      }
      case 409: {
        setOnLoginError('Такой пользователь уже существует');
        return 'Такой пользователь уже существует';
      }
      default: {
        setOnLoginError('Ошибка сервера');
        return 'Ошибка сервера';
      }
    }
  };

  const login = async (loginData) => {
    const { username, token } = loginData;
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
  };

  const logout = () => {
    removeToken();
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

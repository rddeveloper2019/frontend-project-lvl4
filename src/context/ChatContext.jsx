import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tokenServices from '../services/tokenServices.js';

const { setTokenToLocal, getTokenFromLocal, removeToken } = tokenServices;

const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);

  const identifyError = (code) => {
    switch (code) {
      case 401: {
        return t('fetchErrors.unauthorized');
      }
      case 409: {
        return t('fetchErrors.conflict');
      }
      default: {
        return t('fetchErrors.default');
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
        initUserName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext };
export default ChatContextProvider;

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useChatStore from '../hooks/useChatStore.js';

const RequireAuth = ({ children }) => {
  const { isAuth, getCurrentUser } = useChatStore();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const status = isAuth(getCurrentUser('id'));
    setLoggedIn(status);
  }, [isAuth, loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;

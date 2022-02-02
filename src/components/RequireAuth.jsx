import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useChatContext from '../hooks/useChatContext.js';

const RequireAuth = ({ children }) => {
  const { isAuth } = useChatContext();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const status = isAuth();
    setLoggedIn(status);
  }, [isAuth, loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;

import React from 'react';
import { Navigate } from 'react-router-dom';
import useChatContext from '../hooks/useChatContext.js';

const RequireAuth = ({ children }) => {
  const { isAuth } = useChatContext();

  if (!isAuth()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;

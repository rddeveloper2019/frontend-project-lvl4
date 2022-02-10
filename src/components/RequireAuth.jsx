import React from 'react';
import { Navigate } from 'react-router-dom';
import useChatContext from '../hooks/useChatContext.js';
import pathes from '../routes.js';

const { loginPagePath } = pathes;
const RequireAuth = ({ children }) => {
  const { isAuth } = useChatContext();

  if (!isAuth()) {
    return <Navigate to={loginPagePath()} />;
  }
  return children;
};

export default RequireAuth;

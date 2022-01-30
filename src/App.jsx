import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Main from './pages/Main.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Layout from './components/Layout.jsx';
// import RequiredAuth from './components/hoc/RequiredAuth.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />{' '}
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

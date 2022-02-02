import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Main from './pages/Main.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import ChatContextProvider from './context/ChatContext.jsx';
import chatStore from './store';

const App = () => (
  <Provider store={chatStore}>
    <ChatContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <RequireAuth>
                <Main />
              </RequireAuth>
          )}
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ChatContextProvider>
  </Provider>

);

export default App;

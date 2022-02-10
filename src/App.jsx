import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ToastContainer from './services/toastify.js';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Main from './pages/Main.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import ChatContextProvider from './context/ChatContext.jsx';
import SocketsContextProvider from './context/SocketsContext.jsx';
import chatStore from './store';
import ModalComponent from './components/Modal.jsx';
import pathes from './routes.js';

const App = ({ socket }) => {
  const { homepagePath, loginPagePath, signupPagePath } = pathes;
  return (
    <BrowserRouter>
      <Provider store={chatStore}>
        <ChatContextProvider>
          <SocketsContextProvider socket={socket}>
            <Routes>
              <Route path={homepagePath()} element={<Layout />}>
                <Route
                  index
                  element={(
                    <RequireAuth>
                      <Main />
                    </RequireAuth>
          )}
                />
                <Route path={loginPagePath()} element={<Login />} />
                <Route path={signupPagePath()} element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
            <ToastContainer />
            <ModalComponent />
          </SocketsContextProvider>
        </ChatContextProvider>
      </Provider>
    </BrowserRouter>

  );
};

export default App;

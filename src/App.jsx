import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
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

const notify = (msg, type) => {
  const typesMap = {
    success: toast.TYPE.SUCCESS,
    error: toast.TYPE.ERROR,

  };
  const options = {
    type: typesMap[type] || '',
  };

  toast(msg, options);
};

const App = async (socket) => (

  <BrowserRouter>
    <Provider store={chatStore}>
      <ChatContextProvider>
        <SocketsContextProvider socket={socket}>
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
              <Route path="login" element={<Login notify={notify} />} />
              <Route path="signup" element={<SignUp notify={notify} />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
          <ToastContainer />
          <ModalComponent notify={notify} />
        </SocketsContextProvider>

      </ChatContextProvider>
    </Provider>
  </BrowserRouter>

);

export default App;

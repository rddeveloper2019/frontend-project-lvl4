import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const container = document.querySelector('#root');

const init = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App className="app h-100" />
    </BrowserRouter>,
    container,
  );
};

export default init;

/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck
import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import './styles.scss';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#root');

ReactDOM.render(
  <BrowserRouter>
    <App className="app h-100" />
  </BrowserRouter>,
  container,
);

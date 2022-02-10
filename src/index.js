import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/scss/main.scss';
import './styles.scss';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const start = async () => {
  const container = document.querySelector('#root');
  const socket = io();

  const application = await init(socket);
  ReactDOM.render(
    application, container,
  );

  return application;
};

start();
export default start;

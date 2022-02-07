import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './services/locales.js';
import App from './App.jsx';

const init = () => {
  const container = document.querySelector('#root');
  const socket = io();

  App(socket).then((vdom) => {
    ReactDOM.render(
      vdom, container,
    );
  });
};

export default init;

import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import App from './App.jsx';

const container = document.querySelector('#root');

const socket = io();

const init = () => {
  App(socket).then((vdom) => {
    ReactDOM.render(
      vdom, container,
    );
  });
};

export default init;

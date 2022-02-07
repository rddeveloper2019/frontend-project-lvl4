import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import dictionary from './services/locales.js';
import App from './App.jsx';

const init = () => {
  const container = document.querySelector('#root');
  const socket = io();

  i18n
    .use(initReactI18next)
    .init({
      resources: dictionary,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  App(socket).then((vdom) => {
    ReactDOM.render(
      vdom, container,
    );
  });
};

export default init;

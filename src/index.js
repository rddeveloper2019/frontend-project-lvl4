import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/scss/main.scss';
import './styles.scss';

import init from './init.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();

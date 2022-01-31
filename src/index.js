import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './styles.scss';

import init from './init.jsx';
import trainings from './trainings.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();

trainings();

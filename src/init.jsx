import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import dictionary from './services/locales.js';
import App from './App.jsx';

const init = async (socket) => {
  i18n
    .use(initReactI18next)
    .init({
      resources: dictionary,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    // accessToken: process.env.ROLLBAR_TOKEN || '',
    accessToken: '3fdfc66547f249668e241dd9198626cf',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App socket={socket} />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;

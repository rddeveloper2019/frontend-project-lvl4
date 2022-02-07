import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const dictionary = {
  ru: {
    translation: {
      modal: {
        remove: 'Удалить',
        rename: 'Переименовать',
        add: 'Добавить канал',
        affirm: 'Уверены?',

        buttons: {
          exit: 'Выйти',
          remove: 'Удалить',
          send: 'Отправить',
          cancel: 'Отменить',
        },
      },

      chatroom: {
        placeholders: {
          write_your_message: 'Введите сообщение...',
        },
        messages: {
          counter: {
            count_one: '{{count}} сообщение',
            count_few: '{{count}} сообщения',
            count_many: '{{count}} сообщений',
          },
        },
      },

      layout: {
        buttons: {
          exit: 'Выйти',
        },
      },

      channels: {
        channels: 'Каналы',
        dropdown: {
          remove: 'Удалить',
          rename: 'Переименовать',
        },
      },
      login: {
        title: 'Войти',
        submit: 'Войти',
        nickname_placeholder: 'Ваш ник',
        pass_placeholder: 'Пароль',
        footer: {
          descr: 'Нет аккаунта?',
          registr_link: 'Регистрация',
        },
      },
      signup: {
        title: 'Регистрация',
        submit: 'Зарегистрироваться',
        nickname_placeholder: 'Ваш ник',
        pass_placeholder: 'Пароль',
        confirm_pass_placeholder: 'Подтвердите пароль',
      },
      validation: {
        required: 'Обязательное поле',
        range_of_symbols: 'От 3 до 20 символов',
        min_range: 'Не менее 6 символов',
        must_match: 'Пароли должны совпадать',
        must_be_unique: 'Должно быть уникальным',
      },
      fetchErrors: {
        conflict: 'Такой пользователь уже существует',
        unauthorized: 'Неверные имя пользователя или пароль',
        default: 'Ошибка соединения',
        'Network Error': 'Ошибка соединения',
        loading: 'Загрузка...',
      },
      sockets: {
        reconnect: 'Восстанавливается соединенние...',
        error: 'Ошибка соединения',
      },
    },
  },

};

i18n
  .use(initReactI18next)
  .init({
    resources: dictionary,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

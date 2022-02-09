const dictionary = {
  ru: {
    translation: {
      modal: {
        remove: 'Удалить',
        rename: 'Переименовать',
        add: 'Добавить канал',
        affirm: 'Уверены?',
        channel_name: 'Имя канала',
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
        input_aria_label: 'Новое сообщение',
        submit: 'Отправить',
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
        channel_control: 'Управление каналом',
        add_button: '+',
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
        nickname_placeholder: 'Имя пользователя',
        pass_placeholder: 'Пароль',
        confirm_pass_placeholder: 'Подтвердите пароль',
      },
      not_found: {
        page_not_found: 'Страница не найдена',
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
      toast: {
        removeChannel: 'Канал удалён',
        addChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
      },
    },
  },

};

export default dictionary;

// @ts-check

import _ from 'lodash';
import HttpErrors from 'http-errors';

const { Unauthorized, Conflict } = HttpErrors;

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();

  const state = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
      {
        name: 'dfsdfsd',
        removable: true,
        id: 39,
      },
      {
        name: 'news',
        removable: true,
        id: 41,
      },
    ],
    messages: [
      {
        body: 'werer',
        channelId: 1,
        username: 'wwww',
        id: 5,
      },
      {
        body: 'ssss',
        channelId: 1,
        username: 'wwww',
        id: 6,
      },
      {
        body: 's',
        channelId: 1,
        username: 'wwww',
        id: 7,
      },
      {
        body: 'ddd',
        channelId: 2,
        username: 'wwww',
        id: 8,
      },
      {
        body: 'цуауц',
        channelId: 1,
        username: 'цуауа',
        id: 17,
      },
      {
        body: 'уцауацу',
        channelId: 2,
        username: 'цуауа',
        id: 18,
      },
      {
        body: 'fdgdfgfd',
        channelId: 1,
        username: 'qwerty',
        id: 24,
      },
      {
        body: 'работает',
        channelId: 2,
        username: 'fgh',
        id: 28,
      },
      {
        body: 'прикольно',
        channelId: 2,
        username: 'fgh',
        id: 29,
      },
      {
        body: 'Продам гараж',
        channelId: 1,
        username: 'admin',
        id: 37,
      },
      {
        body: 'dsdasdasdsdasda',
        channelId: 1,
        username: 'admin',
        id: 38,
      },
      {
        body: 'Проверка РД',
        channelId: 41,
        username: 'admin',
        id: 42,
      },
      {
        body: 'Это опять РД',
        channelId: 41,
        username: 'RDD',
        id: 44,
      },
    ],
    currentChannelId: generalChannelId,
    users: [
      { id: 1, username: 'admin', password: 'admin' },
    ],
  };

  if (defaultState.messages) {
    state.messages.push(...defaultState.messages);
  }
  if (defaultState.channels) {
    state.channels.push(...defaultState.channels);
  }
  if (defaultState.currentChannelId) {
    state.currentChannelId = defaultState.currentChannelId;
  }
  if (defaultState.users) {
    state.users.push(...defaultState.users);
  }

  return state;
};

export default (app, defaultState = {}) => {
  const state = buildState(defaultState);

  app.io.on('connect', (socket) => {
    console.log({ 'socket.id': socket.id });

    socket.on('newMessage', (message, acknowledge = _.noop) => {
      const messageWithId = {
        ...message,
        id: getNextId(),
      };
      state.messages.push(messageWithId);
      acknowledge({ status: 'ok' });
      app.io.emit('newMessage', messageWithId);
    });

    socket.on('newChannel', (channel, acknowledge = _.noop) => {
      const channelWithId = {
        ...channel,
        removable: true,
        id: getNextId(),
      };

      state.channels.push(channelWithId);
      acknowledge({ status: 'ok', data: channelWithId });
      app.io.emit('newChannel', channelWithId);
    });

    socket.on('removeChannel', ({ id }, acknowledge = _.noop) => {
      const channelId = Number(id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      const data = { id: channelId };

      acknowledge({ status: 'ok' });
      app.io.emit('removeChannel', data);
    });

    socket.on('renameChannel', ({ id, name }, acknowledge = _.noop) => {
      const channelId = Number(id);
      const channel = state.channels.find((c) => c.id === channelId);
      if (!channel) return;
      channel.name = name;

      acknowledge({ status: 'ok' });
      app.io.emit('renameChannel', channel);
    });
  });

  app.post('/api/v1/login', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      reply.send(new Unauthorized());
      return;
    }

    const token = app.jwt.sign({ userId: user.id });
    reply.send({ token, username });
  });

  app.post('/api/v1/signup', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (user) {
      reply.send(new Conflict());
      return;
    }

    const newUser = { id: getNextId(), username, password };
    const token = app.jwt.sign({ userId: newUser.id });
    state.users.push(newUser);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ token, username });
  });

  app.get('/api/v1/data', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = state.users.find(({ id }) => id === req.user.userId);

    if (!user) {
      reply.send(new Unauthorized());
      return;
    }

    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(_.omit(state, 'users'));
  });

  app
    .get('*', (_req, reply) => {
      reply.view('index.pug');
    });
};

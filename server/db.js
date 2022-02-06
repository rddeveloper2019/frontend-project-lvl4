/* eslint-disable camelcase */
const u_id = () => Math.random();
const ch1 = u_id();
const ch2 = u_id();
const ch3 = u_id();
const ch4 = u_id();

const data = {
  channels: [
    {
      id: ch1,
      name: 'general',
      removable: false,
    },
    {
      id: ch2,
      name: 'random',
      removable: false,
    },
    {
      name: 'dfsdfsd',
      removable: true,
      id: ch3,
    },
    {
      name: 'news',
      removable: true,
      id: ch4,
    },
  ],
  messages: [
    {
      body: 'werer',
      channelId: ch1,
      username: 'wwww',
      id: u_id(),
    },
    {
      body: 'ssss',
      channelId: ch1,
      username: 'wwww',
      id: u_id(),
    },
    {
      body: 's',
      channelId: ch1,
      username: 'wwww',
      id: u_id(),
    },
    {
      body: 'ddd',
      channelId: ch2,
      username: 'wwww',
      id: u_id(),
    },
    {
      body: 'цуауц',
      channelId: ch1,
      username: 'цуауа',
      id: u_id(),
    },
    {
      body: 'уцауацу',
      channelId: ch2,
      username: 'цуауа',
      id: u_id(),
    },
    {
      body: 'fdgdfgfd',
      channelId: ch1,
      username: 'qwerty',
      id: u_id(),
    },
    {
      body: 'работает',
      channelId: ch2,
      username: 'fgh',
      id: u_id(),
    },
    {
      body: 'прикольно',
      channelId: ch2,
      username: 'fgh',
      id: u_id(),
    },
    {
      body: 'Продам гараж',
      channelId: ch1,
      username: 'admin',
      id: u_id(),
    },
    {
      body: 'dsdasdasdsdasda',
      channelId: ch1,
      username: 'admin',
      id: u_id(),
    },
    {
      body: 'Проверка РД',
      channelId: ch3,
      username: 'admin',
      id: u_id(),
    },
    {
      body: 'Это опять РД',
      channelId: ch4,
      username: 'RDD',
      id: u_id(),
    },
  ],
  currentChannelId: ch1,
  users: [
    { id: u_id(), username: 'admin', password: 'admin1' },
    { id: u_id(), username: 'user1', password: 'user11' },
    { id: u_id(), username: 'user22', password: 'user22' },

  ],
};

export default data;

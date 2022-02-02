/* eslint-disable no-unused-vars */
import axios from 'axios';

const trainings = async () => {
  const loggingUser = { username: 'admin', password: 'admin' };

  const res = await axios.post('/api/v1/login', loggingUser);
};

const channels = async () => {
  console.log(' I AM TRAINING');
  const res = await axios.get('/api/v1/data', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0MzY0NjI3Mn0.yp52eLD1bx5WJ5ptlc4Q9NLdI7TW07HadGcwc2PPfQM',
    },
  });
  console.log(res.data);
};

const data = {
  channels: [
    {
      id: 1,
      name: 'general',
      removable: false,
    },
    {
      id: 2,
      name: 'random',
      removable: false,
    },
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
  currentChannelId: 1,
};
// channels();
export default trainings;

const host = '';
const prefix = 'api/v1';

export default {
  dataPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),

  hexletDeployedData: () => 'https://hexlet-allorigins.herokuapp.com/get?disableCache=true&charset=utf-8&url=https://frontend-l4-chat.herokuapp.com/api/v1/data',
  // channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  // channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};

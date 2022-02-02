const host = '';
const prefix = 'api/v1';

export default {
  dataPath: () => [host, prefix, 'data'].join('/'),
  // channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  // channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};

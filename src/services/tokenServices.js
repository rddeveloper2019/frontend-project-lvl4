import jwtDecode from 'jwt-decode';

const setTokenToLocal = ({ username, token }) => {
  const { userId } = jwtDecode(token);
  localStorage.setItem('chat-token', JSON.stringify({ username, token }));
  return { userId, username };
};

const getTokenFromLocal = () => {
  const tokenData = JSON.parse(localStorage.getItem('chat-token'));

  if (tokenData) {
    const { token, username } = tokenData;
    const { userId } = jwtDecode(token);
    return { token, username, userId };
  }
  return null;
};

const removeToken = () => {
  localStorage.removeItem('chat-token');
};

const tokenServices = { setTokenToLocal, getTokenFromLocal, removeToken };

export default tokenServices;

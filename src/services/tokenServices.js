import jwtDecode from 'jwt-decode';

const setTokenToLocal = (token) => {
  const { userId } = jwtDecode(token);
  localStorage.setItem('chat-token', JSON.stringify(token));
  return { userId };
};

const getTokenFromLocal = () => {
  const token = JSON.parse(localStorage.getItem('chat-token'));
  return token;
};

const removeToken = (id) => {
  localStorage.removeItem(id);
};

const tokenServices = { setTokenToLocal, getTokenFromLocal, removeToken };

export default tokenServices;

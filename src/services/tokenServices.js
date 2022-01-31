import jwtDecode from 'jwt-decode';

const setTokenToLocal = (token) => {
  const { userId } = jwtDecode(token);
  localStorage.setItem(userId, JSON.stringify(token));
  return { userId, token };
};

const getTokenFromLocal = (id) => {
  const tokenData = JSON.parse(localStorage.getItem(id));
  return { userId: id, token: tokenData };
};

const removeToken = (id) => {
  localStorage.removeItem(id);
};

const tokenServices = { setTokenToLocal, getTokenFromLocal, removeToken };

export default tokenServices;

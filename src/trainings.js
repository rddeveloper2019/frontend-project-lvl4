import axios from 'axios';

const trainings = async () => {
  const loggingUser = { username: 'admin', password: 'admin' };
  console.log(' I AM TRAINING');
  const res = await axios.post('/api/v1/login', loggingUser);
  console.log(res);
};

export default trainings;

// Unauthorized

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

// channels();
export default trainings;

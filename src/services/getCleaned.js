import filter from 'leo-profanity';

const getCleaned = (data) => {
  const { name } = data;
  if (name) {
    return { ...data, name: filter.clean(data.name) };
  }

  return { ...data, body: filter.clean(data.body) };
};

export default getCleaned;

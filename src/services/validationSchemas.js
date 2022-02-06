import * as yup from 'yup';

const getValidationSchema = (options, array = []) => {
  const validationMethods = {
    channel: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(array, 'Должно быть уникальным'),
    nickname: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  };

  const shapeObj = options.reduce((acc, option) => {
    acc[option] = validationMethods[option];
    return acc;
  }, {});
  return yup.object().shape(shapeObj);
};

export default getValidationSchema;

import * as yup from 'yup';

const validationMethods = {
  standart: yup.string()
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

const getValidationSchema = (options) => {
  const shapeObj = Object.entries(options).reduce((acc, [key, type]) => {
    acc[key] = validationMethods[type];
    return acc;
  }, {});
  return yup.object().shape(shapeObj);
};

export default getValidationSchema;

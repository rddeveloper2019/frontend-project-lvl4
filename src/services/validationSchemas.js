import * as yup from 'yup';

const getValidationSchema = (options, { array = [], flag = null }) => {
  const validationMethods = {
    channel: yup.string()
      .required('validation.required')
      .min(3, 'validation.range_of_symbols')
      .max(20, 'validation.range_of_symbols')
      .notOneOf(array, 'validation.must_be_unique'),
    nickname: yup.string()
      .required('validation.required'),

    reg_nickname: yup.string()
      .required('validation.required')
      .min(3, 'validation.range_of_symbols')
      .max(20, 'validation.range_of_symbols'),
    password: yup
      .string()
      .required('validation.required'),
    reg_password: yup
      .string()
      .required('validation.required')
      .min(6, 'validation.min_range'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'validation.must_match')
      .required('validation.required'),
  };

  const shapeObj = options.reduce((acc, option) => {
    acc[option] = validationMethods[option];
    return acc;
  }, {});

  if (flag) {
    shapeObj.nickname = validationMethods.reg_nickname;
    shapeObj.password = validationMethods.reg_password;
  }

  return yup.object().shape(shapeObj);
};

export default getValidationSchema;

import * as yup from 'yup';

const getValidationSchema = (type, array = []) => {
  const registration = {
    nickname: yup.string()
      .required('validation.required')
      .min(3, 'validation.range_of_symbols')
      .max(20, 'validation.range_of_symbols'),
    password: yup
      .string()
      .required('validation.required')
      .min(6, 'validation.min_range'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'validation.must_match')
      .required('validation.required'),
  };

  const channel = {
    channel: yup.string()
      .required('validation.required')
      .min(3, 'validation.range_of_symbols')
      .max(20, 'validation.range_of_symbols')
      .notOneOf(array, 'validation.must_be_unique'),
  };

  const map = {
    registration,
    channel,

  };

  return yup.object().shape(map[type]);
};

export default getValidationSchema;

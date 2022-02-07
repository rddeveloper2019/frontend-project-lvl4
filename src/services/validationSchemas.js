import * as yup from 'yup';
import i18next from './locales.js';

const getValidationSchema = (options, { array = [], flag = null }) => {
  const validationMethods = {
    channel: yup.string()
      .required(i18next.t('validation.required'))
      .min(3, i18next.t('validation.range_of_symbols'))
      .max(20, i18next.t('validation.range_of_symbols'))
      .notOneOf(array, i18next.t('must_be_unique')),
    nickname: yup.string()
      .required(i18next.t('validation.required')),
    reg_nickname: yup.string()
      .required(i18next.t('validation.required'))
      .min(3, i18next.t('validation.range_of_symbols'))
      .max(20, i18next.t('validation.range_of_symbols')),
    password: yup
      .string()
      .required(i18next.t('validation.required'))
      .min(6, i18next.t('validation.min_range')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], i18next.t('validation.must_match'))
      .required(i18next.t('validation.required')),
  };

  const shapeObj = options.reduce((acc, option) => {
    acc[option] = validationMethods[option];
    return acc;
  }, {});

  if (flag) {
    console.log(flag);
    shapeObj.nickname = validationMethods.reg_nickname;
  }

  return yup.object().shape(shapeObj);
};

export default getValidationSchema;

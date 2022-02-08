import React, { useRef, useEffect } from 'react';
import {
  Container, Col, Row, Button, Form as BootstrapForm,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import getValidationSchema from '../services/validationSchemas.js';
import useChatContext from '../hooks/useChatContext.js';
import pathes from '../routes.js';

function SignUp({ notify }) {
  const { t } = useTranslation();

  const { login, identifyError } = useChatContext();
  const navigate = useNavigate();
  const nicknameRef = useRef(null);
  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const initialValues = {
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    try {
      const user = { username: values.nickname, password: values.password };
      const res = await axios.post(pathes.signupPath(), user);
      login({ username: values.nickname, ...res.data });
      onSubmitProps.setSubmitting(false);
      navigate('/');
    } catch (error) {
      const { response } = error;
      if (!response) {
        notify(t(`toast.${error.message}`), 'error');
      }
      onSubmitProps.setErrors({
        confirmPassword: identifyError(+response.status),
        password: 'no-message',
        nickname: 'no-message',
      });
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <div className="signup-page page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-center">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema(['nickname', 'password', 'confirmPassword'], { flag: 'reg' })}
              validateOnBlur
              validateOnChange
              onSubmit={onSubmit}
            >
              {(formik) => {
                const {
                  errors, touched, handleChange, isSubmitting,
                } = formik;
                const getValidClass = (name) => {
                  const isInvalid = touched[name] && errors[name];
                  return isInvalid ? 'form-control is-invalid' : 'form-control isvalid';
                };
                return (
                  <Form className="p-3 rounded shadow">
                    <p className="my-1 main-color text-uppercase">{t('signup.title')}</p>
                    <Field name="nickname">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="nickname"
                            className={getValidClass('nickname')}
                            placeholder={t('signup.nickname_placeholder')}
                            onChange={handleChange}
                            required
                            ref={nicknameRef}
                          />
                          <BootstrapForm.Label className="visually-hidden" htmlFor="nickname">{t('login.nickname_placeholder')}</BootstrapForm.Label>
                          {errors.nickname !== 'no-message' && errors.nickname && (
                            <div className="invalid-tooltip">
                              {t(errors.nickname)}
                            </div>
                          )}

                        </div>

                      )}
                    </Field>

                    <Field name="password">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="password"
                            type="password"
                            className={getValidClass('password')}
                            placeholder={t('signup.pass_placeholder')}
                            onChange={handleChange}
                            required

                          />
                          <BootstrapForm.Label className="visually-hidden" htmlFor="password">{t('login.pass_placeholder')}</BootstrapForm.Label>
                          {errors.password !== 'no-message' && errors.password && (
                            <div className="invalid-tooltip">
                              {t(errors.password)}
                            </div>
                          )}

                        </div>

                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="confirmPassword"
                            type="password"
                            className={getValidClass('confirmPassword')}
                            placeholder={t('signup.confirm_pass_placeholder')}
                            onChange={handleChange}
                            required

                          />

                          <BootstrapForm.Label className="visually-hidden" htmlFor="confirmPassword">{t('signup.confirm_pass_placeholder')}</BootstrapForm.Label>
                          {errors.confirmPassword && (
                            <div className="invalid-tooltip">
                              {t(errors.confirmPassword)}
                            </div>
                          )}
                        </div>

                      )}
                    </Field>

                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100 main-button shadow"
                      disabled={isSubmitting}
                    >
                      {t('signup.submit')}
                    </Button>

                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;

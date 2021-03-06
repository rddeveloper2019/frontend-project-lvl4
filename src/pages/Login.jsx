import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Col, Row, Button, Form as BootstrapForm,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import useChatContext from '../hooks/useChatContext.js';
import pathes from '../routes.js';
import { notify } from '../services/toastify.js';
import identifyError from '../services/identifyError.js';

function Login() {
  const { t } = useTranslation();
  const { login } = useChatContext();
  const { signupPagePath, loginPath, homepagePath } = pathes;
  const navigate = useNavigate();
  const nicknameRef = useRef(null);
  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const initialValues = {
    nickname: '',
    password: '',
  };

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);

    try {
      const user = { username: values.nickname, password: values.password };
      const res = await axios.post(loginPath(), user);
      login({ username: values.nickname, ...res.data });
      onSubmitProps.setSubmitting(false);
      navigate(homepagePath());
    } catch (error) {
      const { response } = error;
      if (!response) {
        notify(t('fetchErrors.Network Error'), 'error');
      }
      onSubmitProps.setErrors({
        password: identifyError(response.status),
        nickname: 'no-message',
      });
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <div className="login-page page">
      <Container className="vh-100 d-flex flex-column justify-content-center">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validateOnChange
              validateOnSubmit
              onSubmit={onSubmit}
            >
              {(formik) => {
                const {
                  errors,
                  touched,
                  handleChange,
                  isSubmitting,
                } = formik;

                const getValidClass = (name) => {
                  const isInvalid = touched[name] && errors[name];
                  return isInvalid
                    ? 'form-control is-invalid'
                    : 'form-control isvalid';
                };

                return (
                  <Form className="p-3 rounded shadow">
                    <p className="my-1 main-color text-uppercase">{t('login.title')}</p>
                    <Field name="nickname">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="nickname"
                            className={getValidClass('nickname')}
                            placeholder={t('login.nickname_placeholder')}
                            onChange={handleChange}
                            required
                            ref={nicknameRef}
                            autoComplete="username"
                          />
                          <BootstrapForm.Label className="visually-hidden" htmlFor="nickname">{t('login.nickname_placeholder')}</BootstrapForm.Label>
                          {errors.nickname !== 'no-message'
                            && errors.nickname && (
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
                            placeholder={t('login.pass_placeholder')}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                          />
                          <BootstrapForm.Label className="visually-hidden" htmlFor="password">{t('login.pass_placeholder')}</BootstrapForm.Label>
                          {errors.password && (
                            <div className="invalid-tooltip">
                              {t(errors.password)}
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
                      {t('login.submit')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
        <Row>
          <Col className="col text-center  d-flex justify-content-center my-2">
            <div className="p-2 w-50 shadow rounded text-white fw-bold ">
              {t('login.footer.descr')}
              {'  '}
              <Link to={signupPagePath()} className="main-color fw-bold ">
                {' '}
                {t('login.footer.registr_link')}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

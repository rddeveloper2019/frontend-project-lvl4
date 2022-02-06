import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Col, Row, Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import useChatContext from '../hooks/useChatContext.js';

function Login() {
  const { login, identifyError } = useChatContext();

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

      const res = await axios.post('/api/v1/login', user);
      login({ username: values.nickname, ...res.data });
      onSubmitProps.setSubmitting(false);
      navigate('/');
    } catch (error) {
      const { response } = error;
      console.log(error.response);
      onSubmitProps.setErrors({
        password: identifyError(+response.status),
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
                    <p className="my-1 main-color text-uppercase">Войти</p>
                    <Field name="nickname">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="nickname"
                            className={getValidClass('nickname')}
                            placeholder="Ваш ник"
                            onChange={handleChange}
                            required
                            ref={nicknameRef}
                          />
                          {errors.nickname !== 'no-message'
                            && errors.nickname && (
                              <div className="invalid-tooltip">
                                {errors.nickname}
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
                            placeholder="Пароль"
                            onChange={handleChange}
                            required
                          />
                          {errors.password && (
                            <div className="invalid-tooltip">
                              {errors.password}
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
                      Войти
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
              Нет аккаунта?
              {'  '}
              <Link to="/signup" className="main-color fw-bold ">
                {' '}
                Регистрация
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

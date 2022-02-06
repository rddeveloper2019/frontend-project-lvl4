import React, { useRef, useEffect } from 'react';
import {
  Container, Col, Row, Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import getValidationSchema from '../services/validationSchemas.js';

function SignUp() {
  const nicknameRef = useRef(null);
  useEffect(() => {
    nicknameRef.current.focus();
  }, []);

  const initialValues = {
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log('Login Form data: ', values);
    console.log('Login Submit data: ', onSubmitProps);
  };
  return (
    <div className="signup-page page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-center">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema([' nickname', 'password', 'confirmPassword'])}
              validateOnBlur
              validateOnChange
              onSubmit={onSubmit}
            >
              {(formik) => {
                console.log(formik);
                const {
                  errors, touched, handleChange, isSubmitting,
                } = formik;
                const getValidClass = (name) => {
                  const isInvalid = touched[name] && errors[name];
                  return isInvalid ? 'form-control is-invalid' : 'form-control isvalid';
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
                          {errors.nickname !== 'no-message' && errors.nickname && (
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
                    <Field name="confirmPassword">
                      {() => (
                        <div className="mb-2 position-relative">
                          <input
                            id="confirmPassword"
                            type="password"
                            className={getValidClass('confirmPassword')}
                            placeholder="Подтвердите пароль"
                            onChange={handleChange}
                            required

                          />
                          {errors.confirmPassword && (
                            <div className="invalid-tooltip">
                              {errors.confirmPassword}
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
                      Зарегистрироваться
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

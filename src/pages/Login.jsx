import React from 'react';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormElement from '../components/FormElement.jsx';

function Login() {
  const initialValues = {
    nickname: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    nickname: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log('Login Form data: ', values);
    console.log('Login Submit data: ', onSubmitProps);
  };

  return (
    <div className="login-page page">
      <Container className="vh-100 d-flex flex-column justify-content-center">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                console.log(formik);
                return (
                  <Form className="p-3 rounded shadow">
                    <p className="my-1 main-color text-uppercase">Войти</p>
                    <FormElement
                      control="nickname"
                      name="nickname"
                      error={formik.errors.nickname}
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      required
                    />
                    <FormElement
                      control="password"
                      name="password"
                      error={formik.errors.password}
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      required
                    />
                    <FormElement control="submit" title="Войти" />
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
              <Link to="/signup" className="main-color fw-bold "> Регистрация</Link>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Login;
